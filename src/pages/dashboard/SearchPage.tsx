import { Separator } from "@/components/ui/separator";
import SearchInput from "@/features/search/components/SearchInput";
import SearchUserCard from "@/features/search/components/SearchUserCard";

const SearchPage = () => {
  return (
    <div>
      <SearchInput />
      <Separator className="my-4" />
      <div>
        <SearchUserCard />
      </div>
    </div>
  );
};

export default SearchPage;
