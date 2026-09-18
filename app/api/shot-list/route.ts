import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Switches the shot-list preview on or off for this browser only. It sets or
 * clears the Draft Mode cookie; the public site is never affected. Both
 * destinations are fixed, so this cannot be used as an open redirect.
 */
export async function GET(request: Request) {
  const mode = new URL(request.url).searchParams.get("mode");
  const draft = await draftMode();

  if (mode === "on") {
    draft.enable();
    redirect("/");
  }

  draft.disable();
  redirect("/shot-list");
}
