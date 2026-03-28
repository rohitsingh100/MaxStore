import React from 'react'
import { ChartBar, FilePlusIcon, GalleryVerticalEnd, PackageSearch, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { useDispatch } from 'react-redux';
import { setUserLogout } from "@/redux/slices/authSlice";

// Menu items.
const items = [
  {
    title: "Create Products",
    url: "/admin/dashboard",
    icon: FilePlusIcon,
  },
  {
    title: "All Products",
    url: "/admin/dashboard/all-products",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Orders",
    url: "/admin/dashboard/orders",
    icon: PackageSearch,
  },
  {
    title: "Analytics",
    url: "/admin/dashboard/analytics",
    icon: ChartBar,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className='text-xl font-bold'>Dashboard</h3>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`${pathname === item.url && "bg-zinc-200 dark:bg-zinc-600"}`}
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button onClick={() => dispatch(setUserLogout())}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
