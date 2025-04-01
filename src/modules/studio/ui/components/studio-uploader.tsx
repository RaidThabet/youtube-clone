import MuxUploader, {
    MuxUploaderDrop,
    MuxUploaderFileSelect,
    MuxUploaderProgress,
    MuxUploaderStatus
} from "@mux/mux-uploader-react";
import {UploadIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

type Props = {
    endpoint?: string | null;
    onSuccess: () => void
}

function StudioUploader({endpoint, onSuccess}: Props) {
    return (
        <div className={""}>
            <MuxUploader
                id={"video-uploader"}
                endpoint={endpoint}
                className={"hidden group/uploader"}
            />
            <MuxUploaderDrop muxUploader={"video-uploader"} className={"group/drop"}>
                <div className={"flex flex-col items-center gap-6"} slot={"heading"}>
                    <div className="flex items-center justify-center gap-2 rounded-full bg-muted h-32 w-32">
                        <UploadIcon
                            className={"size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300"}/>
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                        <p className={"text-sm"}>Drag and drop video files to upload!</p>
                        <p className={"text-xs text-muted-foreground"}>Your videos will be private until you publish them</p>
                    </div>
                    <MuxUploaderFileSelect muxUploader={"video-uploader"}>
                        <Button type={"button"} className={"rounded-full"}>
                            Select files
                        </Button>
                    </MuxUploaderFileSelect>
                </div>
                <span slot={"separator"} className={"hidden"}></span>
                <MuxUploaderStatus muxUploader={"video-uploader"} className={"text-sm"}/>
                <MuxUploaderProgress muxUploader={"video-uploader"} className={"text-sm"} type={"percentage"} />
                <MuxUploaderProgress muxUploader={"video-uploader"} className={"text-sm"} type={"bar"} />
            </MuxUploaderDrop>
        </div>
    );
}

export default StudioUploader;