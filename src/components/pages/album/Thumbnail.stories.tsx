import type { Meta, StoryObj } from "@storybook/react";

import Thumbnail from "./Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Primary: Story = {
  args: {},
};
