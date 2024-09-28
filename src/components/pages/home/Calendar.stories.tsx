import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Calendar from "./Calendar";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: {
    onClickDate: fn(),
  },
};
