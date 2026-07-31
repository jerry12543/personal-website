import { createRoot } from "react-dom/client";
import { InfiniteCanvas } from "~/src/canvas";
import type { MediaItem } from "~/src/canvas/types";

export function mount(element: HTMLElement, media: MediaItem[], modalColor: string) {
  createRoot(element).render(
    <InfiniteCanvas
      media={media}
      backgroundColor={modalColor}
      fogColor={modalColor}
      instantAppear
      onMediaClick={(item) => item.href && window.open(item.href, "_blank", "noopener,noreferrer")}
    />
  );
}
