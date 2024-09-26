import type { Meta, StoryObj } from "@storybook/react";

import ThumbnailGrid from "./ThumbnailGrid";

const meta: Meta<typeof ThumbnailGrid> = {
  component: ThumbnailGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThumbnailGrid>;

export const Primary: Story = {
  args: {},
};
