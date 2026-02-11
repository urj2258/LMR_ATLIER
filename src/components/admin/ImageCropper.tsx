"use client";

import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
    aspect?: number;
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel, aspect = 1 }: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const initialCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                width,
                height
            ),
            width,
            height
        );
        setCrop(initialCrop);
    }

    async function handleCrop() {
        if (!completedCrop || !imgRef.current) return;

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );

        canvas.toBlob((blob) => {
            if (blob) {
                onCropComplete(blob);
            }
        }, 'image/jpeg', 1);
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-sm shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] font-serif">Adjust Imagery</h2>
                    <button onClick={onCancel} className="text-black/40 hover:text-black transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-auto bg-[#fcfaf7] flex items-center justify-center min-h-0 border border-black/5">
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt="Crop preview"
                            onLoad={onImageLoad}
                            className="max-w-full max-h-[60vh] object-contain"
                        />
                    </ReactCrop>
                </div>

                <div className="flex items-center justify-end gap-6 pt-8 mt-4 border-t border-black/5">
                    <button
                        onClick={onCancel}
                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCrop}
                        className="bg-[#bd870a] text-white px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
                    >
                        Apply Crop
                    </button>
                </div>
            </div>
        </div>
    );
}
