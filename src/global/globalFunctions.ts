import { redirect } from "react-router-dom";

export async function writeClipboardText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function requireAuth({ request }: { request: any }) {
  console.log(request);
  let userData;
  const isLoggedIn = userData ? true : false;

  if (!isLoggedIn) {
    return redirect(`../login`);
  }
  return null;
}
