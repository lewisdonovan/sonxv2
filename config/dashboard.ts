import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    // {
    //   title: "Billing",
    //   href: "/dashboard/billing",
    //   icon: "billing",
    // },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title:"Onboarding",
      href: "/dashboard/onboarding",
      // icon: "onboarding",
    },
    {
      title:"Referrals",
      href: "/dashboard/referrals",
     // icon: "referrals",
    },
    {
      title:"Get Started",
      href:"/dashboard/getstarted",
     // icon:"getstarted"
    },
    {
      title:"Tasklist",
      href:"/dashboard/task-list",
     // icon:"tasklist"
    },
    {
      title:"Streaks",
      href:"/dashboard/streaks",
    //  icon:"tasklist"
    }
  ],
}
