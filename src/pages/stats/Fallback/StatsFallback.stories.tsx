import type { Meta, StoryObj } from "@storybook/react";

import StatsFallback from "./StatsFallback";

const meta: Meta<typeof StatsFallback> = {
  component: StatsFallback,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatsFallback>;

export const Primary: Story = {
  args: {},
};
