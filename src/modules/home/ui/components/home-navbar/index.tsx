import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/modules/home/ui/components/home-navbar/search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";

export function HomeNavbar() {
    return (
        <nav className={"fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50"}>
            <div className={"flex items-center gap-4 w-full"}>
                {/* menu and logo */}
                <div className={"flex items-center flex-shrink-0"}>
                    <SidebarTrigger></SidebarTrigger>
                    <Link href={"/"}>
                        <div className={"p-4 flex items-center gap-1"}>
                            <Image src={"/logo.svg"} alt={"Logo"} width={50} height={50}/>
                        </div>
                    </Link>
                </div>

                {/* search bar */}
                <div className={"flex-1 flex justify-center max-auto"}>
                    <SearchInput />
                </div>

                {/* auth button */}
                <div className="flex-shrink-0 items-center flex gap-4">
                    <AuthButton />
                </div>
            </div>
        </nav>
    );
}

// 01:05:40