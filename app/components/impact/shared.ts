/* Data shared across the /impact pages. */

import type { LogoBridgeLogo } from "../common/LogoBridge";
import type { NumberedOffering } from "../common/NumberedOfferings";

export const LINKS = {
  sales: "/book-a-call",
  platform: "/ways-to-engage",
  recognition: "/recognition",
  swag: "/swag",
  snacks: "/snacks",
  gifting: "/gifting",
  events: "/events",
};

/* Routes for the Impact by Team pages — used by the header menu too */
export const TEAM_ROUTES = {
  overview: "/impact",
  hr: "/impact/hr",
  marketing: "/impact/marketing",
  sales: "/impact/sales",
  cx: "/impact/cx",
  leadership: "/impact/leadership",
  officeAdmins: "/impact/office-admins",
  finance: "/impact/finance",
} as const;

export const CASE_STUDY_CAPTION = "Case studies";

/* Workplace tools strip (Figma 3998:9351) — mid-grey marks at 33% */
export const HR_TOOLS: LogoBridgeLogo[] = [
  { src: "/impact/hr/logos/zoom.svg", alt: "Zoom", width: 132, height: 30 },
  { src: "/impact/hr/logos/google-meet.svg", alt: "Google Meet", width: 54.69, height: 45 },
  { src: "/impact/hr/logos/slack.svg", alt: "Slack", width: 45, height: 45 },
  { src: "/impact/hr/logos/linkedin.svg", alt: "LinkedIn", width: 45, height: 45 },
  { src: "/impact/hr/logos/teams.svg", alt: "Microsoft Teams", width: 60, height: 60 },
  { src: "/impact/hr/logos/gmail.svg", alt: "Gmail", width: 58.5, height: 45.21 },
];

/* "One platform. More ways to engage your people." (Figma 3998:14015) */
export const ENGAGE_OFFERINGS: NumberedOffering[] = [
  { title: "Recognition", description: "More than a notification; a reward that shows up at their door." },
  { title: "Swag", description: "Design, storage, shipping, all handled." },
  { title: "Snacks", description: "Vegan, gluten-free, nut-free, and more. Everyone's covered." },
  { title: "Gifting", description: "They choose their gifts and enter their addresses. You never chase." },
  { title: "Hosted Experiences", description: "A real host for in-person or remote experiences. Zero planning on your end." },
];
