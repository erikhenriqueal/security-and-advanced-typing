import { useState } from "react";

import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from "@/shadcn/components/ui/card";
import { Pencil, Check, X, Minimize2 } from "lucide-react";

import { type DocumentCardProps } from "./DocumentCard";

export type DocumentScreenProps = Omit<DocumentCardProps, "previewContent"> & {
  content: string;
  editable?: boolean;
  editing?: boolean;
};

export default function DocumentScreen({
  docid,
  title,
  authorName,
  content,
  authorUser,
  editable,
  editing,
  // Closes the screen on dashboard/index.tsx
  onAction
}: DocumentScreenProps) {
  const [isEditing, setEditing] = useState<boolean>(editing ?? false);

  const [realTitle, setRealTitle] = useState<string>(title ?? "");
  const [realContent, setRealContent] = useState<string>(content ?? "");

  const handleSaving = (ev: React.MouseEvent) => {
    console.log(docid);
    // Whether it's a document creation
    if (!docid?.length) {
      setEditing(false);
      if (onAction) onAction(ev);
      return;
    }
  };

  const handleCanceling = (ev: React.MouseEvent) => {
    // Whether it's a document creation
    if (!docid?.length) {
      setEditing(false);
      if (onAction) onAction(ev);
      return;
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-xs z-20 px-4 py-12"
      onClick={ev => ev.currentTarget === ev.target && onAction && !isEditing ? onAction(ev) : void 0}
    >
      <Card className="max-w-3xl max-h-full mx-auto">
        <CardHeader>
          <CardAction>
            {
              editable && isEditing ?
                <Button
                  variant={"ghost"}
                  className="cursor-pointer p-2 h-auto"
                  onClick={handleCanceling}
                >
                  <X size={16} />
                </Button> : null
            }
            {
              editable ?
                <Button
                  variant={"ghost"}
                  className="cursor-pointer p-2 h-auto"
                  disabled={realTitle.length + realContent.length === 0}
                  onClick={ev => {
                    setEditing(!isEditing);
                    if (isEditing) handleSaving(ev);
                  }}
                >
                  {isEditing ? <Check size={16} /> : <Pencil size={16} />}
                </Button> : null
            }
            <Button disabled={isEditing} variant={"ghost"} className="cursor-pointer p-2 h-auto" onClick={onAction}>
              <Minimize2 size={16} />
            </Button>
          </CardAction>
          <CardTitle
            className="text-2xl outline-none"
          >
            {realTitle.trim().length === 0 &&
              <span className="absolute text-muted-foreground selection:hidden pointer-events-none">Título</span>}
            <p
              className="outline-none"
              contentEditable={editable && isEditing}
              suppressContentEditableWarning={true}
              onInput={(ev => setRealTitle(ev.currentTarget.innerText))}
            >{title}</p>
          </CardTitle>
          <CardDescription>
            By <strong>{authorName}</strong>
            {authorUser ? <span> (You)</span> : null}
          </CardDescription>
        </CardHeader>
        <CardContent className="no-scrollbar overflow-auto text-lg *:leading-tight">
          {realContent.trim().length === 0 &&
            <span className="absolute text-muted-foreground selection:hidden pointer-events-none">Conteúdo</span>}
          <p
            className="outline-none z-10"
            contentEditable={editable && isEditing}
            suppressContentEditableWarning={true}
            onInput={(ev => setRealContent(ev.currentTarget.innerText))}
          >{content}</p>
        </CardContent>
      </Card>
    </div>
  );
}