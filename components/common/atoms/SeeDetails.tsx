"use client";

import React, { FC, JSX, useEffect } from "react";
import { Link, Button } from "@heroui/react";

import { useBackgroundImg } from "@/context/BackgroundImgContext";

const SeeDetails: FC<{ id: number }> = ({
  id,
}: {
  id: number;
}): JSX.Element => {
  const { setBackgroundImg } = useBackgroundImg();

  useEffect(() => {
    setBackgroundImg("/background.webp");
  }, []);

  return (
    <Link href={`/movies/${id}`}>
      <Button>Ver detalles</Button>
    </Link>
  );
};

export default SeeDetails;
