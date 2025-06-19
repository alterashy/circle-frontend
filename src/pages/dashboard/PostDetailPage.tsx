import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { PostDetailCard } from "@/features/home/components/PostDetailCard";
import { PostRelpyCard } from "@/features/home/components/PostReplyCard";
import { PostReplyForm } from "@/features/home/components/PostReplyForm";
import { Thread } from "@/features/home/schemas/thread.types";
import { api } from "@/lib/api";
import { currentDate } from "@/utils/currentDateTime";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";

export const PostDetailPage = () => {
  const { postId } = useParams({ from: "/(dashboard)/post/$postId" });
  const { data, isLoading } = useQuery<Thread>({
    queryKey: [`threads/${postId}`],
    queryFn: async () => {
      const response = await api.get(`/threads/${postId}`);
      return response.data;
    },
  });

  const Date = currentDate();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Link to="/">
          <Button variant={"ghost"} size={"sm"}>
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold">Post</h1>
          <span className="flex gap-2 items-center text-muted-foreground text-xs">
            <CalendarClock size={"14px"} />
            {Date} WIB
          </span>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="mt-4">
            <Spinner />
          </div>
        ) : (
          <div>
            {data && (
              <div>
                <div>
                  <Separator className="my-4" />
                  <PostDetailCard {...data} />
                </div>
                <div>
                  <Separator className="my-4" />
                  <PostReplyForm />
                  <Separator className="my-4" />
                </div>
                {data.replies?.length ? (
                  <div>
                    {data?.replies?.map((reply) => (
                      <div key={reply.id}>
                        <PostRelpyCard {...reply} />
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                ) : undefined}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
