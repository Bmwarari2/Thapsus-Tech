import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The site moved from tech.thapsus.uk to app.thapsus.uk. Old links and
      // search results land on the same page at the new address.
      {
        source: "/:path*",
        has: [{ type: "host", value: "tech.thapsus.uk" }],
        destination: "https://app.thapsus.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
