'use client';

import { DialogBase } from '@/components/DialogBase';
import { DashboardInspiration } from '@/types';
import PromptInput from '@/components/InputFields/PromptInput';
import Image from 'next/image';
import { useHandleDialogType } from '@/hooks/useHandleDialogType';

interface InspirationDialogProps {
    inspiration: DashboardInspiration | null;
}

/**
 * Inspiration dialog displaying image with editable prompt and read-only metadata
 */
export default function InspirationDialog({ inspiration }: InspirationDialogProps) {
    const { handleDialogType } = useHandleDialogType();

    // Derive prompt from inspiration prop instead of storing in state
    const promptValue = inspiration?.prompt || '';

    return (
        <DialogBase
            name="inspirationDialog"
            title="Inspiration Details"
            className="!max-w-[90vw] sm:!max-w-[85vw] md:!max-w-[60vw] w-full h-[85vh] sm:h-[80vh] md:h-[70vh] max-h-screen"
            hideHeader={true}
            removeCloseButton={true}
            disableClose={false}
        >
            {inspiration ? (
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full h-full p-4 sm:p-6">
                    {/* Left: Image (60% width on desktop, full width on mobile) */}
                    <div className="w-full md:w-[60%] h-[30vh] sm:h-[45vh] md:h-[63vh] flex-shrink-0">
                        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                            <Image
                                src={inspiration.imageUrl}
                                alt={inspiration.title || 'Inspiration image'}
                                fill
                                className="object-cover bg-gray-100"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 60vw"
                                priority
                                unoptimized={inspiration.imageUrl.startsWith('/')}
                            />
                        </div>
                    </div>

                    {/* Right: Form fields (40% width on desktop, full width on mobile) */}
                    <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6 overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-none">
                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {inspiration.title}
                        </h2>

                        {/* Prompt Input */}
                        <div className="flex flex-col">
                            <PromptInput
                                label="Prompt"
                                value={promptValue}
                                onChange={() => { }} // Read-only display
                                placeholder="No prompt available"
                                disabled={!promptValue}
                            />
                        </div>

                        {/* PhotoPack */}
                        {inspiration.photoPack && (
                            <div className="flex flex-col">
                                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2">
                                    Photo Pack
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-3 py-2 sm:py-3 text-black text-xs sm:text-sm">
                                    {inspiration.photoPack}
                                </div>
                            </div>
                        )}

                        {/* Model */}
                        {inspiration.Model && (
                            <div className="flex flex-col">
                                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2">
                                    Model
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-3 py-2 sm:py-3 text-black text-xs sm:text-sm">
                                    {inspiration.Model}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </DialogBase>
    );
}

