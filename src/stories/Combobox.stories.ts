import type { Meta, StoryObj } from '@storybook/react';

import MultipleComboBox from '../components/ui/combobox/Combobox.tsx';
import { renderBookItem } from '../components/ui/combobox/utils/renderBookItem.tsx';

const meta = {
    title: 'Example/Combobox/Base',
    component: MultipleComboBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        items: { type: 'symbol' },
    },
    args: {},
} satisfies Meta<typeof MultipleComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    args: {
        renderItem: renderBookItem,
        items: [
            { id: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird' },
            { id: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace' },
            { id: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
            { id: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
            { id: 'book-5', author: 'George Orwell', title: '1984' },
            { id: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice' },
            { id: 'book-7', author: 'Marcus Aurelius', title: 'Meditations' },
            {
                id: 'book-8',
                author: 'Fyodor Dostoevsky',
                title: 'The Brothers Karamazov',
            },
            { id: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina' },
            { id: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' },
        ],
    },
};
