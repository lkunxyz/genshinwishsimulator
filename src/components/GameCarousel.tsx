import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { GameCard } from './GameCard';
import type { FrontMatter } from '@/types';

interface GameCarouselProps {
    title: string;
    games: FrontMatter[];
    className?: string;
}

export function GameCarousel({ title, games, className = '' }: GameCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(games.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const visibleGames = games.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <div className={className}>
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-2xl font-bold text-theme-text-primary">{title}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-theme-text-secondary hover:text-primary-500 transition-colors"
                            disabled={currentIndex === 0}
                        >
                            <Icon icon="material-symbols:chevron-left" className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-theme-text-secondary hover:text-primary-500 transition-colors"
                            disabled={currentIndex === totalPages - 1}
                        >
                            <Icon icon="material-symbols:chevron-right" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visibleGames.map((game) => (
                        <GameCard
                            key={game.slug}
                            href={game.slug || '#'}
                            title={game.title || ''}
                            description={game.description}
                            cover={game.cover}
                            category={game.category}
                            date={game.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 