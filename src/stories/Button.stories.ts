import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../components/ui/button/Button.tsx';

const meta = {
    title: 'Example/Button/Base',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
    args: {
        type: 'button',
        label: 'Button',
        animationType: 'circle',
        size: 'small',
    },
};

export const Rectangle: Story = {
    args: {
        type: 'button',
        label: 'Button',
        animationType: 'rectangle',
        size: 'large',
        vertical: false,
    },
};

export const Border: Story = {
    args: {
        type: 'button',
        label: 'Button',
        animationType: 'border',
        size: 'large',
    },
};
