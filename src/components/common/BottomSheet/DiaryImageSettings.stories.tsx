import type { Meta, StoryObj } from "@storybook/react";

import DiaryImageSettings from "./DiaryImageSettings";

const meta: Meta<typeof DiaryImageSettings> = {
  component: DiaryImageSettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DiaryImageSettings>;

export const Primary: Story = {
  args: {},
};
