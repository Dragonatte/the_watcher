import { FC, JSX } from "react";
import { Navbar as HeroUINavbar } from "@heroui/navbar";
import { NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import NextLink from "next/link";

import { Logo } from "@/components/common/atoms/icons";
import Links from "@/components/layout/molecule/Links";
import UserSection from "@/components/layout/molecule/UserSection";

const Navbar: FC = (): JSX.Element => (
  <HeroUINavbar isBlurred isBordered maxWidth="2xl">
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-4" href="/">
          <Logo className={"fill-default-600 aspect-[512/180]"} height={64} />
          <h1 className="font-bold text-inherit font-header">The Watcher</h1>
        </NextLink>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent>
      <ul className="hidden lg:flex gap-4 justify-start mx-auto">
        <Links />
      </ul>
    </NavbarContent>

    <NavbarContent
      className="hidden sm:flex basis-1/5 sm:basis-full"
      justify="end"
    >
      <NavbarItem className="hidden md:flex md:gap-4">
        <UserSection />
      </NavbarItem>
    </NavbarContent>
  </HeroUINavbar>
);

export default Navbar;
