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
import { ThemeToggle } from "./ThemeToggle";

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
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col gap-8">
        <div>
          <Link to="/" activeProps={activeProps}>
            <h1 className="font-bold text-3xl text-primary">Circle</h1>
          </Link>
        </div>
        <div>
          <Link to="/" activeProps={activeProps}>
            <div className="flex gap-2">
              <House />
              Home
            </div>
          </Link>
        </div>
        <div>
          <Link to="/search" activeProps={activeProps}>
            <div className="flex gap-2">
              <UserRoundSearch />
              Search
            </div>
          </Link>
        </div>
        <div>
          <Link to="/follow" activeProps={activeProps}>
            <div className="flex gap-2">
              <UsersRound />
              Follow
            </div>
          </Link>
        </div>
        <div>
          <Link to="/profile" activeProps={activeProps}>
            <div className="flex gap-2">
              <CircleUserRound />
              Profile
            </div>
          </Link>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full" asChild>
              <Button className="w-full text-accent-foreground">
                <SquarePlus />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full">
              <DialogHeader>
                <DialogTitle className="mb-2">Create Post</DialogTitle>
                <div className="w-full">
                  <PostForm onSuccess={() => setOpen(false)} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <ThemeToggle />
        <Button type="submit" onClick={handleLogout} variant={"outline"}>
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};
