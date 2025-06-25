import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import { useFollow } from "../hooks/useFollow";
import { FollowerUserCard } from "./FollowerUserCard";
import { FollowingUserCard } from "./FollowingUserCard";

export const FollowTab = () => {
  const { isLoadingFollowers, followers, isLoadingFollowings, followings } =
    useFollow();

  return (
    <Tabs defaultValue="followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="followers">
          <UserRoundPlus />
          Followers
        </TabsTrigger>
        <TabsTrigger value="followings">
          <UserRoundCheck />
          Followings
        </TabsTrigger>
      </TabsList>
      <Separator className="my-2" />
      <TabsContent value="followers">
        <div>
          {isLoadingFollowers ? (
            <Spinner />
          ) : (
            followers?.map((follower) => (
              <div key={follower.id}>
                <FollowerUserCard FollowUser={follower} />
              </div>
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value="followings">
        <div>
          {isLoadingFollowings ? (
            <Spinner />
          ) : (
            followings?.map((following) => (
              <div key={following.id}>
                <FollowingUserCard FollowUser={following} />
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
