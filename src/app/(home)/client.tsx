"use client"

import {trpc} from "@/trpc/client";

function Client() {
    const [data] = trpc.hello.useSuspenseQuery({
        text: "Raid"
    });

    return (
        <div>Page Client: {data.greeting}</div>
    );
}

export default Client;