import { Separator } from "@/components/ui/separator";
import ProfileCard from "@/features/profile/components/ProfileCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/profile/$profileId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProfileCard />
      <Separator className="my-4" />
    </div>
  );
}
