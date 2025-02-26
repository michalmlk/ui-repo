import { useCombobox, useMultipleSelection } from 'downshift';
import { ReactNode, useMemo, useState } from 'react';
import type { Item, StringProps } from './utils';
import { getFilteredItems } from './utils';
import styles from './Combobox.module.scss';
import classNames from 'classnames';
import { IconX } from '@tabler/icons-react';

export type RenderItemFn<T extends Item> = (item: T) => ReactNode;

export interface MultipleComboboxProps<T extends Item = Item> {
    initialItems: T[];
    keysToFilter: (keyof StringProps<T>)[];
    selectedItemLabel: keyof StringProps<T>;
    renderItemContent: (item: T) => ReactNode;
    label?: string;
    inputPlaceholder?: string;
}

export const MultipleCombobox = <T extends Item>(props: MultipleComboboxProps) => {
    const {
        initialItems,
        keysToFilter,
        selectedItemLabel,
        renderItemContent,
        label,
        inputPlaceholder,
    } = props;
    const [inputValue, setInputValue] = useState('');
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const items = useMemo(
        () => getFilteredItems(initialItems, selectedItems, inputValue, keysToFilter),
        [selectedItems, inputValue],
    );

    const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
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
    });

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        // selectedItem
    } = useCombobox({
        items,
        itemToString(item) {
            return item ? (item[selectedItemLabel] as string) : '';
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
                        setSelectedItems([...selectedItems, newSelectedItem] as T[]);
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
        <div className={styles.containerWrapper}>
            <div className={styles.inputWrapper}>
                <label {...getLabelProps()}>{label}</label>
                <div className={styles.selectionWrapper}>
                    {selectedItems.map(function renderSelectedItem(selectedItemForRender, index) {
                        return (
                            <span
                                className={styles.selectedItem}
                                key={`selected-item-${index}`}
                                {...getSelectedItemProps({
                                    selectedItem: selectedItemForRender,
                                    index,
                                })}
                            >
                                {selectedItemForRender[selectedItemLabel]}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSelectedItem(selectedItemForRender);
                                    }}
                                >
                                    X
                                </button>
                            </span>
                        );
                    })}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder={inputPlaceholder}
                        {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
                    />
                    <button
                        aria-label="toggle menu"
                        className={styles.dropdownToggle}
                        type="button"
                        {...getToggleButtonProps()}
                    >
                        &#8595;
                    </button>
                </div>
            </div>
            <ul
                className={classNames({
                    [styles.dropdownList]: true,
                    [styles.hidden]: !(isOpen && items.length),
                })}
                {...getMenuProps()}
            >
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            className={classNames(
                                styles.item,
                                highlightedIndex === index && styles.highlighted,
                            )}
                            key={`${item.id}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {renderItemContent(item)}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
