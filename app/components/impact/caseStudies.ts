/* Case-study / article cards for the closing section of each /impact page.
   Copy + links from the content sheet; images are each linked page's featured
   image (public/impact/case-studies). Pages with no usable featured image
   leave `image` unset and fall back to the grey placeholder slot. */

import type { StaticImageData } from "next/image";

import apollo from "@/public/impact/case-studies/apollo.png";
import b2bRewards from "@/public/impact/case-studies/b2b-rewards.png";
import constructconnect from "@/public/impact/case-studies/constructconnect.png";
import customerLoyalty from "@/public/impact/case-studies/customer-loyalty.png";
import everflow from "@/public/impact/case-studies/everflow.png";
import isolved from "@/public/impact/case-studies/isolved.png";
import kentro from "@/public/impact/case-studies/kentro.png";
import keyfactor from "@/public/impact/case-studies/keyfactor.png";
import myDigitalOffice from "@/public/impact/case-studies/mydigitaloffice.png";
import octus from "@/public/impact/case-studies/octus.png";
import premierRoofing from "@/public/impact/case-studies/premier-roofing.webp";
import oxygen from "@/public/impact/case-studies/oxygen-forensics.svg";
import recognitionBudget from "@/public/impact/case-studies/recognition-budget.png";
import riverwoods from "@/public/impact/case-studies/riverwoods-group.png";
import sana from "@/public/impact/case-studies/sana-commerce.jpg";
import theStandard from "@/public/impact/case-studies/the-standard.png";
import workato from "@/public/impact/case-studies/workato.png";

const SITE = "https://www.bystadium.com";

export type CaseStudyCard = {
  title: string;
  description: string;
  href: string;
  image?: StaticImageData;
  imageAlt?: string;
};

const card = (
  title: string,
  description: string,
  path: string,
  image?: StaticImageData,
): CaseStudyCard => ({ title, description, href: `${SITE}/${path}`, image, imageAlt: image ? title : undefined });

const CASES = {
  constructconnectTeams: card(
    "How ConstructConnect centralized swag across teams",
    "By moving to using Stadium for swag, ConstructConnect made it easier for teams to collaborate and manage gifting, events, and advocacy company-wide.",
    "case-overview/constructconnect",
    constructconnect,
  ),
  riverwoodsYearRound: card(
    "How RiverWoods Group turned gifting into year-round recognition",
    "RiverWoods Group started with a holiday gifting shop run by marketing, then HR expanded it into recognition for new hires, work anniversaries, team appreciation and company events.",
    "case-overview/riverwoods-group",
    riverwoods,
  ),
  keyfactor: card(
    "How Keyfactor scaled global recognition on one platform",
    "Keyfactor replaced separate platforms for recognition, swag, gift cards and experiences with Stadium, supporting onboarding, events and engagement for teams across North America and Europe.",
    "case-overview/keyfactor",
    keyfactor,
  ),
  everflow: card(
    "How Everflow made recognition part of everyday work",
    "Everflow brought recognition, rewards, onboarding and milestones into one platform. Swag admin dropped from 8–10 hours a month to 1–2.",
    "case-overview/everflow",
    everflow,
  ),
  octusHris: card(
    "How Octus automated onboarding with its HRIS",
    "Octus connected Stadium to HiBob so every new hire automatically gets points to spend in the company shop. No collecting sizes or addresses.",
    "case-overview/octus",
    octus,
  ),
  riverwoodsHr: card(
    "How RiverWoods Group turned gifting into year-round recognition",
    "RiverWoods Group expanded a holiday shop into recognition for new hires, work anniversaries, team appreciation and company events, giving employees more choice while keeping programs easy for HR to manage.",
    "case-overview/riverwoods-group",
    riverwoods,
  ),
  octusFinance: card(
    "How Octus kept engagement spend predictable",
    "Octus chose Stadium for cost-predictable programs. Spending stays within set limits, and unredeemed gifts can expire so the money comes back.",
    "case-overview/octus",
    octus,
  ),
  isolved: card(
    "How isolved cut warehouse and shipping costs with an on-demand shop",
    "isolved replaced a bulk-swag vendor that had warehouse fees, manual inventory and high shipping costs with an on-demand company shop funded from a shared Wallet.",
    "case-overview/isolved",
    isolved,
  ),
  recognitionBudget: card(
    "Employee Recognition Budget: How to Plan It",
    "How to set a recognition budget that holds up through the year, with benchmarks, spend categories and a worked example for a 500-person company.",
    "blog/employee-recognition-budget",
    recognitionBudget,
  ),
  constructconnectMarketing: card(
    "How ConstructConnect brought customer gifting, events and brand swag onto one platform",
    "ConstructConnect's brand and digital marketing team replaced a bulk-only vendor. They now run customer gifting, advocacy rewards, bulk event orders and branded stores from one place, with separate stores and admins for each team.",
    "case-overview/constructconnect",
    constructconnect,
  ),
  premierBrand: card(
    "How Premier Roofing gave its brand a home across every team",
    "Premier Roofing's brand marketing team left a vendor that had inaccurate inventory and needed manual store updates. They moved to branded Stadium Shops on a custom domain, with separate shops for different occasions, used by Sales, Marketing and HR.",
    "case-overview/premier-roofing",
    premierRoofing,
  ),
  oxygen: card(
    "How Oxygen Forensics sent branded swag to a partner event across Asia",
    "Oxygen Forensics needed branded swag for a partner meetup in Singapore, Malaysia, Taiwan and Hong Kong. Stadium sourced everything from local vendors, so the team didn't have to deal with customs.",
    "case-study/computer-software-5",
    oxygen,
  ),
  sanaSales: card(
    "How Sana Commerce gave clients in six countries a gift they could choose",
    "Sana Commerce set up a branded shop to thank 250 clients across six countries. Each client picked their own gift, and the team now has a shop it can keep using for client gifting, local or international.",
    "case-study/branded-e-commerce-shop",
    sana,
  ),
  constructconnectSales: card(
    "How ConstructConnect made customer gifting part of how it builds relationships",
    "ConstructConnect uses Stadium to send swag and gifts to customers, including thank-yous for reviews and advocacy. More than 50 customers have been gifted without the team needing to work through separate vendors.",
    "case-overview/constructconnect",
    constructconnect,
  ),
  b2bRewards: card(
    "B2B Rewards and Incentives",
    "How to build business loyalty programs and incentives that thank clients and strengthen customer relationships.",
    "blog/b2b-rewards-and-incentives",
    b2bRewards,
  ),
  myDigitalOffice: card(
    "How myDigitalOffice brought client and employee gifting under one roof",
    "myDigitalOffice was using several vendors for its gifting. It consolidated onto one platform with a custom store where clients and employees pick their own gear, plus bulk swag for events.",
    "case-study/information-management-platform",
    myDigitalOffice,
  ),
  sanaCx: card(
    "How Sana Commerce created a lasting way to celebrate clients worldwide",
    "Sana Commerce built a branded shop to thank 250 clients in six countries. Each client chose their own gift, and the team now has a shop it can keep using to gift clients anywhere.",
    "case-study/branded-e-commerce-shop",
    sana,
  ),
  customerLoyalty: card(
    "Customer Loyalty Gift Rewards and Appreciation Loyalty Programs",
    "Ideas for customer loyalty gifts and rewards that show appreciation and strengthen long-term customer relationships.",
    "blog/customer-loyalty-gift-ideas",
    customerLoyalty,
  ),
  workatoGlobal: card(
    "How Workato runs global gifting for employees and customers from one platform",
    "Workato replaced several swag vendors and bulk inventory with Stadium Shops. It now runs more than 10 branded shops, covering everything from employee birthdays to customer appreciation, and has gifted in 25+ countries.",
    "case-overview/workato",
    workato,
  ),
  apollo: card(
    "How Apollo scaled gifting and recognition across 20+ countries",
    "Apollo needed one partner for a team spread across more than 20 countries, after other vendors could only source country by country. It now runs 47 shops for kickoffs, offsites, new hires and recognition, and admins can hand off responsibilities.",
    "case-overview/apollo",
    apollo,
  ),
  premierTeams: card(
    "How Premier Roofing brought Sales, Marketing and HR onto one swag platform",
    "Premier Roofing replaced a vendor that had inaccurate inventory and needed manual store updates. Its Sales, Marketing and HR teams now use Stadium, with SSO, a custom domain, separate shops for different occasions, and automated new-hire sends.",
    "case-overview/premier-roofing",
    premierRoofing,
  ),
  theStandard: card(
    "How The Standard made company-wide celebrations easy to run",
    "The Standard's administrative team ran Customer Service Week for 600+ recipients from one branded shop. Each recipient got points to choose their own gift, and the team saved 37+ hours of manual coordination.",
    "case-overview/the-standard",
    theStandard,
  ),
  kentro: card(
    "How Kentro put new-hire swag on autopilot as it grew",
    "Kentro grew from 100 to 800 employees and moved from bulk orders and packing parties to an on-demand shop. New-hire gifting now runs automatically through its UKG integration, with stored swag ready for conference kits and events.",
    "case-overview/kentro",
    kentro,
  ),
  workatoOffice: card(
    "How Workato covers employees across 25+ countries without juggling vendors",
    "Workato's administrative operations team replaced swag stored in offices and with vendors, plus the customs problems that came with it, with on-demand shops that reach employees across 25+ countries.",
    "case-overview/workato",
    workato,
  ),
};

export const CASE_STUDIES = {
  hub: [CASES.constructconnectTeams, CASES.riverwoodsYearRound, CASES.keyfactor],
  hr: [CASES.everflow, CASES.octusHris, CASES.riverwoodsHr],
  finance: [CASES.octusFinance, CASES.isolved, CASES.recognitionBudget],
  marketing: [CASES.constructconnectMarketing, CASES.premierBrand, CASES.oxygen],
  sales: [CASES.sanaSales, CASES.constructconnectSales, CASES.b2bRewards],
  cx: [CASES.myDigitalOffice, CASES.sanaCx, CASES.customerLoyalty],
  leadership: [CASES.workatoGlobal, CASES.apollo, CASES.premierTeams],
  officeAdmins: [CASES.theStandard, CASES.kentro, CASES.workatoOffice],
} satisfies Record<string, CaseStudyCard[]>;
