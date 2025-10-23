import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getLocaleMessages } from '@/config/locales';
import { Icon } from '@iconify/react';
import { ShareButtons } from '@/components/ShareButtons';

// 添加 JSX 命名空间声明
declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
            iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
            h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        }
    }

    interface Window {
        AndroidFullScreen?: AndroidFullScreen;
    }
}

interface GameFrameProps {
    src: string;
    title: string;
    cover?: string;
}

interface FullscreenElement extends HTMLIFrameElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitEnterFullscreen?: () => Promise<void>;
}

// 添加 AndroidFullScreen 类型定义
interface AndroidFullScreen {
    immersiveMode: () => void;
    showSystemUI: () => void;
}

// 使用更简单的类型定义避免 TypeScript 错误
type OrientationLockType = 'any' | 'natural' | 'landscape' | 'portrait';

// 添加检测设备性能的函数
const checkDevicePerformance = () => {
    if (typeof window === 'undefined') return false;
    
    // 检查是否为低端设备
    const isLowEnd = 'connection' in navigator && (
        (navigator as any).connection?.effectiveType === 'slow-2g' ||
        (navigator as any).connection?.effectiveType === '2g'
    );
    
    // 检查是否为旧版本浏览器
    const isOldBrowser = !('transform' in document.documentElement.style);
    
    return !(isLowEnd || isOldBrowser);
};

export function GameFrame({ src, title, cover }: GameFrameProps) {
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showTip, setShowTip] = React.useState(false);
    const [isPortrait, setIsPortrait] = React.useState(true);
    const [key, setKey] = React.useState<number>(0);
    const iframeRef = React.useRef<FullscreenElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [canUseHardwareAcceleration, setCanUseHardwareAcceleration] = useState(true);

    // 获取当前语言和翻译文本
    const router = useRouter();
    const locale = router.locale || 'en';
    const localeTexts = getLocaleMessages(locale);

    // 优化设备检测
    const getDeviceInfo = () => {
        if (typeof window === 'undefined') return {
            isIOS: false,
            isAndroid: false,
            isTablet: false,
            isMobile: false
        };

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        const isAndroid = /Android/.test(navigator.userAgent);
        const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(navigator.userAgent);
        const isMobileDevice = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent);
        
        return {
            isIOS,
            isAndroid,
            isTablet,
            isMobile: isIOS || isAndroid || isTablet || isMobileDevice
        };
    };

    const { isIOS, isAndroid, isTablet, isMobile } = getDeviceInfo();

    // 修改 handlePlay 的类型声明
    const handlePlay = React.useCallback((): void => {
        setIsPlaying(true);
    }, []);

    // 修改 setKey 的类型声明
    const handleReload = React.useCallback((): void => {
        if (iframeRef.current) {
            setKey((prev: number) => prev + 1);
            iframeRef.current.src = src;
        }
    }, [src]);

    // 添加屏幕方向锁定的错误处理
    const handleScreenOrientation = async (lock: boolean) => {
        try {
            if (typeof window === 'undefined') return;

            if (isAndroid && 'orientation' in window.screen) {
                const screenOrientation = (window.screen as any).orientation;
                try {
                    if (lock) {
                        await screenOrientation.lock('landscape');
                    } else {
                        await screenOrientation.unlock();
                    }
                } catch (error) {
                    console.warn('Screen orientation lock failed:', error);
                    // 失败时不影响其他功能继续执行
                }
            }

            // iOS 设备特殊处理
            if (isIOS) {
                // iOS 不支持方向锁定，使用提示引导用户
                setShowTip(true);
                setTimeout(() => setShowTip(false), 3000);
            }
        } catch (error) {
            console.error('Error handling screen orientation:', error);
        }
    };

    // 在组件挂载时检查设备性能
    useEffect(() => {
        setCanUseHardwareAcceleration(checkDevicePerformance());
    }, []);

    // 修改 handleFullscreen 函数
    const handleFullscreen = async () => {
        try {
            // PC 端全屏处理 - 恢复原有逻辑
            if (!isMobile) {
                if (!isFullscreen) {
                    if (iframeRef.current) {
                        if (iframeRef.current.requestFullscreen) {
                            await iframeRef.current.requestFullscreen();
                        } else if (iframeRef.current.webkitRequestFullscreen) {
                            await iframeRef.current.webkitRequestFullscreen();
                        } else if (iframeRef.current.msRequestFullscreen) {
                            await iframeRef.current.msRequestFullscreen();
                        }
                    }
                } else {
                    if (document.exitFullscreen) {
                        await document.exitFullscreen();
                    } else if ((document as any).webkitExitFullscreen) {
                        await (document as any).webkitExitFullscreen();
                    } else if ((document as any).msExitFullscreen) {
                        await (document as any).msExitFullscreen();
                    }
                }
                return; // PC 端处理完直接返回
            }

            // 移动端全屏处理
            if (!isFullscreen) {
                setIsFullscreen(true);
                await handleMobileFullscreen(true);
            } else {
                await handleMobileFullscreen(false);
                setIsFullscreen(false);
            }
        } catch (error) {
            console.error('Fullscreen error:', error);
            if (isMobile) {
                setIsFullscreen(false);
            }
        }
    };

    // 恢复 PC 端的全屏变化监听
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!isMobile) {
                const isDocumentFullscreen = document.fullscreenElement !== null ||
                    (document as any).webkitFullscreenElement !== null ||
                    (document as any).mozFullScreenElement !== null ||
                    (document as any).msFullscreenElement !== null;

                if (!isDocumentFullscreen && isFullscreen) {
                    if (iframeRef.current) {
                        iframeRef.current.style.position = '';
                        iframeRef.current.style.width = '100%';
                        iframeRef.current.style.height = '100%';
                        iframeRef.current.style.border = 'none';
                        iframeRef.current.style.borderRadius = '8px';
                        iframeRef.current.style.backgroundColor = 'transparent';
                    }
                    setIsFullscreen(false);
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, [isFullscreen, isMobile]);

    // 添加视口管理
    useEffect(() => {
        if (!isMobile) return;

        const updateViewportMeta = () => {
            const metaViewport = document.querySelector('meta[name=viewport]');
            if (!metaViewport) return;

            if (isFullscreen) {
                const content = isIOS 
                    ? 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
                    : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                metaViewport.setAttribute('content', content);
            } else {
                // 恢复原始视口设置
                metaViewport.setAttribute('content', 
                    'width=device-width, initial-scale=1.0, viewport-fit=cover'
                );
            }
        };

        // 初始更新
        updateViewportMeta();

        // 清理函数
        return () => {
            if (isFullscreen) {
                const metaViewport = document.querySelector('meta[name=viewport]');
                if (metaViewport) {
                    metaViewport.setAttribute('content', 
                        'width=device-width, initial-scale=1.0, viewport-fit=cover'
                    );
                }
            }
        };
    }, [isFullscreen, isMobile, isIOS]);

    // 修改容器尺寸计算
    useEffect(() => {
        if (!isMobile || !containerRef.current) return;

        const updateContainerSize = () => {
            const container = containerRef.current;
            if (!container) return;

            if (isFullscreen) {
                // 获取实际可用高度
                const height = window.visualViewport?.height || window.innerHeight;
                const width = window.visualViewport?.width || window.innerWidth;

                // 设置容器尺寸
                container.style.height = `${height}px`;
                container.style.width = `${width}px`;

                // 处理安全区域
                if (isIOS) {
                    container.style.paddingTop = 'env(safe-area-inset-top)';
                    container.style.paddingBottom = 'env(safe-area-inset-bottom)';
                }
            } else {
                // 恢复默认尺寸
                container.style.height = '';
                container.style.width = '';
                container.style.paddingTop = '';
                container.style.paddingBottom = '';
            }
        };

        updateContainerSize();

        const handleResize = () => {
            requestAnimationFrame(updateContainerSize);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [isFullscreen, isMobile, isIOS]);

    // 修改移动端全屏处理
    const handleMobileFullscreen = async (enter: boolean) => {
        try {
            if (enter) {
                // 进入全屏
                if (containerRef.current) {
                    // 先设置方向，再设置样式
                    await handleScreenOrientation(true);
                    
                    // 使用 requestAnimationFrame 确保样式更新在正确时机
                    requestAnimationFrame(() => {
                        if (!containerRef.current) return;
                        
                        // 基础样式
                        const baseStyles = {
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            zIndex: '9999',
                            margin: '0',
                            padding: '0',
                            backgroundColor: '#000',
                        };

                        // 根据设备添加特定样式
                        const deviceSpecificStyles = isIOS ? {
                            paddingTop: 'env(safe-area-inset-top)',
                            paddingBottom: 'env(safe-area-inset-bottom)',
                        } : {};

                        Object.assign(
                            containerRef.current.style,
                            baseStyles,
                            deviceSpecificStyles
                        );
                    });
                }
            } else {
                // 退出全屏
                await handleScreenOrientation(false);
                
                if (containerRef.current) {
                    // 使用 requestAnimationFrame 确保样式重置在正确时机
                    requestAnimationFrame(() => {
                        if (!containerRef.current) return;
                        
                        // 重置所有样式
                        const resetStyles = {
                            position: '',
                            top: '',
                            left: '',
                            width: '',
                            height: '',
                            zIndex: '',
                            margin: '',
                            padding: '',
                            transform: '',
                            backgroundColor: '',
                            paddingTop: '',
                            paddingBottom: '',
                        };

                        Object.assign(containerRef.current.style, resetStyles);
                    });
                }
            }
        } catch (error) {
            console.error('Error handling mobile fullscreen:', error);
            // 发生错误时确保状态正确
            setIsFullscreen(false);
        }
    };

    // 添加返回键处理
    useEffect(() => {
        if (!isMobile || !isFullscreen) return;

        const handleBackButton = (event: PopStateEvent) => {
            event.preventDefault();
            handleFullscreen();
            // 恢复历史状态
            window.history.pushState(null, '', window.location.href);
        };

        // 添加历史状态
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [isMobile, isFullscreen]);

    // 优化屏幕方向变化处理
    useEffect(() => {
        if (!isMobile) return;

        let resizeTimeout: NodeJS.Timeout;
        const handleOrientationChange = () => {
            // 防抖处理
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isPortraitNow = window.innerHeight > window.innerWidth;
                setIsPortrait(isPortraitNow);

                if (isFullscreen) {
                    // 重新计算尺寸
                    const height = window.visualViewport?.height || window.innerHeight;
                    const width = window.visualViewport?.width || window.innerWidth;

                    if (containerRef.current) {
                        containerRef.current.style.height = `${height}px`;
                        containerRef.current.style.width = `${width}px`;
                    }

                    // 更新 iframe 尺寸
                    if (iframeRef.current) {
                        iframeRef.current.style.height = `${height}px`;
                        iframeRef.current.style.width = `${width}px`;
                    }
                }
            }, 150); // 150ms 防抖
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        // 同时监听 resize，因为某些设备可能不触发 orientationchange
        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleOrientationChange);
            clearTimeout(resizeTimeout);
        };
    }, [isMobile, isFullscreen]);

    // 监听屏幕方向变化
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const isPortrait = screenHeight > screenWidth;
            setIsPortrait(isPortrait);

            if (!isFullscreen) {
                // 非全屏状态的尺寸处理
                if (isMobile) {
                    if (isTablet) {
                        containerRef.current.style.width = isPortrait ? '90vw' : '80vw';
                        containerRef.current.style.height = isPortrait ? '60vh' : '70vh';
                    } else {
                        containerRef.current.style.width = isPortrait ? '95vw' : '85vw';
                        containerRef.current.style.height = isPortrait ? '40vh' : '50vh';
                    }
                    containerRef.current.style.margin = 'auto';
                } else {
                    containerRef.current.style.width = '100%';
                    containerRef.current.style.height = 'auto';
                    containerRef.current.style.margin = '';
                }
            }

            // 更新视口设置
            if (isAndroid && isFullscreen) {
                const metaViewport = document.querySelector('meta[name=viewport]');
                if (metaViewport) {
                    metaViewport.setAttribute('content',
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                    );
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [isFullscreen, isMobile, isTablet, isAndroid]);

    return (
        <div 
            ref={containerRef} 
            className={`
                mx-auto flex flex-col bg-theme-bg-primary dark:bg-dark-secondary 
                backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-theme-border
                transition-all duration-300
                ${isFullscreen && isMobile ? 'fixed inset-0' : ''}
                ${isFullscreen && !isMobile ? 'browser-window-fullscreen' : ''}
                ${isFullscreen && isAndroid && !isPortrait ? 'android-landscape-fullscreen' : ''}
            `}
            style={{
                ...(isFullscreen && isAndroid && !isPortrait ? {
                    height: 'calc(var(--vh, 1vh) * 100)',
                } : {})
            }}
        >
            <div className="relative w-full h-full min-h-[40vh] md:aspect-video bg-dark-secondary">
                {/* 控制按钮 - 始终显示 */}
                <div className={`
                    absolute top-2 right-2 z-50 flex items-center gap-2 
                    bg-black/60 backdrop-blur-sm rounded-lg p-1.5
                    transition-opacity duration-300
                    ${!isPlaying && !isFullscreen ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
                `}>
                    <button
                        onClick={handleReload}
                        className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors touch-manipulation"
                        title={localeTexts.gameFrame.refresh}
                        aria-label={localeTexts.gameFrame.refresh}
                    >
                        <Icon icon="material-symbols:refresh" className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleFullscreen()}
                        className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors touch-manipulation"
                        title={isFullscreen ? localeTexts.gameFrame.exitFullscreen : localeTexts.gameFrame.fullscreen}
                        aria-label={isFullscreen ? localeTexts.gameFrame.exitFullscreen : localeTexts.gameFrame.fullscreen}
                    >
                        <Icon 
                            icon={isFullscreen ? "material-symbols:fullscreen-exit" : "material-symbols:fullscreen"} 
                            className="w-6 h-6" 
                        />
                    </button>
                </div>

                {/* 游戏内容 */}
                <div className="relative w-full h-full">
                    {!isPlaying ? (
                        <div 
                            className="absolute inset-0 cursor-pointer group"
                            onClick={handlePlay}
                            role="button"
                            tabIndex={0}
                            aria-label={localeTexts.gameFrame.startGame}
                        >
                            <img
                                src={cover || '/images/default-game-cover.jpg'}
                                alt={`${title} - Genshin Wish Simulator Game Preview`}
                                width="1200"
                                height="630"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="bg-white/90 rounded-full p-4">
                                    <Icon icon="material-symbols:play-arrow" className="w-12 h-12 text-primary-500" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <iframe
                            key={key}
                            ref={iframeRef}
                            src={src}
                            title={title}
                            className="absolute inset-0 w-full h-full"
                            style={{
                                border: 'none',
                                borderRadius: isFullscreen ? '0' : '8px',
                                backgroundColor: isFullscreen ? '#000' : 'transparent'
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-fullscreen"
                        />
                    )}
                </div>

                {/* 提示信息 */}
                {showTip && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-30">
                        {isIOS ? localeTexts.gameFrame.exitTipIOS : localeTexts.gameFrame.exitTipOther}
                    </div>
                )}
            </div>
            
            {!isFullscreen && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-theme-border">
                <div className="flex items-center gap-2">
                    {cover && (
                            <img
                                src={cover}
                                alt={`${localeTexts.gameFrame.coverImageAlt} ${title}`}
                                width="32"
                                height="32"
                                loading="lazy"
                                className="w-8 h-8 rounded-lg object-cover"
                            />
                    )}
                    <p className="text-base font-medium text-theme-text-primary">{title}</p>
                </div>
                    <div className="flex items-center">
                        <div className="hidden sm:block">
                        <ShareButtons />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}