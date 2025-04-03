"use client";

import {trpc} from "@/trpc/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MoreVerticalIcon, TrashIcon} from "lucide-react";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {videoUpdateSchema} from "@/db/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";

type Props = {
    videoId: string;
}

function FormSection({videoId}: Props) {
    return (
        <Suspense fallback={<FormSectionSkeleton/>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <FormSectionSuspense videoId={videoId}/>
            </ErrorBoundary>
        </Suspense>
    )
}

function FormSectionSkeleton() {
    return (<p>Loading...</p>);
}

function FormSectionSuspense({videoId}: Props) {
    const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const utils = trpc.useUtils();

    const update = trpc.videos.update.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({id: videoId});
            toast.success("Video updated!")
        },
        onError: (error) => {
            toast.error("Something went wrong");
        }
    });


    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        resolver: zodResolver(videoUpdateSchema),
        defaultValues: video
    });

    const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
        await update.mutateAsync(data);
    }

    return (
        <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"flex items-center justify-between mb-6"}>
                        <div className="">
                            <h1 className={"text-2xl font-bold"}>Video details</h1>
                            <p className={"text-xs text-muted-foreground"}>Manage your video details</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button type={"submit"} disabled={update.isPending}>
                                Save
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <MoreVerticalIcon/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align={"start"} side={"left"}>
                                    <DropdownMenuItem>
                                        <TrashIcon className={"size-4 mr-2"}/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="space-y-8 lg:col-span-3">
                            <FormField
                                control={form.control}
                                name={"title"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Title
                                            {/* TODO: add AI generate button */}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"Add a title to your video"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"description"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description
                                            {/* TODO: add AI generate button */}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value ?? ""}
                                                rows={10}
                                                className={"resize-none pr-10"}
                                                placeholder={"Add a description to your video"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/* TODO: add thumbnail field here */}
                            <FormField
                                control={form.control}
                                name={"categoryId"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Category
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Select a category"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
        </FormProvider>

    );
}

export default FormSection;