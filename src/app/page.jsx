"use client"

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Window from "../../public/chat-chat-svgrepo-com.svg";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  
  const {data: session} = useSession();
  
  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex-grow text-center p-10">
          <h3 className="text-5xl">Dashboard</h3>
          <p>Test to development</p>
          <div className="flex justify-center my-10">
            <Image src={Window} width={300} height={0} alt="window logo" />
          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}


// ติดตั้ง npm i next-auth mongoose bcryptjs