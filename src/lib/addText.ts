'use server'

import connectToDB from "@/lib/connectToDB";
import ContentModel from "@/lib/models/contentModel";

export async function addText(formData: FormData) {
    await connectToDB();

    let title = formData.get("title");
    let content = formData.get("content");
    let passwordHash = formData.get("passwordHash");

    if (!content) {
        return {status: 400, message: "No content"}
    }

    let data = {
        cid: crypto.randomUUID(),
        title: title ? title.toString() : undefined,
        content: content.toString(),
        passwordHash: passwordHash ? passwordHash.toString() : undefined
    }

    const ContentDoc = await ContentModel.create(data);

    if (!ContentDoc) {
        return {status: 500, message: "Failed to add text"}
    }

    return {status: 200, link: `/${ContentDoc.cid}`};
}