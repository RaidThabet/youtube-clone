import {ReactNode} from "react";
import {SidebarProvider} from "@/components/ui/sidebar";
import {HomeNavbar} from "@/modules/home/ui/components/home-navbar";

type Props = {
    children: ReactNode
}

export function HomeLayout({children}: Props) {
    return (
        <SidebarProvider>
            <div className={"w-full"}>
                <HomeNavbar/>
                <div>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
