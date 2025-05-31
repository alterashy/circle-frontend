import SearchPage from "@/pages/dashboard/SearchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SearchPage />
    </div>
  );
}
