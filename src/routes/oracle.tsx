import { createFileRoute } from "@tanstack/react-router";
import { PhotoshopShell } from "@/components/ps/Shell";

/**
 * The A/B oracle route (REV7): renders the shell in its ORACLE state — the deterministic
 * chrome skeleton the egui app's `?oracle=1` boot mirrors — for the pixel-exact comparison
 * harness (`tools/oracle/run.sh` in the photocraft repo). Everything here exists to remove
 * geometry the app has no counterpart for and to pin blur/translucency to solids:
 *
 *  - menus: the app's ten (no Plugins); tab strip: one "Untitled" tab, no Plus button
 *  - dock cards: the app's real Essentials tab sets
 *  - no title-bar right cluster (Share/avatar/Undo/Redo), no floating task bar
 *  - status pill + active doc tab + flyout: solid composites (surface/70 -> #0E0F10,
 *    popover/95 -> #1B1D20) instead of backdrop-blur (egui has no blur; both sides render
 *    the same solid)
 */
export const Route = createFileRoute("/oracle")({
  component: () => <PhotoshopShell oracle />,
});
