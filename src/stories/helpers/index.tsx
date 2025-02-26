import { Item } from '../../components/ui/combobox/utils';
import { RenderItemFn } from '../../components/ui/combobox/Combobox.tsx';
import classNames from 'classnames';

interface Book extends Item {
    title: string;
    author: string;
}

export const renderBookItem: RenderItemFn<Book> = (
    item,
    index,
    highlightedIndex,
    getItemProps,
    selectedItem,
) => {
    return (
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
            <span>{item.author}</span>
        </li>
    );
};
