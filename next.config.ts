import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 compiler: {
    styledComponents: true, // isso ativa o suporte nativo sem precisar do Babel plugin
  },
};

export default nextConfig;
