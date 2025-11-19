export interface FooterLink {
    text: string;
    url: string;
    external?: boolean;
  }
  
  export interface FooterColumn {
    heading: string;
    links: FooterLink[];
  }
  
  export const FOOTER_DATA = {
    columns: [
      {
        heading: "Tools",
        links: [
          { text: "Pro Clothes Swap", url: "/advance-clothes-swap" },
          { text: "Quick Clothes Swap", url: "/clothes-swap" },
          { text: "Face Swap", url: "/face-swapper" },
        ]
      },
      {
        heading: "Workflows",
        links: [
          { text: "Video Generator", url: "/dashboard?type=video-generator" },
          { text: "Model Gen", url: "/dashboard?type=model-generator" },
          { text: "Clothes Gen", url: "/dashboard?type=cloth-generator" },
          { text: "Fashion Modeling", url: "/dashboard?type=fashion-modeling" },
          { text: "Product Modeling", url: "/dashboard?type=product-modeling" },
          { text: "Transformer Studio", url: "/dashboard?type=edit-image" },
          { text: "Camera Angle Change", url: "/dashboard?type=camera-angle-changer" },
          { text: "Background Replacer", url: "/dashboard?type=background-replacer" },
          { text: "Image Upscaler", url: "/dashboard?type=image-upscaler-v2" },
          { text: "Model Swap", url: "/dashboard?type=model-swap" },
          { text: "Sketch to Image", url: "/dashboard?type=sketch-generator" },
          { text: "Clothes Color Change", url: "/dashboard?type=cloth-color-change" },
          { text: "Clothes Extractor", url: "/dashboard?type=cloth-extractor" },
          { text: "Pose Generator", url: "/dashboard?type=pose-generator" },
        ]
      },
      {
        heading: "Company",
        links: [
          { text: "Contact", url: "mailto:contact@dressr.ai" },
          { text: "Pricing", url: "/price" }
        ]
      },
      {
        heading: "Legal",
        links: [
          { text: "Terms", url: "/terms-of-service.html", external: true },
          { text: "Privacy", url: "/privacy-policy.html", external: true },
          { text: "Cancellation", url: "/cancellation-policy.html", external: true },
        ]
      }
    ] as FooterColumn[]
  };
  