import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";

const FollowTab = () => {
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
          <h1>Followers</h1>
        </div>
      </TabsContent>
      <TabsContent value="followings">
        <div>
          <h1>Followings</h1>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FollowTab;
