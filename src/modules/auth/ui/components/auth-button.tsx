"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import {UserCircleIcon} from "lucide-react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

function AuthButton() {
    return (
        <>
            <SignedIn>
                <UserButton />
                {/* TODO: add menu items for Studio and User Profile */}
            </SignedIn>
            <SignedOut>
                <SignInButton mode={"modal"}>
                    <Button
                        variant={"outline"}
                        className={"px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500" +
                            "border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"}
                    >
                        <UserCircleIcon/>
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>

        </>
    );
}

export default AuthButton;

// 17:15