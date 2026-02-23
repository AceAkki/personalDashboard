import { redirect } from "react-router-dom";
import { userKey } from "../features/auth/useAuthStore";

export async function writeClipboardText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function requireAuth({ request }: { request: any }) {
  let userData = localStorage.getItem(userKey);
  const isLoggedIn = userData ? true : false;

  console.log(request, userData, isLoggedIn);
  if (!isLoggedIn) {
    return redirect(`../login`);
  }
  return null;
}
