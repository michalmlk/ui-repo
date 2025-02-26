export type StringProps<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

export interface Item {
    id: string;
}

const anyKeyValueMatch = <T extends Item>(
    keysToFilter: (keyof StringProps<T>)[],
    item: T,
    inputValue: string,
): boolean => {
    return !!keysToFilter.find((key) => (item[key] as string).toLowerCase().includes(inputValue));
};

export function getFilteredItems<T extends Item>(
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
