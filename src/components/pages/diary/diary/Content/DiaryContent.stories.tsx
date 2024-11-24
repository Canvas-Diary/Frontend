import type { Meta, StoryObj } from "@storybook/react";

import DiaryContent from ".";

const meta: Meta<typeof DiaryContent> = {
  component: DiaryContent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DiaryContent>;

export const Primary: Story = {
  args: {},
};
