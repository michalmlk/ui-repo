import { useCombobox, useMultipleSelection } from 'downshift';
import { useMemo, useState } from 'react';
import classNames from 'classnames';

interface Item {
    id: string;
}

type StringProps<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

const anyKeyValueMatch = <T extends Item>(
    keysToFilter: (keyof StringProps<T>)[],
    item: T,
    inputValue: string,
): boolean => {
    return !!keysToFilter.find((key) => (item[key] as string).toLowerCase().includes(inputValue));
};

function getFilteredItems<T extends Item>(
    items: T[],
    selectedItems: T[],
    inputValue: string,
    keysToFilter: (keyof StringProps<T>)[],
) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return items.filter(function filterItem(item: T) {
        return (
            !selectedItems.includes(item) &&
            anyKeyValueMatch(keysToFilter, item, lowerCasedInputValue)
        );
    });
}

export const MultipleCombobox = <T extends Item>({
    initialItems,
    keysToFilter,
    selectedItemLabel,
}: {
    initialItems: T[];
    keysToFilter: (keyof StringProps<T>)[];
    selectedItemLabel: keyof StringProps<T>;
}) => {
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
        selectedItem,
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
        <div className="w-[592px]">
            <div className="flex flex-col gap-1">
                <label className="w-fit" {...getLabelProps()}>
                    Pick some books:
                </label>
                <div className="shadow-sm bg-white inline-flex gap-2 items-center flex-wrap p-1.5">
                    {selectedItems.map(function renderSelectedItem(selectedItemForRender, index) {
                        return (
                            <span
                                className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
                                key={`selected-item-${index}`}
                                {...getSelectedItemProps({
                                    selectedItem: selectedItemForRender,
                                    index,
                                })}
                            >
                                {selectedItemForRender[selectedItemLabel]}
                                <span
                                    className="px-1 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSelectedItem(selectedItemForRender);
                                    }}
                                >
                                    &#10005;
                                </span>
                            </span>
                        );
                    })}
                    <div className="flex gap-0.5 grow">
                        <input
                            placeholder="Best book ever"
                            className="w-full"
                            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
                        />
                        <button
                            aria-label="toggle menu"
                            className="px-2"
                            type="button"
                            {...getToggleButtonProps()}
                        >
                            &#8595;
                        </button>
                    </div>
                </div>
            </div>
            <ul
                className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
                    !(isOpen && items.length) && 'hidden'
                }`}
                {...getMenuProps()}
            >
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            className={classNames(
                                highlightedIndex === index && 'bg-blue-300',
                                selectedItem === item && 'font-bold',
                                'py-2 px-3 shadow-sm flex flex-col',
                            )}
                            key={`${item.id}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            <span>{item.title}</span>
                            <span className="text-sm text-gray-700">{item.author}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
