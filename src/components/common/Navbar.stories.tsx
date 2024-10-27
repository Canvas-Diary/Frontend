import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../../assets/svg/home.svg?react";
import Sns from "../../assets/svg/sns.svg?react";
import Album from "../../assets/svg/album.svg?react";
import Who from "../../assets/svg/who.svg?react";
import RoutePaths from "../../constants/routePath";

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
      { icon: <Home />, label: "홈", path: RoutePaths.home },
      { icon: <Sns />, label: "일기 공유", path: RoutePaths.explore },
      { icon: <Album />, label: "앨범", path: RoutePaths.album },
      { icon: <Who />, label: "마이페이지", path: RoutePaths.mypage },
    ],
  },
};
