import ResponsiveModal from "@/components/responsive-modal";
import {UploadButton} from "@/utils/uploadthing";
import {trpc} from "@/trpc/client";

type Props = {
    videoId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function ThumbnailUploadModal({videoId, open, onOpenChange}: Props) {
    const utils = trpc.useUtils();

    const onUploadComplete = () => {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({id: videoId});
        onOpenChange(false);
    }

    return (
        <ResponsiveModal
            title={"Upload a thumbnail"}
            open={open}
            onOpenChange={onOpenChange}
        >
            <UploadButton
                endpoint={"thumbnailUploader"}
                input={{videoId}}
                onClientUploadComplete={onUploadComplete}
            />
        </ResponsiveModal>
    );
}

export default ThumbnailUploadModal;