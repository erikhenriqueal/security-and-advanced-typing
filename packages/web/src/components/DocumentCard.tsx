import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from "@/shadcn/components/ui/card";
import { Maximize2 } from "lucide-react";

export interface DocumentCardProps {
  docid: string;
  title: string;
  authorId: string;
  authorName: string;
  previewContent: string;
  onAction?: (event: React.MouseEvent) => void;
}

export default function DocumentCard({ title, authorName, previewContent, onAction }: DocumentCardProps) {
  return (
    <Card size="sm" className="w-72">
      <CardHeader>
        {onAction ? <CardAction>
          <Button variant={"ghost"} className="cursor-pointer p-2 h-auto" onClick={onAction}>
            <Maximize2 size={16} />
          </Button>
        </CardAction> : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>By <strong>{authorName}</strong></CardDescription>
      </CardHeader>
      <CardContent
        className="relative h-32 overflow-clip"
      >
        <p className="leading-tight line-clamp-6">
          {previewContent}
        </p>
      </CardContent>
    </Card>
  );
}