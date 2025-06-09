import { FC, JSX } from "react";
import clsx from "clsx";
import NextLink from "next/link";
import { NavbarItem } from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";

interface NavItem {
  href: string;
  label: string;
}

const Links: FC = (): JSX.Element => (
  <ul className="hidden lg:flex gap-4 justify-start ml-2">
    {siteConfig.navItems.map(
      (item: NavItem): JSX.Element => (
        <NavbarItem key={item.href}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ),
    )}
  </ul>
);

export default Links;
