import React from "react";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="hidden">Title</DialogTitle>
        <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
          <DialogDescription className="hidden">Content</DialogDescription>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTitle className="hidden">Title</DrawerTitle>
      <DrawerContent>
        <DrawerDescription className="hidden">Content</DrawerDescription>
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
