import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import EmotionTag from "./EmotionTag";

const meta: Meta<typeof EmotionTag> = {
  component: EmotionTag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmotionTag>;

export const Primary: Story = {
  args: {
    text: "Text",
    selected: false,
    onClick: fn(),
  },
};
