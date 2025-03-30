import React from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const avatarVariants = cva("", {
    variants: {
        size: {
            default: "h-9 w-9",
            xs: "h-4 w-4",
            sm: "h-6 w-6",
            lg: "h-10 w-10",
            xl: "h-[160px] w-[160px]"
        }
    },
    defaultVariants: {
        size: "default"
    }
})

type Props = VariantProps<typeof avatarVariants> & {
    imageUrl: string;
    name: string;
    className?: string;
    onClick: () => void
};

function UserAvatar({imageUrl, name, size, className, onClick}: Props) {
    return (
        <Avatar className={cn(avatarVariants({size, className}))} onClick={onClick}>
            <AvatarImage src={imageUrl} alt={name} />
        </Avatar>
    );
}

export default UserAvatar;