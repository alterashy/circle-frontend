import ProfilePage from "@/pages/dashboard/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProfilePage />
    </div>
  );
}
