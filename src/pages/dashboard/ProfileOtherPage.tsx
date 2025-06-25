import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/features/home/components/PostCard";
import { Thread } from "@/features/home/schemas/thread.types";
import { ProfileOther } from "@/features/profile/components/ProfileOther";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

// type ThreadImage = {
//   id: string;
//   image: string;
//   likeCount: number;
//   replyCount: number;
//   isLiked: boolean;
// };

export const ProfileOtherPage = () => {
  const { username } = useParams({ from: "/(dashboard)/profile/$username" });
  const {
    data: Thread,
    isLoading,
    isError,
    error,
  } = useQuery<Thread[]>({
    queryKey: ["threads"],
    queryFn: async () => {
      const response = await api.get(`/threads/username/${username}`);
      return response.data;
    },
  });

  const {
    data: ThreadImage,
    isLoading: isLoadingImage,
    isError: isErrorImage,
    error: errorImage,
  } = useQuery<Thread[]>({
    queryKey: ["threads-image"],
    queryFn: async () => {
      const responseImage = await api.get(`/threads/images/${username}`);
      return responseImage.data;
    },
  });

  return (
    <div>
      <ProfileOther />
      <Tabs defaultValue="post" className="w-full my-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="post">All Post</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="post">
          <div className="felx flex-col">
            {Thread?.map((thread) => <PostCard {...thread} key={thread.id} />)}
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div className="grid grid-cols-2">
            {ThreadImage?.map((thread) => (
              <img src={thread.images} alt={thread.id} key={thread.id} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
