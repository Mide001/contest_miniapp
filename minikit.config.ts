const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Contest App",
    subtitle: "Join and win",
    description: "A miniapp for contests",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#ffffff",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["contest", "social"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "",
    ogTitle: "Contest App",
    ogDescription: "Join contests and win prizes",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
