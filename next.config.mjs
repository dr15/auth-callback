/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-auth"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/protected/one",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
