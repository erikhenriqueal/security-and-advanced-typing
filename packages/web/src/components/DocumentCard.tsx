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

export interface BaseDocument {
  docid: string;
  authorId: string;
  title: string;
  content: string;
}

export interface DocumentCardProps extends Omit<BaseDocument, "content"> {
  docid: string;
  authorName: string;
  previewContent: string;
  authorUser?: boolean;
  onAction?: (event: React.MouseEvent) => void;
}

export default function DocumentCard({ authorUser, title, authorName, previewContent, onAction }: DocumentCardProps) {
  return (
    <Card size="sm" className="w-72 h-60">
      <CardHeader>
        {onAction ? <CardAction>
          <Button variant={"ghost"} className="cursor-pointer p-2 h-auto" onClick={onAction}>
            <Maximize2 size={16} />
          </Button>
        </CardAction> : null}
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>
          By <strong>{authorName}</strong>
          {authorUser ? <span> (You)</span> : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative h-32 overflow-clip">
        <p className="leading-tight line-clamp-6">
          {previewContent}
        </p>
      </CardContent>
    </Card>
  );
}