"use client";

import { Button, Card, CardHeader, CardBody } from "@heroui/react";

import { ErrorIcon, RestartIcon } from "@/components/common/atoms/icons";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <ErrorIcon className="fill-danger h-4 w-4" />
        <h1 className={"text-danger"}>Error</h1>
      </CardHeader>
      <CardBody>
        <p className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span>{message}</span>
          {onRetry && (
            <Button
              className="mt-2 sm:mt-0"
              size="sm"
              variant="flat"
              onPress={onRetry}
            >
              <RestartIcon className="fill-danger h-4 w-4 mr-2" /> Reintentar
            </Button>
          )}
        </p>
      </CardBody>
    </Card>
  )
}