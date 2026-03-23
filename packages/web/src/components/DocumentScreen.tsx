import { useState } from "react";

import { Button, buttonVariants } from "@/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from "@/shadcn/components/ui/card";
import {
  Pencil,
  Check,
  X,
  Minimize2,
  Trash2
} from "lucide-react";

import {
  user,
  generateRandomId,
  getUserActions
} from "../assets/data";

import { TooltipButton } from "./lib/TooltipButton";
import { type DocumentCardProps } from "./DocumentCard";
import { type FullDocument } from "./DataContext";
import { useData } from "../hooks/useDataContext";


export type DocumentScreenProps = Omit<DocumentCardProps, "previewContent"> & {
  content: string;
  editable?: boolean;
  editing?: boolean;
};

function ConfirmDeletingCard({ onConfirm, onDecline }: {
  onConfirm: (ev: React.MouseEvent) => void;
  onDecline: (ev: React.MouseEvent) => void;
}) {
  return (
    <div
      className="absolute top-0 left-0 z-10 w-full h-full px-4 flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
      <Card className="absolute w-full max-w-64" size="default">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>This action cannot be undone!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-max space-x-2 mx-auto">
            <Button
              variant={"ghost"}
              onClick={onDecline}
            >Cancel</Button>
            <Button
              variant={"destructive"}
              onClick={onConfirm}
            >Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  const {
    // TODO: RESTRUCTURE THE ELEMENT TO FETCH DATA FROM useData INSTEAD OF PROPERTIES.
    // TODO: REACT CAN'T UPDATE THE STATE OF THE ELEMENT WHEN A PROP. UPDATES (I think)
    // docsPreview,
    // docsContents,
    addDocument,
    editDocument,
    deleteDocument,
  } = useData()!;

  const [isEditing, setEditing] = useState<boolean>(editing ?? false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  const [realTitle, setRealTitle] = useState<string>(title ?? "");
  const [realContent, setRealContent] = useState<string>(content ?? "");

  const handleSaving = (ev: React.MouseEvent) => {
    // Cancels the saving when the user has no permission
    if (!["contributor", "manager", "admin"].includes(user.role)) return handleCanceling(ev);
    // Whether it's a document creation
    if (!docid?.length) {
      const newDocument: FullDocument = {
        ...getUserActions(user.id, user),
        docid: generateRandomId(),
        authorId: user.id,
        authorName: user.username,
        title: realTitle.trim(),
        content: realContent
      }

      addDocument(newDocument);

      setEditing(false);
      if (onAction) onAction(ev);
      return;
    }

    editDocument(docid, {
      title: realTitle,
      content: realContent
    });
  };

  const handleCanceling = (ev: React.MouseEvent) => {
    setEditing(false);
    if (docid?.length > 0) {
      setRealTitle(title);
      setRealContent(content);
    }
    // Whether it's a document creation -> closes screen
    else if (onAction) onAction(ev);
  };

  const handleDeleteConfirm = (ev: React.MouseEvent) => {
    deleteDocument(docid);
    if (onAction) onAction(ev);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-xs z-20 px-4 py-12"
      onClick={ev => ev.currentTarget === ev.target && onAction && !isEditing ? onAction(ev) : void 0}
    >
      {
        isDeleting ? <ConfirmDeletingCard
          onConfirm={handleDeleteConfirm}
          onDecline={() => setDeleting(false)}
        /> : null
      }
      <Card className="max-w-3xl max-h-full mx-auto">
        <CardHeader>
          <CardAction>
            {
              editable ?
                <TooltipButton
                  title="Delete Document"
                  className={`${buttonVariants({ variant: "ghost" })} cursor-pointer h-auto p-2 pl-2 pr-2`}
                  onClick={() => setDeleting(true)}
                >
                  <Trash2 size={16} />
                </TooltipButton> : null
            }
            {
              editable && isEditing ?
                <TooltipButton
                  title="Cancel Editing"
                  className={`${buttonVariants({ variant: "ghost" })} cursor-pointer h-auto p-2 pl-2 pr-2`}
                  onClick={handleCanceling}
                >
                  <X size={16} />
                </TooltipButton> : null
            }
            {
              editable ?
                <TooltipButton
                  title={isEditing ? "Confirm Editing" : "Edit Document"}
                  className={`${buttonVariants({ variant: "ghost" })} cursor-pointer h-auto p-2 pl-2 pr-2`}
                  disabled={realTitle.length + realContent.length === 0}
                  onClick={ev => {
                    if (isEditing) handleSaving(ev);
                    setEditing(!isEditing);
                  }}
                >
                  {isEditing ? <Check size={16} /> : <Pencil size={16} />}
                </TooltipButton> : null
            }
            <TooltipButton
              title="Close Screen"
              className={`${buttonVariants({ variant: "ghost" })} cursor-pointer h-auto p-2 pl-2 pr-2`}
              disabled={isEditing}
              onClick={onAction}
            >
              <Minimize2 size={16} />
            </TooltipButton>
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
            className="whitespace-pre-line outline-none z-10"
            contentEditable={editable && isEditing}
            suppressContentEditableWarning={true}
            onInput={(ev => setRealContent(ev.currentTarget.innerText))}
          >{content}</p>
        </CardContent>
      </Card>
    </div>
  );
}