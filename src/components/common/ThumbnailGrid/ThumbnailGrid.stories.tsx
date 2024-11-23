import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import dummy from "@/assets/dummy/_Image.png";

import ThumbnailGrid from "./ThumbnailGrid";

const meta: Meta<typeof ThumbnailGrid> = {
  component: ThumbnailGrid,
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
type Story = StoryObj<typeof ThumbnailGrid>;

export const Primary: Story = {
  args: {
    diaries: [
      {
        diaryId: "1",
        mainImageUrl: dummy,
      },
    ],
  },
};
