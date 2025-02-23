import { useMemo, useState, ReactNode } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import classNames from 'classnames';
import { Input } from '../input/Input.tsx';
import styles from './Combobox.module.scss';
import { IconArrowDown } from '@tabler/icons-react';

interface MultipleComboBoxProps<T = any> {
    items: T[];
    renderItem: (
        item: T,
        index: number,
        onDelete: (item: T) => void,
        getSelectedItemProps: (item: T) => {},
    ) => ReactNode;
}

function MultipleComboBox({ items, renderItem }: MultipleComboBoxProps) {
    const initialSelectedItems = [items[0], items[1]];

    function getFilteredItems(selectedItems: MultipleComboBoxProps['items'], inputValue: string) {
        const lowerCasedInputValue = inputValue.toLowerCase();

        return items.filter(function filterBook(book) {
            return (
                !selectedItems.includes(book) &&
                (book.title.toLowerCase().includes(lowerCasedInputValue) ||
                    book.author.toLowerCase().includes(lowerCasedInputValue))
            );
        });
    }

    function MultipleComboBox() {
        const [inputValue, setInputValue] = useState('');
        const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
        const items = useMemo(
            () => getFilteredItems(selectedItems, inputValue),
            [selectedItems, inputValue],
        );

        const getItemClassName = <T extends object>(item: T, index: number) => {
            return classNames(
                `${styles.dropdownListItem}`,
                highlightedIndex === index && `${styles.higlighted}`,
                selectedItem === item && `${styles.higlighted}`,
            );
        };

        const { getDropdownProps, removeSelectedItem, getSelectedItemProps } = useMultipleSelection(
            {
                selectedItems,
                onStateChange({ selectedItems: newSelectedItems, type }) {
                    switch (type) {
                        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
                        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
                        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
                        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
                            setSelectedItems(newSelectedItems ?? []);
                            break;
                        default:
                            break;
                    }
                },
            },
        );
        const {
            isOpen,
            getToggleButtonProps,
            getLabelProps,
            getMenuProps,
            getInputProps,
            highlightedIndex,
            getItemProps,
            selectedItem,
        } = useCombobox({
            items,
            itemToString(item) {
                return item ? item.title : '';
            },
            defaultHighlightedIndex: 0,
            selectedItem: null,
            inputValue,
            stateReducer(_, actionAndChanges) {
                const { changes, type } = actionAndChanges;

                switch (type) {
                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick:
                        return {
                            ...changes,
                            isOpen: true,
                            highlightedIndex: 0,
                        };
                    default:
                        return changes;
                }
            },
            onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
                switch (type) {
                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick:
                    case useCombobox.stateChangeTypes.InputBlur:
                        if (newSelectedItem) {
                            setSelectedItems([...selectedItems, newSelectedItem]);
                            setInputValue('');
                        }
                        break;

                    case useCombobox.stateChangeTypes.InputChange:
                        setInputValue(newInputValue ?? '');

                        break;
                    default:
                        break;
                }
            },
        });

        return (
            <div>
                <div className={styles.main}>
                    <div className={styles.container}>
                        {selectedItems.map((item, index) =>
                            renderItem(item, index, removeSelectedItem, getSelectedItemProps),
                        )}
                    </div>
                    <div className={styles.comboboxInputWrapper}>
                        <Input
                            label="Search"
                            placeholder="Search"
                            {...getLabelProps()}
                            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
                        />
                        <button
                            className={styles.button}
                            aria-label="toggle menu"
                            type="button"
                            tabIndex={2}
                            {...getToggleButtonProps()}
                        >
                            <IconArrowDown />
                        </button>
                    </div>
                </div>
                <ul className={styles.dropdownList} {...getMenuProps()}>
                    {isOpen &&
                        items.map((item, index) => (
                            <li
                                style={{
                                    backgroundColor:
                                        highlightedIndex === index
                                            ? 'var(--color-primary-light)'
                                            : 'transparent',
                                    fontWeight:
                                        selectedItem === item.id
                                            ? 'var(--font-weight-bold)'
                                            : 'var(--font-weight-normal)',
                                }}
                                className={getItemClassName(item, index)}
                                key={`${item.value}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                <span>{item.title}</span>
                                <span className="text-sm text-gray-700">{item.author}</span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }

    return <MultipleComboBox />;
}

export default MultipleComboBox;
