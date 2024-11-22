import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dummy from "@/assets/dummy/_Image.png";

import StyleOption from "./StyleOption";

const meta: Meta<typeof StyleOption> = {
  component: StyleOption,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StyleOption>;

export const Primary: Story = {
  args: {
    image: dummy,
    text: "수채화",
    isSelected: false,
    onClick: fn(),
  },
};
