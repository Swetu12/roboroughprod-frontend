'use client';

import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import { homeMeta } from '@/app/api/fetchData';
import Loader from '@/components/ui/Loader';

interface SeoMetadata {
  title: string;
  meta_description: string;
  keywords: string[] | undefined; // Allow for undefined keywords
}

export default function Home() {
  const [seo, setSeo] = useState<SeoMetadata | null>(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      const metadata = await homeMeta();
      console.log('Fetched Seo Data: ', metadata);
      setSeo(metadata);
    };

    fetchSeoData();
  }, []);

  if (!seo) {
    return <Loader />;
  }

  const keywords = seo.keywords && seo.keywords.length > 0 ? seo.keywords.join(', ') : 'default, keywords';

  return (
    <>
      <NextSeo
        title={seo.title || 'Default Title'}
        description={seo.meta_description || 'Default Description'}
        openGraph={{
          title: seo.title || 'Default Title',
          description: seo.meta_description || 'Default Description',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
        ]}
      />
      <Hero />
      <Services />
      <About />
      <Reviews />
    </>
  );
}
