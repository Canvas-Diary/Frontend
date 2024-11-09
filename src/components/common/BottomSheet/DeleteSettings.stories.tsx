import type { Meta, StoryObj } from "@storybook/react";

import DeleteSettings from "./DeleteSettings";

const meta: Meta<typeof DeleteSettings> = {
  component: DeleteSettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeleteSettings>;

export const Primary: Story = {
  args: {
    onClose: () => {},
  },
};
