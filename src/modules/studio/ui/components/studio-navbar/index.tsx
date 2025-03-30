import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import StudioUploadModal from "@/modules/studio/ui/components/studio-upload-modal";

export function StudioNavbar() {
    return (
        <nav className={"fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md"}>
            <div className={"flex items-center gap-4 w-full"}>
                {/* menu and logo */}
                <div className={"flex items-center flex-shrink-0"}>
                    <SidebarTrigger></SidebarTrigger>
                    <Link href={"/studio"}>
                        <div className={"p-4 flex items-center gap-1"}>
                            <Image src={"/logo.svg"} alt={"Logo"} width={50} height={50}/>
                            <p className={"text-xl font-semibold"}>Studio</p>
                        </div>
                    </Link>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>
                
                {/* auth button */}
                <div className="flex-shrink-0 items-center flex gap-4">
                    <StudioUploadModal />
                    <AuthButton />
                </div>
            </div>
        </nav>
    );
}

// 01:05:40