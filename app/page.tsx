
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import front from "./components/Assets/front.jpg"
import NavBar from "./components/commonPage/Navbar"
import ProfileClient from "./profile/components/user-client";
import { Router } from "next/router";
import HomePage from "./components/pages/HomePage";


export default async function Home() {
  const session = await getSession();
  const user = session?.user;


  console.log(user);
  return (
    
    <div className=''>
      <ProfileClient/>
      <NavBar/>
       <HomePage/>
      
    </div>
  );
}
