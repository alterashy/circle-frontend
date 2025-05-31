import { Input } from "@/components/ui/input";
import { UserSearch } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Input type="search" placeholder="Find new friends.." />
      <UserSearch className="text-primary" />
    </div>
  );
};

export default SearchInput;
