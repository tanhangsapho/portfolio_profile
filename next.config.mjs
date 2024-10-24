/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.s3.us-east-1.amazonaws.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '*.s3.amazonaws.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '*.cloudfront.net',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;