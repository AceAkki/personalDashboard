import { redirect } from "react-router-dom";
import { userKey } from "./storageKeys";

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

export const toggleClass = ({
  refElem,
  classname,
}: {
  refElem: any;
  classname: string;
}) => {
  const element = refElem.current;
  if (!element) return;
  element.classList.toggle(classname);
};

export const timeOfTheDayGreeting = () => {
  const currentHour = new Date().getHours();
  console.log(currentHour);
  return currentHour < 12
    ? "¡Buenos Días"
    : currentHour >= 12 && currentHour < 19
      ? "Buenas Tardes"
      : "¡Buenas Noches";
};

export const checkImgURL = async (inputValue: string) => {
  const res = await fetch(inputValue);
  if (!res) return false;
  const isImageType = res.headers.get("content-type")?.includes("image");
  const isStatusOk = res.status === 200 && res.ok;

  console.log(isImageType, isStatusOk);
  return isImageType && isStatusOk;
};
