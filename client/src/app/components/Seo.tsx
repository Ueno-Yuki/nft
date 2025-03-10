import React from 'react'
import Head from 'next/head'

interface MetaData {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageImgWidth?: number
  pageImgHeight?: number
}

const Seo = (prop: MetaData) => {
  const defaultTitle = 'NFT-Mint';
  const defaultDescription = 'develop Nft-Mint page.'
  const title = defaultTitle;
  const description = defaultDescription;
  const url = prop.pagePath;
  const imgUrl = prop.pageImg;
  const imgWidth = prop.pageImgWidth ? prop.pageImgHeight : 1920;
  const imgHeight = prop.pageImgHeight ? prop.pageImgHeight : 1005;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content="website" />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} />
      <link rel="preconnect" href="" />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Seo