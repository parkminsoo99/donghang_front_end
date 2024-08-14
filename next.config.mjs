/** @type {import('next').NextConfig} */
const nextConfig = {
  //added for solving the error of app-index.js:33 Warning: Prop `className` did not match.
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
