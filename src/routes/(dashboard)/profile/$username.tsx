import { ProfileOtherPage } from "@/pages/dashboard/ProfileOtherPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/profile/$username")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProfileOtherPage />
    </div>
  );
}
