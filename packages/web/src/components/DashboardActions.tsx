import { buttonVariants } from "@/shadcn/components/ui/button";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/shadcn/components/ui/tooltip";

import { FilePen, Users } from "lucide-react";

export default function DashboardActions({
  userRole,
  className,
  onAction
}: {
  userRole?: "viewer" | "contributor" | "manager" | "admin";
  className?: string;
  onAction?: (action: string) => void;
}) {
  return (
    <div className={`inline-flex space-x-2 w-max h-min p-2 bg-primary rounded-full ring-2 ring-primary/50 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
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
          </TooltipTrigger>
          <TooltipContent>New Document</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {
        userRole === "admin" ?
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
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
              </TooltipTrigger>
              <TooltipContent>Manage Users</TooltipContent>
            </Tooltip>
          </TooltipProvider> : null
      }
    </div>
  );
}