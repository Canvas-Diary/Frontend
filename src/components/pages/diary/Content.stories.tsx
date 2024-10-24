import type { Meta, StoryObj } from "@storybook/react";

import Content from "./Content";

const meta: Meta<typeof Content> = {
  component: Content,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Primary: Story = {
  args: {
    content: "일기 내용",
    emotion: "happy",
    likedCount: 5,
    isLiked: true,
    date: "2024-09-28",
  },
};
