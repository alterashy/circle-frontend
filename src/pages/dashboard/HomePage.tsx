import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/features/home/components/PostCard";
import { PostForm } from "@/features/home/components/PostForm";
import { Thread } from "@/features/home/schemas/thread.types";
import { api } from "@/lib/api";
import { currentDate } from "@/utils/currentDateTime";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarClock, House } from "lucide-react";

export const HomePage = () => {
  const {
    data: Thread,
    isLoading,
    isError,
    error,
  } = useQuery<Thread[]>({
    queryKey: ["threads"],
    queryFn: async () => {
      const response = await api.get("/threads");
      return response.data;
    },
  });

  const Date = currentDate();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div>
          <Link to="/">
            <Button variant={"ghost"} size={"icon"}>
              <House />
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold">Post</h1>
          <span className="flex gap-2 items-center text-muted-foreground text-xs">
            <CalendarClock size={"14px"} />
            {Date} WIB
          </span>
        </div>
      </div>
      <div>
        <Separator className="my-4" />
        <PostForm />
        <Separator className="my-4" />
      </div>
      <div>
        <div>
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error.message}</p>}
        </div>
        <div className="felx flex-col">
          {Thread?.map((thread) => <PostCard {...thread} key={thread.id} />)}
        </div>
      </div>
    </div>
  );
};
