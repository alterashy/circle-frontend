import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const SearchUserCard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center w-full">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold">Fullname</span>
            <span className="text-sm text-muted-foreground">@username</span>
          </div>
        </div>
        <div>
          <Button variant={"outline"}>Follow</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchUserCard;
