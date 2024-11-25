import type { Meta, StoryObj } from "@storybook/react";

import ReviewSkeleton from "./ReviewSkeleton";

const meta: Meta<typeof ReviewSkeleton> = {
  component: ReviewSkeleton,
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof ReviewSkeleton>;

export const Primary: Story = {
  args: {},
};
