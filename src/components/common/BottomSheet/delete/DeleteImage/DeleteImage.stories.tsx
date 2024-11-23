import type { Meta, StoryObj } from "@storybook/react";

import DeleteImage from "./DeleteImage";

const meta: Meta<typeof DeleteImage> = {
  component: DeleteImage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteImage>;

export const Primary: Story = {
  args: {
    onClickCancle: () => {},
    onClickDelete: () => {},
    imgUrl: "",
    date: "",
  },
};
