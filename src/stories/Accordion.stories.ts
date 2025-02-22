import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../components/ui/accordion/Accordion.tsx';

const meta = {
    title: 'Example/Accordion',
    component: Accordion,
    // parameters: {
    //     layout: 'centered',
    // },
    tags: ['autodocs'],
    argTypes: {},
    args: { },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
       items: [
           {
               title: "Blue Sky",
               content: "A refreshing view of a clear blue sky with scattered clouds.",
           },
           {
               title: "Sunny Day",
               content: "A bright and cheerful day filled with sunshine and warmth.",
           },
           {
               title: "Mountain Peak",
               content: "A breathtaking panorama from the top of a rugged mountain.",
           },
           {
               title: "Ocean Breeze",
               content: "The soothing sound of waves and a cool ocean breeze on a summer day.",
           },
           {
               title: "Forest Walk",
               content: "A peaceful walk through a lush green forest with rustling leaves.",
           },
       ]
    },
};