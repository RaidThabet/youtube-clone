import React from 'react';
import Image from "next/image";
import {formatDuration} from "@/lib/utils";

type Props = {
    imageUrl?: string | null;
    previewUrl?: string | null;
    title: string;
    duration: number;
}

function VideoThumbnail({imageUrl, previewUrl, title, duration}: Props) {
    return (
        <div className={"relative group"}>
            {/* Thumbnail wrapper */}
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image
                    src={imageUrl ?? "/placeholder.svg"}
                    alt={title}
                    fill
                    className={"size-full object-cover group-hover:opacity-0"}
                />
                <Image
                    src={previewUrl ?? "/placeholder.svg"}
                    alt={title}
                    fill
                    className={"size-full object-cover opacity-0 group-hover:opacity-100"}
                />
            </div>

            {/* Video duration box */}
            <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
                {formatDuration(duration)}
            </div>
        </div>
    );
}

export default VideoThumbnail;