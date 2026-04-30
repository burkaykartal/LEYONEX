/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        // Tüm sayfalara uygulanması için (.*) kullanıyoruz
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow', // noindex'i zorla ezecek olan sihirli kelime
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
