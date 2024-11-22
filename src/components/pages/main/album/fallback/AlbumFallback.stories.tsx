import type { Meta, StoryObj } from "@storybook/react";

import AlbumFallback from "./AlbumFallback";

const meta: Meta<typeof AlbumFallback> = {
  component: AlbumFallback,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlbumFallback>;

export const Primary: Story = {
  args: {},
};
