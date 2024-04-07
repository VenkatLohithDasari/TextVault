import React from 'react'
import {notFound} from "next/navigation";
import connectToDB from "@/lib/connectToDB";
import ContentModel from "@/lib/models/contentModel";
import {Metadata, ResolvingMetadata} from "next";
import {ContentDisplay} from "@/components/ContentDisplay";
import {Content} from "next/dist/compiled/@next/font/dist/google";

export async function generateMetadata({params}: {params: {slug: string}},
    parent: ResolvingMetadata): Promise<Metadata> {
    const {slug} = params

    if (!slug) {
        return {
            title: "Page Not Found"
        }
    }

    await connectToDB();

    const ContentDoc = await ContentModel.findOne({cid: slug});

    if (!ContentDoc) {
        return {
            title: "Page Not Found"
        }
    }

    return {
        title: ContentDoc.title ? ContentDoc.title : "Discover Unnamed Insights",
    }
}

const Page = async ({params}: {params: {slug: string}}) => {
    const {slug} = params

    if (!slug) {
        notFound();
    }

    await connectToDB();

    const ContentDoc = await ContentModel.findOne({cid: slug});

    if (!ContentDoc) {
        notFound();
    }

    return (
        <div className="space-y-4 mt-4">
            {ContentDoc.title && <>
                <h1 className="text-3xl font-bold px-4">{ContentDoc.title}</h1>
                <hr className="px-4" />
            </>}
            <ContentDisplay content={ContentDoc.content} passwordHash={ContentDoc.passwordHash} />
        </div>
    )
}
export default Page
