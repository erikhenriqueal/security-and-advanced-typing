import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from "@/shadcn/components/ui/card";
import { Minimize2 } from "lucide-react";

import { type DocumentCardProps } from "./DocumentCard";

export default function DocumentScreen({ title, authorName, content, onAction }: Omit<DocumentCardProps, "previewContent"> & { content: string; }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-xs z-10 px-4 py-12"
      onClick={ev => ev.currentTarget === ev.target && onAction ? onAction(ev) : void 0}
    >
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardAction>
            <Button variant={"ghost"} className="cursor-pointer p-2 h-auto" onClick={onAction}>
              <Minimize2 size={16} />
            </Button>
          </CardAction>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>By <strong>{authorName}</strong></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-tight text-lg">
            {content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}