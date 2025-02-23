import styles from './styles.module.scss';
import { IconX } from '@tabler/icons-react';

type Book = {
    title: string;
    author: string;
    id: string;
};

export const renderBookItem = (
    book: Book,
    index: number,
    onDelete: (item: Book) => void,
    getSelectedItemProps: ({}) => any,
) => {
    return (
        <div className={styles.wrapper} key={index}>
            <span
                className={styles.details}
                {...getSelectedItemProps({
                    selectedItem: book,
                    index,
                })}
            >
                {book.title} {book.author}
            </span>
            <IconX role="button" onClick={() => onDelete(book)} />
        </div>
    );
};
