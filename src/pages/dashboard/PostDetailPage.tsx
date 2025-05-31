import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostCard from "@/features/home/components/PostCard";
import PostRelpyCard from "@/features/home/components/PostReplyCard";
import PostReplyForm from "@/features/home/components/PostReplyForm";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";

const PostDetailPage = () => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <Link to="/">
          <Button variant={"ghost"}>
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold">Post</h1>
          <span className="flex gap-2 items-center text-muted-foreground text-sm">
            <CalendarClock size={"14px"} />
            Date time
          </span>
        </div>
      </div>
      <div>
        <Separator className="my-4" />
        <PostCard />
      </div>
      <div>
        <Separator className="my-4" />
        <PostReplyForm />
      </div>
      <div>
        <PostRelpyCard />
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default PostDetailPage;
