import { Item } from '../../components/ui/combobox/utils';
import { RenderItemFn } from '../../components/ui/combobox/Combobox.tsx';
import styled from 'styled-components';

interface Book extends Item {
    title: string;
    author: string;
}

const StyledBookItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);

    span:nth-of-type(1) {
        font-size: var(--font-size-sm);
        font-weight: bold;
        font-style: italic;
    }

    span:nth-of-type(2) {
        font-size: var(--font-size-xs);
    }
`;

export const renderBookItem: RenderItemFn<Book> = (item) => {
    return (
        <StyledBookItem>
            <span>{item.title}</span>
            <span>{item.author}</span>
        </StyledBookItem>
    );
};
