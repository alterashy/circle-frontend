import FollowPage from "@/pages/dashboard/FollowPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/follow")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FollowPage />
    </div>
  );
}
