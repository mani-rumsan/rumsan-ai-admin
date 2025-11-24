export const LANDING_PAGE = process.env.NEXT_PUBLIC_LANDING_PAGE || "";

export const validLandingPages = ["bank", "vet"] as const;

export type LandingPageType = (typeof validLandingPages)[number];

export function getLandingPage(): LandingPageType {
  if (validLandingPages.includes(LANDING_PAGE as LandingPageType))
    return LANDING_PAGE as LandingPageType;
  return "" as LandingPageType;
}
