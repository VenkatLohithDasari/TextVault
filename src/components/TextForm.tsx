"use client";
import {addText} from "@/lib/addText";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Chip} from "@nextui-org/chip";

interface FormData {
    title: string;
    content: string;
}

export const TextForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|undefined>(undefined);

    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        const fd = new FormData();

        fd.append("title", formData.title);
        fd.append("content", formData.content);

        const response = await addText(fd);

        if (response.status === 200) {
            router.push(`${response.link}`);
        } else {
            setIsLoading(false);
            setError(response.message);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Add Text Form">
            {error && (
                <Chip size="lg" color="danger" className="min-w-full py-5">{error}</Chip>
            )}
            <div>
                <Input
                    variant="faded"
                    type="text"
                    id="title"
                    name="title"
                    label="Title (Optional)"
                    onChange={handleInputChange}
                    value={formData.title}
                    aria-invalid="false"
                />
            </div>
            <div>
                <Textarea
                    variant="faded"
                    id="content"
                    label="Content"
                    minRows={10}
                    maxRows={20}
                    size="lg"
                    placeholder="Markdown format is supported :-)"
                    isRequired
                    name="content"
                    onChange={handleInputChange}
                    value={formData.content}
                    aria-describedby="content-error"
                    aria-invalid={formData.content ? "false" : "true"}
                />
                {!formData.content && <p id="content-error">Please enter some content</p>}
            </div>
            <div className="flex justify-end">
                <Button type="submit" color="primary" isDisabled={!formData.content} isLoading={isLoading}>
                    Submit
                </Button>
            </div>
        </form>
    );
};