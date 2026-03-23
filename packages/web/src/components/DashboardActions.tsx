import { buttonVariants } from "@/shadcn/components/ui/button";
import { FilePen, Users } from "lucide-react";

import { TooltipButton } from "./lib/TooltipButton";

export default function DashboardActions({
  userRole,
  className,
  onAction
}: {
  userRole?: "viewer" | "contributor" | "manager" | "admin";
  className?: string;
  onAction?: (action: string) => void;
}) {
  if (userRole === "viewer") return;
  return (
    <div className={`inline-flex space-x-2 w-max h-min p-2 bg-primary rounded-full ring-2 ring-primary/50 ${className}`}>
      <TooltipButton
        title="New Document"
        className={
          buttonVariants({
            variant: "outline",
            size: "icon-lg",
            className: "cursor-pointer"
          })
        }
        onClick={() => onAction && onAction("new_doc")}
      >
        <FilePen />
      </TooltipButton>
      {
        userRole === "admin" ?
          <TooltipButton
            title="Manage Users"
            className={
              buttonVariants({
                variant: "outline",
                size: "icon-lg",
                className: "cursor-pointer"
              })
            }
            onClick={() => onAction && onAction("see_users")}
          >
            <Users />
          </TooltipButton> : null
      }
    </div>
  );
}