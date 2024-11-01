import { FiHome } from "react-icons/fi";

export const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    links: [
      {
        name: "overview",
        icon: <FiHome />,
        path: "/dashboard",
      },
    ],
  },
];

export const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-[#7c66da] text-white text-md m-2";
export const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5  rounded-lg text-md text-gray-700 dark:text-gray-200 m-2";
