import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import React from "react";

const UserPopover: React.FC<{ user: any }> = ({ user }: { user: any }): React.JSX.Element => (
  <Popover showArrow placement="bottom-end">
    <PopoverTrigger>
      <User
        as="button"
        avatarProps={{
          showFallback: true,
          src: user.image || "/default-avatar.png",
          alt: user.name!,
        }}
        className={"transition-transform"}
        description={user.email!}
        name={user.name!}
      />
    </PopoverTrigger>
    <PopoverContent>
      <Listbox aria-label="User actions">
        <ListboxItem key={"Profile"}>Perfil</ListboxItem>
        <ListboxItem key={"Settings"}>Configuración</ListboxItem>
        <ListboxItem
          key={"Logout"}
          className={"text-danger hover:text-white"}
          color={"danger"}
          onPress={() => signOut()}
        >
          Cerrar sesión
        </ListboxItem>
      </Listbox>
    </PopoverContent>
  </Popover>
);

export default UserPopover;
