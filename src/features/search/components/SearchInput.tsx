import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UserSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchUser } from "../schemas/search.schema";
import { SearchUserCard } from "./SearchUserCard";

export const SearchInput = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextDebounced] = useDebounce(searchText, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery<SearchUser[]>({
    queryKey: ["users", searchTextDebounced],
    queryFn: async () => {
      const response = await api.get(`/users/search?q=${searchTextDebounced}`);
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: !!searchTextDebounced,
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounced, refetch]);

  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <Input
          type="search"
          placeholder="Find new friends.."
          onChange={handleChange}
        />
        <UserSearch className="text-primary" />
      </div>
      <Separator className="mt-4" />
      <div className="mt-4">
        {isLoading ? (
          <Spinner />
        ) : users && users.length === 0 && searchText !== "" ? (
          <div className="flex flex-col gap-2 text-sm text-center">
            <p className="text-secondary-foreground font-semibold">
              No results for <q>{searchText}</q>
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching for something else or check the spelling of what you
              typed
            </p>
          </div>
        ) : (
          users?.map((user) => (
            <div key={user.id}>
              <SearchUserCard searchUserData={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
