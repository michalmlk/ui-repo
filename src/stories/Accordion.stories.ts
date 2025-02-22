import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../components/ui/accordion/Accordion.tsx';

const meta = {
    title: 'Example/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        title: 'Blue Sky',
        content: 'A refreshing view of a clear blue sky with scattered clouds.',
    },
};
