import React from 'react';
import { useRouter } from 'nextra/hooks';
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    RedditShareButton,
    LinkedinShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    RedditIcon,
    LinkedinIcon,
    EmailIcon
} from 'react-share';

export function ShareButtons() {
    const router = useRouter();
    const [pageInfo, setPageInfo] = React.useState({
        title: '',
        description: '',
        url: '',
        image: ''
    });

    React.useEffect(() => {
        const url = window.location.href;
        const metaTags = document.getElementsByTagName('meta');
        let description = '';
        let image = '';

        for (let i = 0; i < metaTags.length; i++) {
            const name = metaTags[i].getAttribute('name');
            const property = metaTags[i].getAttribute('property');

            if (name === 'description') {
                description = metaTags[i].getAttribute('content') || '';
            }

            // 获取 Open Graph 图片
            if (property === 'og:image') {
                image = metaTags[i].getAttribute('content') || '';
            }
        }

        setPageInfo({
            title: document.title,
            description: description,
            url: url,
            image: image
        });
    }, [router.asPath]);

    const iconProps = {
        size: 32,
        round: true
    };

    // 分享的标题和描述会自动包含图片信息
    const shareTitle = pageInfo.title;
    const shareDescription = `${pageInfo.description}\n\n🎮 Play now: ${pageInfo.url}`;

    return (
        <div className="flex items-center gap-2">
            <FacebookShareButton
                url={pageInfo.url}
                title={shareTitle}
                className="hover:opacity-80 transition-opacity"
            >
                <FacebookIcon {...iconProps} />
            </FacebookShareButton>

            <TwitterShareButton
                url={pageInfo.url}
                title={shareTitle}
                className="hover:opacity-80 transition-opacity"
            >
                <TwitterIcon {...iconProps} />
            </TwitterShareButton>

            <TelegramShareButton
                url={pageInfo.url}
                title={shareTitle}
                className="hover:opacity-80 transition-opacity"
            >
                <TelegramIcon {...iconProps} />
            </TelegramShareButton>

            <RedditShareButton
                url={pageInfo.url}
                title={shareTitle}
                className="hover:opacity-80 transition-opacity"
            >
                <RedditIcon {...iconProps} />
            </RedditShareButton>

            <LinkedinShareButton
                url={pageInfo.url}
                title={shareTitle}
                summary={pageInfo.description}
                className="hover:opacity-80 transition-opacity"
            >
                <LinkedinIcon {...iconProps} />
            </LinkedinShareButton>

            <EmailShareButton
                url={pageInfo.url}
                subject={shareTitle}
                body={shareDescription}
                className="hover:opacity-80 transition-opacity"
            >
                <EmailIcon {...iconProps} />
            </EmailShareButton>
        </div>
    );
}
