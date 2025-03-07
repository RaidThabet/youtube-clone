import React from 'react';
import {Sidebar, SidebarContent} from "@/components/ui/sidebar";
import MainSection from "@/modules/home/ui/components/home-sidebar/main-section";
import {Separator} from "@/components/ui/separator";
import PersonalSection from "@/modules/home/ui/components/home-sidebar/personal-section";

function Index() {
    return (
        <Sidebar className={"pt-16 z-40 border-none"} collapsible={"icon"}>
            <SidebarContent className={"bg-background"}>
                <MainSection />
                <Separator />
                <PersonalSection />
            </SidebarContent>
        </Sidebar>
    );
}

export default Index;