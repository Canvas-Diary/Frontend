import type { Meta, StoryObj } from "@storybook/react";
import KeywordTag from "./KeywordTag";
import { fn } from "@storybook/test";

const meta: Meta<typeof KeywordTag> = {
  component: KeywordTag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KeywordTag>;

export const Primary: Story = {
  args: {
    text: "Text",
    onClick: fn(),
  },
};
