import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";

interface CommentCardProps {
  userImg: string;
  username: string;
  comment: string;
  date: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  userImg,
  username,
  date,
  comment,
}: CommentCardProps): React.JSX.Element => (
  <Card>
    <CardHeader className={"flex items-center gap-4"}>
      <Image
        alt={`${username}'s profile picture`}
        className="rounded-full"
        height={40}
        src={userImg}
        width={40}
      />
      <span>{username}</span>
    </CardHeader>
    <CardBody>
      <p>{comment}</p>
    </CardBody>
    <CardFooter className="text-right">
      <p className="text-sm text-default">{date}</p>
    </CardFooter>
  </Card>
);

export default CommentCard;
