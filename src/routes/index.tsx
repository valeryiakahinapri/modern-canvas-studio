import { createFileRoute } from "@tanstack/react-router";
import { PhotoshopShell } from "@/components/ps/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Photoshop Reimagined — Modern Editor UI" },
      { name: "description", content: "A rounded, ultra-modern reimagining of the Photoshop workspace with collapsible panels." },
      { property: "og:title", content: "Photoshop Reimagined — Modern Editor UI" },
      { property: "og:description", content: "A rounded, ultra-modern reimagining of the Photoshop workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhotoshopShell,
});
