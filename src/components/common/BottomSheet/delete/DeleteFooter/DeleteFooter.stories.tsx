import type { Meta, StoryObj } from "@storybook/react";

import DeleteFooter from "./DeleteFooter";

const meta: Meta<typeof DeleteFooter> = {
  component: DeleteFooter,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteFooter>;

export const Primary: Story = {
  args: {
    onClickCancle: () => {},
    onClickDelete: () => {},
    date: "2024-11-11",
  },
};
