import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AGRI MBA WALA",
    short_name: "AGRI MBA",
    description: "Practical agriculture knowledge and stronger local farm connections.",
    start_url: "/en",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#174d34",
    icons: [{ src: "/brand/logo.jpeg", sizes: "1024x1024", type: "image/jpeg" }],
  };
}
