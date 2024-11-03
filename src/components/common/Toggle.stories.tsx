import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: { onClickHandler: fn() },
};
