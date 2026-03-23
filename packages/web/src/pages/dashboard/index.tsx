import { useState } from "react";
import { useNavigate } from "react-router";

import { TooltipProvider } from "@/shadcn/components/ui/tooltip";

import { user } from "../../assets/data";

import DocumentCard, { type DocumentCardProps, type BaseDocument } from "../../components/DocumentCard";
import DocumentScreen from "../../components/DocumentScreen";
import DashboardActions from "../../components/DashboardActions";
import { useData } from "../../hooks/useDataContext";

export default function DashboardPage() {
  const { docsPreview, docsContents } = useData()!;

  const navigate = useNavigate();

  const [docFocused, setDocFocused] = useState<(DocumentCardProps & { editable?: boolean; editing?: boolean; }) | null>(null);

  const handleActions = (action: string) => {
    if (action === "new_doc") {
      const newDoc: BaseDocument = {
        docid: "",
        authorId: user.id,
        content: "",
        title: ""
      };

      setDocFocused({
        ...newDoc,
        authorName: user.username,
        previewContent: "",
        authorUser: true,
        editable: true,
        editing: true
      });
    }
    if (action === "see_users") navigate("./users");
  }

  return (
    <TooltipProvider>
      {
        docFocused ? <DocumentScreen
          authorUser={docFocused.authorUser}
          editable={docFocused.editable}
          editing={docFocused.editing}

          docid={docFocused.docid}
          authorId={docFocused.authorId}
          authorName={docFocused.authorName}
          title={docFocused.title}
          content={docsContents.get(docFocused.docid)!}
          onAction={() => setDocFocused(null)}
        /> : null
      }
      <div className="w-full">
        {/* 
          What options should every role has access to?
          - Viewer: No options, only see the documents;
          - Contributor: Create and edit own content;
          - Manager: Edit any content;
          - Admin: Edit any content and manage users/roles.
          */}
        <DashboardActions
          userRole={user.role}
          className="z-10 fixed top-0 right-0 mr-4 mt-4"
          onAction={handleActions}
        />
        <div className="w-full px-8 py-16 grid grid-cols-[repeat(auto-fit,18rem)] justify-center gap-4">
          {
            docsPreview.length ?
              docsPreview.map(doc =>
              <DocumentCard
                  key={doc.docid}

                  authorUser={user.id === doc.authorId}

                docid={doc.docid}
                authorId={doc.authorId}
                authorName={doc.authorName}
                title={doc.title}
                previewContent={doc.previewContent}
                onAction={() => setDocFocused(doc)}
              />
              ) :
              <div>
                <span className="block w-max mx-auto text-muted-foreground">No projects found</span>
              </div>
          }
        </div>
      </div>
    </TooltipProvider>
  );
}