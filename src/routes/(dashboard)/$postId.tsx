import PostDetailPage from "@/pages/dashboard/PostDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PostDetailPage />
    </div>
  );
}
