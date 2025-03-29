import {HydrateClient, trpc} from "@/trpc/server";
import Client from "@/app/(home)/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

export default async function Home() {
    // const data = await trpc.hello({text: "raid"});
    void trpc.categories.getMany.prefetch(); // populate data cache

    return (
        <HydrateClient>
            <Suspense fallback={<p>Loading...</p>}>
                <ErrorBoundary fallback={<p>Error...s</p>}>
                    <Client/>
                </ErrorBoundary>
            </Suspense>
        </HydrateClient>
    );
}
