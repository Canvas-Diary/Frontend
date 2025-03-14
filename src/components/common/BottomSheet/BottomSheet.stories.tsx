import type { Meta, StoryObj } from "@storybook/react";

import BottomSheet from "./BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Primary: Story = {
  args: {
    children: <div></div>,
    onClose: () => {},
    isOpen: true,
  },
};
