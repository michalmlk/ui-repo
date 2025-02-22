import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input } from '../components/ui/input/Input.tsx';

const meta = {
    title: 'Example/Input/Base',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        type: 'text',
        onChange: () => console.log('onChange text'),
        placeholder: 'Placeholder',
        label: 'Test label',
    },
};