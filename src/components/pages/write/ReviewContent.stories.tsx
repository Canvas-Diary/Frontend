import type { Meta, StoryObj } from "@storybook/react";
import dummy from "../../../assets/dummy/_Image.png";

import ReviewContent from "./ReviewContent";

const meta: Meta<typeof ReviewContent> = {
  component: ReviewContent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReviewContent>;

export const Primary: Story = {
  args: {
    content: "일기 내용",
    emotion: "happy",
    likedCount: 5,
    isLiked: true,
    date: "2024-09-28",
    images: [{ imageId: "1", imageUrl: dummy, isMain: true }],
  },
};
