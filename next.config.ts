import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.mux.com"
            },
            {
                protocol: "https",
                hostname: "utfs.io"
            },
            {
                protocol: "https",
                hostname: "efns2upfjc.ufs.sh"
            }
        ]
    }
};

export default nextConfig;
