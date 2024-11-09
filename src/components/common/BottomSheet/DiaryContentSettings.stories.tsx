import type { Meta, StoryObj } from "@storybook/react";

import DiaryContentSettings from "./DiaryContentSettings";

const meta: Meta<typeof DiaryContentSettings> = {
  component: DiaryContentSettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DiaryContentSettings>;

export const Primary: Story = {
  args: {
    onClose: () => {},
  },
};
