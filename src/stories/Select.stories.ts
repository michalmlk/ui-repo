import type { Meta, StoryObj } from '@storybook/react';

import { SelectComponent } from '../components/ui/select/Select.tsx';

const meta = {
    title: 'Example/Select/Base',
    component: SelectComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof SelectComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        label: 'test',
        placeholder: 'test',
        items: [
            {
                id: 'item-1',
                label: 'Item 1',
                value: 'item-1',
            },
            {
                id: 'item-2',
                label: 'Item 2',
                value: 'item-2',
            },
            {
                id: 'item-3',
                label: 'Item 3',
                value: 'item-3',
            },
        ],
    },
};
