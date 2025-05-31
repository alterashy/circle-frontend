import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostCard from "@/features/home/components/PostCard";
import PostForm from "@/features/home/components/PostForm";
import { ArrowLeft } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <Button variant={"ghost"}>
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold">Home</h1>
      </div>
      <div>
        <Separator className="my-4" />
        <PostForm />
      </div>
      <div>
        <PostCard />
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default HomePage;
