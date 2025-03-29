"use client";

import {trpc} from "@/trpc/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import FilterCarousel from "@/components/filter-carousel";
import {useRouter} from "next/navigation";

type Props = {
    categoryId?: string;
}

export function CategoriesSection({categoryId}: Props) {
    return (
        <Suspense fallback={<CategoriesSkeleton /> }>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId } />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSkeleton = () => {
    return (
        <FilterCarousel isLoading={true} data={[]} onSelect={() => {}} />
    )
}

function CategoriesSectionSuspense({categoryId}: Props) {
    const router = useRouter();
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const data = categories.map(({name, id}) => ({
        value: id,
        label: name
    }))

    const onSelect = (value: string | null) => {
        const url = new URL(window.location.href);

        if (value) {
            url.searchParams.set("categoryId", value);
        } else {
            url.searchParams.delete("categoryId");
        }

        router.push(url.toString());
    }

    return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
}