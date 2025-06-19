import { PostForm } from "@/features/home/components/PostForm";
import { useAuthStore } from "@/stores/auth.store";
import { Link, useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import {
  CircleUserRound,
  House,
  LogOut,
  SquarePlus,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const activeProps = {
  style: {
    fontWeight: "bold",
    color: "#00BC7D",
  },
};

export const LeftBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    navigate({ to: "/login" });
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-6">
        <div className="md:hidden lg:block">
          <Link to="/" activeProps={activeProps}>
            <h1 className="font-bold text-3xl text-primary">Circle</h1>
          </Link>
        </div>
        <div>
          <Link to="/" activeProps={activeProps}>
            <Button variant={"outline"} className="w-full">
              <House />
              <span className="md:hidden lg:block">Home</span>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/search" activeProps={activeProps}>
            <Button variant={"outline"} className="w-full">
              <UserRoundSearch />
              <span className="md:hidden lg:block">Search</span>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/follow" activeProps={activeProps}>
            <Button variant={"outline"} className="w-full">
              <UsersRound />
              <span className="md:hidden lg:block">Follow</span>
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/profile" activeProps={activeProps}>
            <Button variant={"outline"} className="w-full">
              <CircleUserRound />
              <span className="md:hidden lg:block">Profile</span>
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full">
              <Button size={"sm"} className="w-full text-accent-foreground">
                <SquarePlus />
                <span className="md:hidden lg:block">Create Post</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full">
              <DialogHeader>
                <DialogTitle className="mb-2">Create Post</DialogTitle>
                <div className="w-full">
                  <PostForm />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Button
        type="submit"
        onClick={handleLogout}
        variant={"outline"}
        size={"sm"}
        className="w-full"
      >
        <LogOut />
        <span className="md:hidden lg:block">Logout</span>
      </Button>
    </div>
  );
};
