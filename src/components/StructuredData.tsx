import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 * Helps search engines understand page content and enables rich snippets
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}

/**
 * Generate WebSite Schema
 * Provides search engines with information about the website
 */
export function generateWebSiteSchema(siteUrl: string, siteName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteName,
    'url': siteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate Organization Schema
 * Provides information about the organization/company
 */
export function generateOrganizationSchema(
  siteUrl: string,
  siteName: string,
  logo: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': siteName,
    'url': siteUrl,
    'logo': logo,
    'sameAs': []
  };
}

/**
 * Generate WebPage Schema
 * Basic schema for any web page
 */
export function generateWebPageSchema(
  url: string,
  name: string,
  description?: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'url': url,
    'name': name,
    'description': description || '',
    'image': image || '',
    'inLanguage': 'en'
  };
}

/**
 * Generate VideoGame Schema
 * Specifically for game pages
 */
export function generateVideoGameSchema(
  url: string,
  name: string,
  description: string,
  image: string,
  gameUrl?: string
) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    'name': name,
    'description': description,
    'url': url,
    'image': image,
    'genre': 'Puzzle Game',
    'applicationCategory': 'Game'
  };

  if (gameUrl) {
    schema.gameLocation = gameUrl;
  }

  return schema;
}

/**
 * Generate BreadcrumbList Schema
 * Helps search engines understand page hierarchy
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generate FAQPage Schema
 * Enables FAQ rich snippets in search results
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generate HowTo Schema
 * Enables step-by-step rich snippets for instructional content
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'step': steps.map((step, index) => {
      const stepData: Record<string, any> = {
        '@type': 'HowToStep',
        'position': index + 1,
        'name': step.name,
        'text': step.text
      };
      if (step.image) {
        stepData.image = step.image;
      }
      return stepData;
    })
  };
}
