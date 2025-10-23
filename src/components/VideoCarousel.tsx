import React from 'react';
import { Icon } from '@iconify/react';

interface VideoItem {
    id: string;
    title: string;
    description?: string;
}

interface VideoCarouselProps {
    title?: string;
    description?: string;
    videos: Array<{
        id: string;
        title: string;
        description?: string;
    }>;
}

export function VideoCarousel({ title, description, videos }: VideoCarouselProps) {
    return (
        <div className="mb-12">
            {/* 标题区域 */}
            {(title || description) && (
                <div className="mb-8">
                    {title && (
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500 mb-4">
                            {title}
                        </p>
                    )}
                    {/* {description && (
                        <p className="text-lg text-theme-text-secondary max-w-3xl">
                            {description}
                        </p>
                    )} */}
                </div>
            )}

            {/* 视频网格 */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="relative bg-theme-bg-secondary rounded-xl overflow-hidden shadow-lg">
                        <div className="aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        {video.title && (
                            <div className="p-4">
                                {/* 调整了文字大小和间距 */}
                                {/* <h3 className="text-lg font-semibold text-theme-text-primary mb-2"> */}
                                <p className="text-base font-semibold text-theme-text-primary mb-1"> 
                                    {video.title}
                                </p>
                                {/* {video.description && (
                                    <p className="text-sm text-theme-text-secondary">
                                        {video.description}
                                    </p>
                                )} */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 