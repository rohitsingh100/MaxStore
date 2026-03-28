import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogout } from '@/redux/slices/authSlice';

const LogoutToggle = ( user ) => {

  const dispatch = useDispatch();
  return (
    <div>
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar className="cursor-pointer">
  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
  <AvatarFallback className="text-xl">
    {user?.name?.charAt(0).toUpperCase()}
  </AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent align ="center">
    <DropdownMenuItem onClick={() => dispatch(setUserLogout())}>Logout</DropdownMenuItem>
    <Link to="/orders">
    <DropdownMenuItem>My Orders</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}

export default LogoutToggle
