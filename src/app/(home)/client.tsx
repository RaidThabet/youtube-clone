"use client"

import {trpc} from "@/trpc/client";

function Client() {
    const [data] = trpc.categories.getMany.useSuspenseQuery();

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export default Client;