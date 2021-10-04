import Head from 'next/head';

type SEO = {
  title?: string | undefined;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
};

function SEO({ title, description, image, keywords, url }: SEO): JSX.Element {
  const basicConfig = {
    title: '위치킨',
    siteTitle: '>wechicken',
    description:
      'wechicken OPEN! wechicken은 치킨계 여러분들을 응원합니다! 블로그 열심히 쓰고 취뽀하자!',
    url: 'https://wechicken.me',
    image:
      'https://user-images.githubusercontent.com/60738400/135762435-2404b7aa-bfb1-4e42-afb8-f24c6f1555c3.jpg',
    keywords: `치킨계, 위치킨, wechicken, 개발자, 기술블로그`,
  };

  return (
    <Head>
      <title>{`>wechicken`}</title>
      <title>{`${title ?? basicConfig.title} | ${basicConfig.siteTitle}`}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <meta name="description" content={basicConfig.description} />
      <meta name="keywords" content={`${basicConfig.keywords}, ${keywords ? keywords : ''}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | ${basicConfig.siteTitle}`} />
      <meta property="og:description" content={basicConfig.description} />
      <meta property="og:site_name" content={basicConfig.siteTitle} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={image ?? basicConfig.image} />
      <meta property="og:url" content={url ?? basicConfig.url} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={`${title} | ${basicConfig.siteTitle}`} />
      <meta property="twitter:description" content={description ?? basicConfig.description} />
      <meta name="description" content={description ?? basicConfig.description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={`${title} | ${basicConfig.siteTitle}`} />
      <meta
        name="og:description"
        property="og:description"
        content={description ?? basicConfig.description}
      />
      <meta property="og:site_name" content=">wechicken" />
      <meta property="og:url" content={url ?? basicConfig.url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description ?? basicConfig.description} />
      <meta name="twitter:site" content={basicConfig.url} />
      <link rel="icon" href={`${basicConfig.url}/favicon.ico`} />
      <link rel="apple-touch-icon" href={`${basicConfig.url}/favicon.ico`} />
      <meta property="og:image" content={image ?? basicConfig.image} />
      <meta name="twitter:image" content={image ?? basicConfig.image} />
      <link rel="canonical" href={basicConfig.url} />
    </Head>
  );
}

export default SEO;
