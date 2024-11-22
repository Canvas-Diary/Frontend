import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "@/assets/svg/home.svg?react";
import Sns from "@/assets/svg/sns.svg?react";
import Album from "@/assets/svg/album.svg?react";
import Who from "@/assets/svg/who.svg?react";
import ROUTE_PATH from "@/constants/ROUTE_PATH";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    NavList: [
      { icon: <Home />, label: "홈", path: ROUTE_PATH.HOME },
      { icon: <Sns />, label: "일기 공유", path: ROUTE_PATH.EXPLORE },
      { icon: <Album />, label: "앨범", path: ROUTE_PATH.ALBUM },
      { icon: <Who />, label: "마이페이지", path: ROUTE_PATH.MYPAGE },
    ],
  },
};
