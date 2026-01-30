import Image from "next/image";
import getMe from "./get-me";

export default async function Home() {
  const me = await getMe();
  console.log("Current user:", me);
  return (
   <></>
  );
}
