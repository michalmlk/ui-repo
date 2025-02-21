import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { LoadingButton } from '../components/ui/button/Button.tsx';

const meta = {
    title: 'Example/Button/Base',
    component: LoadingButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn() },
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    args: {
        type: 'button',
        animationType: 'circle',
        size: 'small',
        // @ts-ignore
        onClick: () => alert('clicked'),
    },
};
