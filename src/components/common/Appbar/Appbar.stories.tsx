import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Appbar from "./Appbar";

const meta: Meta<typeof Appbar> = {
  component: Appbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Appbar>;

export const Primary: Story = {
  args: {
    text: "Text",
    menuHandler: fn(),
    backHandler: fn(),
  },
};
