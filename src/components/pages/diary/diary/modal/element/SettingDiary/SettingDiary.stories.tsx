import type { Meta, StoryObj } from "@storybook/react";

import SettingDiary from "./SettingDiary";

const meta: Meta<typeof SettingDiary> = {
  component: SettingDiary,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingDiary>;

export const Primary: Story = {
  args: {
    isChecked: true,
    onClickModify: () => {},
    onClickDelete: () => {},
    onChangeToggle: () => {},
  },
};
