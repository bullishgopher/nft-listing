/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud', 'itsblockchain.com', 'i.ibb.co', 'i.imgur.com', 'res.cloudinary.com', 'imgur.com', 'pbs.twimg.com'],
  },
})
