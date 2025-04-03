import FormSection from "@/modules/studio/ui/sections/form-section";

type Props = {
    videoId: string;
}

function VideoView({videoId}: Props) {
    return (
        <div className={"px-4 pt-2.5 max-w-screen-lg"}>
            <FormSection videoId={videoId} />
        </div>
    );
}

export default VideoView;