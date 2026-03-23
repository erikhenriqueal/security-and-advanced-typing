import { Tooltip, TooltipTrigger, TooltipContent } from "@/shadcn/components/ui/tooltip";

export interface TooltipButtonProps {
  title: string;
  children: React.ReactNode;
};

export function TooltipButton({
  title,
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button"> & TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {title}
      </TooltipContent>
    </Tooltip>
  );
}