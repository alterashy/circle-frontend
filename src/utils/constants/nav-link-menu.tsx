import {
  followIcon,
  followIconFill,
  homeIcon,
  homeIconFill,
  profileIcon,
  profileIconFill,
  searchIcon,
  searchIconFill,
} from "@/assets/index";

interface NavLinkMenu {
  label: string;
  path: string;
  logo: {
    fill: string;
    outline: string;
  };
}

export const NAV_LINK_MENU: NavLinkMenu[] = [
  {
    label: "Home",
    logo: {
      fill: homeIconFill,
      outline: homeIcon,
    },
    path: "/dashboard",
  },
  {
    label: "Search",
    logo: {
      fill: searchIconFill,
      outline: searchIcon,
    },
    path: "/dashboard/search",
  },
  {
    label: "Follow",
    logo: {
      fill: followIconFill,
      outline: followIcon,
    },
    path: "/dashboard/follow",
  },
  {
    label: "Profile",
    logo: {
      fill: profileIconFill,
      outline: profileIcon,
    },
    path: "/dashboard/profile",
  },
];
