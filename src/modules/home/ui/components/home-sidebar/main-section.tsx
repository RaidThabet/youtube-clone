"use client"

import React from 'react';
import {FlameIcon, HomeIcon, PlaySquareIcon} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import {useAuth, useClerk} from "@clerk/nextjs";

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon
    },
    {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        auth: true
    },
    {
        title: "Trending",
        url: "/feed/trending",
        icon: FlameIcon
    },
];

function MainSection() {
    const {isSignedIn} = useAuth();
    const clerk = useClerk();

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild={true}
                                isActive={false}
                                onClick={(event) => {
                                    if (!isSignedIn && item.auth) {
                                        event.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }
                                }
                            >
                                <Link href={item.url} className={"flex items-center gap-4"}>
                                    <item.icon/>
                                    <span className={"text-sm"}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default MainSection;