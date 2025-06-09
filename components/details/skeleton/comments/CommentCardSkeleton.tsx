import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@heroui/react";

const CommentCardSkeleton: React.FC = (): React.JSX.Element => (
  <Card>
    <CardHeader className={"flex items-center gap-4"}>
      <Skeleton className="size-12 rounded-full" />
      <span>
        <Skeleton className={"h-4 w-12 rounded-2xl"} />
      </span>
    </CardHeader>
    <CardBody>
      <Skeleton className={"h-12 w-full rounded-2xl"} />
    </CardBody>
    <CardFooter>
      <p>
        <Skeleton className={"h-4 w-12 rounded-2xl"} />
      </p>
    </CardFooter>
  </Card>
);

export default CommentCardSkeleton;
