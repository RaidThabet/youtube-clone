"use client";
import {Button} from "@/components/ui/button";
import {Loader2Icon, PlusIcon} from "lucide-react";
import {trpc} from "@/trpc/client";
import {toast} from "sonner";
import ResponsiveModal from "@/components/responsive-modal";
import StudioUploader from "@/modules/studio/ui/components/studio-uploader";
import {useRouter} from "next/navigation";

function StudioUploadModal() {
    const router = useRouter();
    const utils = trpc.useUtils()
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created");
            utils.studio.getMany.invalidate();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSuccess = () => {
        if (!create.data?.video.id) {
            return;
        }

        create.reset();
        router.push(`/studio/videos/${create.data.video.id}`);
    }

    return (
        <>
            <ResponsiveModal open={!!create.data?.url} title={"Upload a new video"} onOpenChange={() => create.reset()}>
                {create.data?.url ? (
                    <StudioUploader onSuccess={onSuccess} endpoint={create.data.url}/>
                ) : <Loader2Icon />
                }
            </ResponsiveModal>
            <Button variant={"secondary"} onClick={() => create.mutate()} disabled={create.isPending}>
                {create.isPending ? <Loader2Icon className={"animate-spin"}/> : <PlusIcon/>}
                Create
            </Button>
        </>

    );
}

export default StudioUploadModal;