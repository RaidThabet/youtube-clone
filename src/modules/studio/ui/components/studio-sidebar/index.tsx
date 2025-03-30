"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {LogOutIcon, VideoIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import StudioSidebarHeader from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-header";

function StudioSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className={"pt-16 z-40"} collapsible={"icon"}>
            <SidebarContent className={"bg-background"}>

                <Separator/>
                <SidebarGroup>
                    <SidebarMenu>
                        <StudioSidebarHeader />
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={pathname === "/studio"} tooltip={"Content"} asChild>
                                <Link href={"/studio"}>
                                    <VideoIcon className={"size-5"}/>
                                    <span>Content</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <Separator />
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={"Exit Studio"} asChild>
                                <Link href={"/"}>
                                    <LogOutIcon className={"size-5"}/>
                                    <span>Exit Studio</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default StudioSidebar;