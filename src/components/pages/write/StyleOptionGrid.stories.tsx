import type { Meta, StoryObj } from "@storybook/react";

import StyleOptionGrid from "./StyleOptionGrid";

const meta: Meta<typeof StyleOptionGrid> = {
  component: StyleOptionGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StyleOptionGrid>;

export const Primary: Story = {
  args: {},
};
