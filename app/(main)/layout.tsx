"use client";

import React from "react";
import { Link } from "@heroui/react";

import Navbar from "@/components/layout/organism/Navbar";
import { useBackgroundImg } from "@/context/BackgroundImgContext";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const { backgroundImg } = useBackgroundImg();

  return (
    <div
      className="w-full min-h-full flex flex-col bg-no-repeat bg-center bg-fixed bg-cover"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer className="bg-background/50 backdrop-blur-md">
        <p className="text-center py-4 text-sm text-default-500">
          Powered by <Link href="https://www.heroui.com">HeroUI</Link>
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
