import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    text: "Text",
    selected: false,
    onClick: fn(),
  },
};
