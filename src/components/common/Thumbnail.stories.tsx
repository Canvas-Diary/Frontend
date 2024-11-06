import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import dummy from "../../assets/dummy/_Image.png";

import Thumbnail from "./Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Primary: Story = {
  args: {
    src: dummy,
    alt: "1",
    onClickHandler: () => {},
  },
};
