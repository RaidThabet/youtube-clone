import {ReactNode} from "react";
import {useIsMobile} from "@/hooks/use-mobile";
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

type Props = {
    children: ReactNode;
    open: boolean;
    title: string;
    onOpenChange: (open: boolean) => void;
};

function ResponsiveModal({children, open, onOpenChange, title}: Props) {
    const isMobile = useIsMobile();

    if (isMobile) {
        console.log("isMobile: " + isMobile);
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    {children}
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default ResponsiveModal;

