"use client";

import clsx from "clsx";
import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
import { Card, Skeleton } from "@heroui/react";
import React, { FC, JSX } from "react";

import { title } from "@/components/primitives";

const ItemPageSkeleton: FC = (): JSX.Element => (
  <article className="container mx-auto p-6 backdrop-blur-2xl bg-background/50 border border-white/15 rounded-2xl">
    <section className="flex flex-col gap-8 lg:flex-row">
      <Skeleton className={"object-cover rounded-2xl w-[360] h-[540]"} />
      <section>
        <Skeleton className={"rounded-2xl"} />
        <div className={"flex items-center gap-4 my-4"}>
          {Array.from({ length: 6 }).map((_: unknown, i: number) => (
            <Chip key={i}>
              <Skeleton />
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className={"rounded-2xl"} />
        </div>
        <Skeleton className={"rounded-2xl"} />
        <Skeleton className={"rounded-2xl"}>
          <div className="w-full h-[360px]" />
        </Skeleton>
      </section>
    </section>
    <section className={"mt-8 flex flex-col"}>
      <Skeleton className={clsx(title({ size: "md" }), "font-header")}>
        Críticas
      </Skeleton>
      <Tabs className={"mt-8"}>
        <Tab key={"all"} className={"w-full"} title={"Todas"}>
          {Array.from({ length: 6 }).map((_: unknown, i: number) => (
            <Skeleton key={i} className={"rounded-2xl"}>
              <div className={"w-full h-[360px]"} />
            </Skeleton>
          ))}
        </Tab>
        <Tab key={"user"} className={"w-full"} title={"Usuarios"}>
          <Card />
        </Tab>
        <Tab key={"critics"} className={"w-full"} title={"Críticos"}>
          <Card />
        </Tab>
      </Tabs>
    </section>
  </article>
);

export default ItemPageSkeleton;