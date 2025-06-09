import React, { FC, JSX, Suspense } from "react";
import { Session } from "next-auth";

import ItemPageSkeleton from "@/components/details/skeleton/ItemPageSkeleton";
import { auth } from "@/lib/auth/auth";
import ItemPage from "@/components/details/templates/ItemPage";

const Page: FC<{ params: { id: string } }> = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const { id } = await params;

  const session: Session = auth();

  return (
    <Suspense fallback={<ItemPageSkeleton />}>
      <ItemPage id={id} type={"movie"} user={session.user} />
    </Suspense>
  );
};

export default Page;
