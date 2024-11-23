import type { Meta, StoryObj } from "@storybook/react";

import SettingImage from "./SettingImage";

const meta: Meta<typeof SettingImage> = {
  component: SettingImage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingImage>;

export const Primary: Story = {
  args: {
    onClickSetMain: () => {},
    onClickDownload: () => {},
    onClickDelete: () => {},
    imgUrl: "",
  },
};
