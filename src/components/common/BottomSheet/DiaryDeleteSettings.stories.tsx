import type { Meta, StoryObj } from "@storybook/react";

import DeleteDiarySettings from "./DeleteDiarySettings";

const meta: Meta<typeof DeleteDiarySettings> = {
  component: DeleteDiarySettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteDiarySettings>;

export const Primary: Story = {
  args: {
    onClickCancle: () => {},
    onClickDelete: () => {},
  },
};
