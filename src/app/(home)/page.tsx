import {HydrateClient, trpc} from "@/trpc/server";
import HomeView from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

type Props = {
    searchParams: Promise<{
        categoryId?: string;
    }>
}

export default async function Page({searchParams}: Props) {
    const {categoryId} = await searchParams;

    // vercel buiding the app will think that it's a static application does not know that this is actually prefetching something
    //we need to add the line above ^
    void trpc.categories.getMany.prefetch(); // populate data cache

    return (
        <HydrateClient>
            <HomeView categoryId={categoryId}/>
        </HydrateClient>
    );
}
