import { useCombobox, UseComboboxReturnValue, useMultipleSelection } from 'downshift';
import { ReactNode, useMemo, useState } from 'react';
import type { Item, StringProps } from './utils';
import { getFilteredItems } from './utils';

export type RenderItemFn<T extends Item> = (
    item: T,
    index: number,
    highlightedIndex: number,
    getItemProps: UseComboboxReturnValue<T>['getItemProps'],
    selectedItem: T,
) => ReactNode;

export interface MultipleComboboxProps<T extends Item> {
    initialItems: T[];
    keysToFilter: (keyof StringProps<T>)[];
    selectedItemLabel: keyof StringProps<T>;
    renderItem: RenderItemFn<T>;
}

export const MultipleCombobox = <T extends Item>(props: MultipleComboboxProps) => {
    const { initialItems, keysToFilter, selectedItemLabel, renderItem } = props;
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
                    items.map((item, index) =>
                        renderItem(item, index, highlightedIndex, getItemProps, selectedItem),
                    )}
            </ul>
        </div>
    );
};
