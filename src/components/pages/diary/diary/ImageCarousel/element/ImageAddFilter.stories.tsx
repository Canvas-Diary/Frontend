import type { Meta, StoryObj } from "@storybook/react";

import ImageAddFilter from "./ImageAddFilter";

const meta: Meta<typeof ImageAddFilter> = {
  component: ImageAddFilter,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageAddFilter>;

export const Primary: Story = {
  args: {},
};
