/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://3.138.138.88:8080/:path*',
      },
    ];
  },
  //added for solving the error of app-index.js:33 Warning: Prop `className` did not match.
  compiler: {
    styledComponents: true,
  },
  //added for cors errors
};
