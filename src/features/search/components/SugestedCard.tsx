// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { SearchUser } from "@/features/search/schemas/search.schema";
// import { api } from "@/lib/api";
// import { useAuthStore } from "@/stores/auth.store";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "@tanstack/react-router";

// export const SuggestedCard = () => {
//   const currentUser = useAuthStore((state) => state.user);
//   const navigate = useNavigate();

//   const {
//     data: suggestedUsers,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["suggested", currentUser?.id],
//     queryFn: async () => {
//       const response = await api.get(`/follows/suggested/${currentUser?.id}`);
//       console.log(response.data);

//       return response.data;
//     },
//     enabled: !!currentUser?.username,
//   });

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2 items-center w-full">
//           <Avatar
//             className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
//             onClick={() =>
//               navigate({ to: `/profile/${suggestedUsers?.profile?.username}` })
//             }
//           >
//             <AvatarImage
//               src={
//                 suggestedUsers.profile.avatarUrl ||
//                 `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${suggestedUsers?.profile?.fullName}`
//               }
//               alt="user-avatar"
//             />
//           </Avatar>
//           <div
//             className="flex flex-col justify-center cursor-pointer hover:text-primary"
//             onClick={() =>
//               navigate({ to: `/profile/${suggestedUsers.username}` })
//             }
//           >
//             <span className="text-xs font-semibold">
//               {suggestedUsers.profile.fullName}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               @{suggestedUsers.username}
//             </span>
//           </div>
//         </div>
//         <div>
//           {suggestedUsers.username !== currentUser?.username && (
//             <Button variant={"outline"} size={"sm"}>
//               <span className="text-xs">Follow</span>
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
