import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface CollapsibleArticleProps {
    children: React.ReactNode;
}

export const CollapsibleArticle: React.FC<CollapsibleArticleProps> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            setShowButton(contentHeight > 500);
        }
    }, [children]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="relative">
            <div
                ref={contentRef}
                style={{
                    maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '500px'
                }}
                className="prose dark:prose-invert max-w-none overflow-hidden transition-all duration-300 ease-in-out"
            >
                {children}
            </div>
            
            {!isExpanded && showButton && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#242424] to-transparent pointer-events-none" />
            )}

            {showButton && (
                <button
                    onClick={toggleExpand}
                    className="mt-4 flex items-center justify-center w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none"
                >
                    <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                    <Icon
                        icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                        className="ml-2 w-5 h-5"
                    />
                </button>
            )}
        </div>
    );
}; 