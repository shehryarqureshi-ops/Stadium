/* Stadium integrations directory — mirrors bystadium.com/integrations-listing.
 Logos: full-colour brand SVGs in public/integrations/directory/<slug>.svg;
 width/height are the viewBox ratio at 45px tall (the directory card caps height at 45). */

import type { Integration } from "@/app/components/common/IntegrationsDirectory";

export const INTEGRATION_FILTERS = [
  { label: "All integrations", value: "all" },
  { label: "HRIS", value: "hris" },
  { label: "ATS", value: "ats" },
  { label: "CRM", value: "crm" },
];

export const INTEGRATIONS: Integration[] = [
  { name: "ADP Workforce Now", categories: ["all", "hris"], logo: { src: "/integrations/directory/adp-workforce-now.svg", width: 45.0, height: 45 } },
  { name: "Alexis HR", categories: ["all", "hris"], logo: { src: "/integrations/directory/alexis-hr.svg", width: 106.1, height: 45 } },
  { name: "Altera Payroll", categories: ["all", "hris"] },
  { name: "BambooHR", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/bamboohr.svg", width: 317.6, height: 45 } },
  { name: "Breathe", categories: ["all", "hris"], logo: { src: "/integrations/directory/breathe.svg", width: 246.1, height: 45 } },
  { name: "Charlie", categories: ["all", "hris"], logo: { src: "/integrations/directory/charlie.svg", width: 139.9, height: 45 } },
  { name: "ChartHop", categories: ["all", "hris"], logo: { src: "/integrations/directory/charthop.svg", width: 141.2, height: 45 } },
  { name: "Clay HR", categories: ["all", "hris", "ats"] },
  { name: "Darwinbox", categories: ["all", "hris"] },
  { name: "Dayforce", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/dayforce.svg", width: 187.9, height: 45 } },
  { name: "Employment Hero", categories: ["all", "hris"] },
  { name: "Factorial", categories: ["all", "hris"], logo: { src: "/integrations/directory/factorial.svg", width: 45.0, height: 45 } },
  { name: "Freshteam HRIS", categories: ["all", "hris"], logo: { src: "/integrations/directory/freshteam-hris.svg", width: 45.0, height: 45 } },
  { name: "Gusto", categories: ["all", "hris"], logo: { src: "/integrations/directory/gusto.svg", width: 118.2, height: 45 } },
  { name: "Hibob", categories: ["all", "hris"], logo: { src: "/integrations/directory/hibob.svg", width: 45.0, height: 45 } },
  { name: "Home Run", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/home-run.svg", width: 218.1, height: 45 } },
  { name: "HR Cloud", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/hr-cloud.svg", width: 187.3, height: 45 } },
  { name: "HR Partner", categories: ["all", "hris"] },
  { name: "HubSpot", categories: ["all", "crm"], logo: { src: "/integrations/directory/hubspot.svg", width: 154.6, height: 45 } },
  { name: "Humaans", categories: ["all", "hris"], logo: { src: "/integrations/directory/humaans.svg", width: 320.3, height: 45 } },
  { name: "Insperity Premier", categories: ["all", "hris"] },
  { name: "IntelliHR", categories: ["all", "hris"] },
  { name: "Tellent", categories: ["all", "ats"], logo: { src: "/integrations/directory/tellent.svg", width: 203.2, height: 45 } },
  { name: "Clockwork", categories: ["all", "ats"] },
  { name: "ApplicantStack", categories: ["all", "ats"] },
  { name: "Greenhouse Job Board API", categories: ["all", "ats"], logo: { src: "/integrations/directory/greenhouse-job-board-api.svg", width: 201.0, height: 45 } },
  { name: "Recruiter Flow", categories: ["all", "ats"] },
  { name: "TalentLyft", categories: ["all", "ats"], logo: { src: "/integrations/directory/talentlyft.svg", width: 130.5, height: 45 } },
  { name: "Fountain", categories: ["all", "ats"], logo: { src: "/integrations/directory/fountain.svg", width: 263.1, height: 45 } },
  { name: "JazzHR", categories: ["all", "ats"], logo: { src: "/integrations/directory/jazzhr.svg", width: 203.6, height: 45 } },
  { name: "Breezy", categories: ["all", "ats"] },
  { name: "Jobvite", categories: ["all", "ats"], logo: { src: "/integrations/directory/jobvite.svg", width: 204.9, height: 45 } },
  { name: "Freshteam", categories: ["all", "ats"], logo: { src: "/integrations/directory/freshteam.svg", width: 225.0, height: 45 } },
  { name: "Workable", categories: ["all", "ats"], logo: { src: "/integrations/directory/workable.svg", width: 45.0, height: 45 } },
  { name: "JobScore", categories: ["all", "ats"], logo: { src: "/integrations/directory/jobscore.svg", width: 285.9, height: 45 } },
  { name: "Engage", categories: ["all", "ats"] },
  { name: "Ashby", categories: ["all", "ats"], logo: { src: "/integrations/directory/ashby.svg", width: 137.3, height: 45 } },
  { name: "Comeet", categories: ["all", "ats"], logo: { src: "/integrations/directory/comeet.svg", width: 180.0, height: 45 } },
  { name: "Talent Reef", categories: ["all", "ats"] },
  { name: "Oracle Taleo", categories: ["all", "ats"], logo: { src: "/integrations/directory/oracle-taleo.svg", width: 343.9, height: 45 } },
  { name: "CATS", categories: ["all", "ats"], logo: { src: "/integrations/directory/cats.svg", width: 136.6, height: 45 } },
  { name: "Jobsoid", categories: ["all", "ats"], logo: { src: "/integrations/directory/jobsoid.svg", width: 147.2, height: 45 } },
  { name: "SmartRecruiters", categories: ["all", "ats"], logo: { src: "/integrations/directory/smartrecruiters.svg", width: 230.0, height: 45 } },
  { name: "Lever", categories: ["all", "ats"] },
  { name: "Cornerstone Talent Link", categories: ["all", "ats"], logo: { src: "/integrations/directory/cornerstone-talent-link.svg", width: 288.5, height: 45 } },
  { name: "Eploy", categories: ["all", "ats"], logo: { src: "/integrations/directory/eploy.svg", width: 151.2, height: 45 } },
  { name: "Greenhouse", categories: ["all", "ats"], logo: { src: "/integrations/directory/greenhouse.svg", width: 230.0, height: 45 } },
  { name: "Teamtailor", categories: ["all", "ats"], logo: { src: "/integrations/directory/teamtailor.svg", width: 419.2, height: 45 } },
  { name: "Keka", categories: ["all", "hris"], logo: { src: "/integrations/directory/keka.svg", width: 111.2, height: 45 } },
  { name: "Lano", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/lano.svg", width: 131.2, height: 45 } },
  { name: "Lucca", categories: ["all", "hris"], logo: { src: "/integrations/directory/lucca.svg", width: 137.2, height: 45 } },
  { name: "Paylocity", categories: ["all", "hris"], logo: { src: "/integrations/directory/paylocity.svg", width: 204.3, height: 45 } },
  { name: "PayFit", categories: ["all", "hris"], logo: { src: "/integrations/directory/payfit.svg", width: 146.2, height: 45 } },
  { name: "Paycor", categories: ["all", "hris"], logo: { src: "/integrations/directory/paycor.svg", width: 121.8, height: 45 } },
  { name: "Paychex", categories: ["all", "hris"], logo: { src: "/integrations/directory/paychex.svg", width: 45.0, height: 45 } },
  { name: "Oracle Cloud HCM", categories: ["all", "hris"], logo: { src: "/integrations/directory/oracle-hcm.svg", width: 343.9, height: 45 } },
  { name: "People HR", categories: ["all", "hris"], logo: { src: "/integrations/directory/peoplehr.svg", width: 377.1, height: 45 } },
  { name: "Personio", categories: ["all", "hris"], logo: { src: "/integrations/directory/personio.svg", width: 45.0, height: 45 } },
  { name: "Polymer", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/polymer.svg", width: 217.0, height: 45 } },
  { name: "Proliant", categories: ["all", "hris"], logo: { src: "/integrations/directory/proliant.svg", width: 231.8, height: 45 } },
  { name: "Sesame", categories: ["all", "hris"], logo: { src: "/integrations/directory/sesame.svg", width: 214.0, height: 45 } },
  { name: "SAP SuccessFactors", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/sap-successfactors.svg", width: 90.7, height: 45 } },
  { name: "Salesforce", categories: ["all", "crm"], logo: { src: "/integrations/directory/salesforce.svg", width: 64.3, height: 45 } },
  { name: "Sage HR", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/sage-hr.svg", width: 45.0, height: 45 } },
  { name: "TriNet", categories: ["all", "hris"], logo: { src: "/integrations/directory/trinet.svg", width: 35.3, height: 45 } },
  { name: "UKG Ready", categories: ["all", "hris"], logo: { src: "/integrations/directory/ukg-ready.svg", width: 112.2, height: 45 } },
  { name: "UKG Pro Workforce Management", categories: ["all", "hris"], logo: { src: "/integrations/directory/ukg-pro-wfm.svg", width: 112.2, height: 45 } },
  { name: "UKG Pro", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/ukg-pro.svg", width: 112.2, height: 45 } },
  { name: "Workday", categories: ["all", "hris", "ats"], logo: { src: "/integrations/directory/workday.svg", width: 95.2, height: 45 } },
  { name: "Zelt", categories: ["all", "hris"], logo: { src: "/integrations/directory/zelt.svg", width: 101.2, height: 45 } },
  { name: "Zoho People", categories: ["all", "hris"], logo: { src: "/integrations/directory/zoho-people.svg", width: 102.4, height: 45 } },
  { name: "OneLogin", categories: ["all", "hris"], logo: { src: "/integrations/directory/onelogin.svg", width: 182.6, height: 45 } },
  { name: "Deel", categories: ["all", "hris"], logo: { src: "/integrations/directory/deel.svg", width: 130.0, height: 45 } },
  { name: "Google Workspace", categories: ["all", "hris"], logo: { src: "/integrations/directory/google-workspace.svg", width: 44.1, height: 45 } },
  { name: "isolved", categories: ["all", "hris"], logo: { src: "/integrations/directory/isolved.svg", width: 230.1, height: 45 } },
  { name: "Justworks", categories: ["all", "hris"], logo: { src: "/integrations/directory/justworks.svg", width: 242.2, height: 45 } },
  { name: "Kallidus", categories: ["all", "hris"], logo: { src: "/integrations/directory/kallidus.svg", width: 151.8, height: 45 } },
  { name: "JumpCloud", categories: ["all", "hris"], logo: { src: "/integrations/directory/jumpcloud.svg", width: 281.2, height: 45 } },
  { name: "Microsoft Entra ID", categories: ["all", "hris"], logo: { src: "/integrations/directory/microsoft-entra-id.svg", width: 45.0, height: 45 } },
  { name: "Nmbrs", categories: ["all", "hris"], logo: { src: "/integrations/directory/nmbrs.svg", width: 66.3, height: 45 } },
  { name: "Namely", categories: ["all", "hris"], logo: { src: "/integrations/directory/namely.svg", width: 164.9, height: 45 } },
  { name: "Officient", categories: ["all", "hris"] },
  { name: "Okta", categories: ["all", "hris"], logo: { src: "/integrations/directory/okta.svg", width: 136.3, height: 45 } },
  { name: "Square Payroll", categories: ["all", "hris"], logo: { src: "/integrations/directory/square-payroll.svg", width: 45.0, height: 45 } },
];

/* Curated teaser for /integrations: up to 9 per category (CRM only has 2),
   well-known names first. Each item keeps only the category tabs it was
   picked for, so no tab exceeds 9. */
const FEATURED: Record<"hris" | "ats" | "crm", string[]> = {
  hris: ["Workday", "BambooHR", "ADP Workforce Now", "UKG Pro", "Gusto", "Paychex", "Personio", "Deel", "Hibob"],
  ats: ["Greenhouse", "Ashby", "Workable", "SmartRecruiters", "Jobvite", "Teamtailor", "JazzHR", "Fountain", "Comeet"],
  crm: ["HubSpot", "Salesforce"],
};

export const FEATURED_INTEGRATIONS: Integration[] = (() => {
  const picked = new Map<string, Integration>();
  for (const [category, names] of Object.entries(FEATURED)) {
    for (const name of names) {
      const item = INTEGRATIONS.find((i) => i.name === name && i.categories.includes(category));
      if (!item) throw new Error(`Featured integration "${name}" is not in ${category}`);
      const entry = picked.get(name) ?? { ...item, categories: ["all"] };
      entry.categories.push(category);
      picked.set(name, entry);
    }
  }
  return [...picked.values()];
})();
