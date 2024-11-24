import type { Meta, StoryObj } from "@storybook/react";

import DeleteDiary from "./DeleteDiary";

const meta: Meta<typeof DeleteDiary> = {
  component: DeleteDiary,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteDiary>;

export const Primary: Story = {
  args: {},
};
