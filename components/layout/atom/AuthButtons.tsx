import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

const AuthButtons: React.FC = (): React.JSX.Element => (
  <>
    <Button as={Link} color="primary" href="/signin" variant="flat">
      Sing in
    </Button>
    <Button as={Link} color="default" href="/signup" variant="flat">
      Sign up
    </Button>
  </>
);

export default AuthButtons;
