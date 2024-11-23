import type { Meta, StoryObj } from "@storybook/react";

import DeleteContainer from "./DeleteContainer";

const meta: Meta<typeof DeleteContainer> = {
  component: DeleteContainer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteContainer>;

export const Primary: Story = {
  args: {
    children: <div>children</div>,
  },
};
