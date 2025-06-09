import React from "react";
import { useSession } from "next-auth/react";

import UserPopover from "@/components/layout/atom/UserPopover";
import AuthButtons from "@/components/layout/atom/AuthButtons";

const UserSection: React.FC = (): React.JSX.Element => {
  const session = useSession();
  const user = session.data?.user;

  return user ? <UserPopover user={user!} /> : <AuthButtons />;
};

export default UserSection;
