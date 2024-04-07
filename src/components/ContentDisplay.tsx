"use client"
import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Skeleton } from "@nextui-org/skeleton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { decryptContent } from "@/lib/EncryptorAndHasher";
import { Chip } from "@nextui-org/chip";
import CryptoJS from 'crypto-js';

interface ContentDisplayProps {
    content: string,
    passwordHash: string | undefined,
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, passwordHash }) => {
    const [decryptedContent, setDecryptedContent] = useState<string | null>(passwordHash ? null : content);
    const [givenPassword, setGivenPassword] = useState<string>('');
    const [error, setError] = useState('');

    const handleDecrypt = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const hashedPassword = CryptoJS.SHA256(givenPassword).toString();
            if (hashedPassword !== passwordHash) {
                setError('Incorrect password. Please try again.');
                return;
            }
            const decrypted = decryptContent(content, givenPassword);
            setDecryptedContent(decrypted);
        } catch (error) {
            console.error('Error decrypting content:', error);
            setError('An error occurred while decrypting the content.');
        }
    }

    return (
        <>
            <Modal
                isOpen={!decryptedContent}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                aria-labelledby="password-modal-title"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" id="password-modal-title">
                        Password required!
                    </ModalHeader>
                    <form onSubmit={handleDecrypt}>
                        <ModalBody>
                            {error && (
                                <Chip size="lg" color="danger" className="min-w-full py-5">{error}</Chip>
                            )}
                            <Input
                                type="password"
                                label="Password"
                                onValueChange={(v) => setGivenPassword(v)}
                                isRequired
                                value={givenPassword}
                                aria-invalid={!!error}
                                aria-describedby={error ? "password-error" : undefined}
                            />
                            {error && <p id="password-error" className="sr-only">{error}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Open
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            {decryptedContent ? (
                <Markdown remarkPlugins={[remarkGfm]} className="prose min-w-full border-2 p-4 rounded-lg bg-content2">
                    {decryptedContent}
                </Markdown>
            ) : (
                <div className="w-full flex flex-col gap-2" aria-hidden="true">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                </div>
            )}
        </>
    );
};