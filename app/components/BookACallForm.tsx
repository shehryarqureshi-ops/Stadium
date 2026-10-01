"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useId,
  FC,
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Check,
  ChevronDown,
  CircleAlert,
  Info,
  LoaderCircle,
  PenLine,
  Search,
  X,
} from "lucide-react";

/* ==========================================================================
   1. ENVIRONMENT CONFIGURATION & MODE SWITCHER
   ========================================================================== */
// ⚡️ SWITCH MODES HERE: 'mock' | 'staging' | 'production'
// Or set NEXT_PUBLIC_APP_MODE in your .env.local
const CURRENT_MODE: "mock" | "staging" | "production" =
  (process.env.NEXT_PUBLIC_APP_MODE as "mock" | "staging" | "production" | undefined) || "staging";

const ENVIRONMENT_PROFILES = {
  // 🟢 MOCK MODE: Simulates 100% of network calls with realistic delays & console logs
  mock: {
    ENVIRONMENT: "mock",
    SM_API_HOST: "https://mock-api.local",
    ORDER_SERVICE_API_URL: "https://mock-api.local/api/v1/ams",
    HUBSPOT_PORTAL_ID: "8084862",
    HUBSPOT_BOOK_A_CALL_FORM_GUID: "mock-full-form-guid",
    HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID: "mock-partial-form-guid",
    // Google official dummy key (always passes without challenge)
    GOOGLE_RECAPTCHA_SITEKEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    CHILI_PIPER_DOMAIN: "snackmagic",
    CHILI_PIPER_ROUTER: "test-inbound-router",
    CHILI_PIPER_JS_URL: "",
    THANK_YOU_PAGE_URL: "/thank-you",
    IS_SIMULATED: true,
  },
  // 🟡 STADIUM / SNACKMAGIC STAGING (Extracted from repo load-secrets.js)
  staging: {
    ENVIRONMENT: "staging",
    SM_API_HOST:
      process.env.NEXT_PUBLIC_SM_API_HOST || "https://test-api.snackmagic.com",
    ORDER_SERVICE_API_URL: `${process.env.NEXT_PUBLIC_SM_API_HOST || "https://test-api.snackmagic.com"
      }/api/v1/ams`,
    HUBSPOT_PORTAL_ID:
      process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "8084862",
    HUBSPOT_BOOK_A_CALL_FORM_GUID:
      process.env.NEXT_PUBLIC_HUBSPOT_BOOK_A_CALL_FORM_GUID ||
      "054c9cfb-306d-4dbb-8622-2637faf7f627", // Actual staging Form GUID
    HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID:
      process.env.NEXT_PUBLIC_HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID ||
      "ab741a49-853d-4390-adb4-14e28348d39e", // Actual staging Partial Form GUID
    GOOGLE_RECAPTCHA_SITEKEY:
      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITEKEY ||
      "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    CHILI_PIPER_DOMAIN: "snackmagic",
    CHILI_PIPER_ROUTER: "test-inbound-router", // Actual staging router
    CHILI_PIPER_JS_URL:
      "https://snackmagic.chilipiper.com/concierge-js/cjs/concierge.js",
    THANK_YOU_PAGE_URL:
      process.env.NEXT_PUBLIC_THANK_YOU_PAGE_URL || "/thank-you", // local app/thank-you page
    IS_SIMULATED: false,
  },
  // 🔴 LIVE STADIUM PRODUCTION
  production: {
    ENVIRONMENT: "production",
    SM_API_HOST:
      process.env.NEXT_PUBLIC_SM_API_HOST || "https://api.snackmagic.com",
    ORDER_SERVICE_API_URL: `${process.env.NEXT_PUBLIC_SM_API_HOST || "https://api.snackmagic.com"
      }/api/v1/ams`,
    HUBSPOT_PORTAL_ID:
      process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "8084862",
    HUBSPOT_BOOK_A_CALL_FORM_GUID:
      process.env.NEXT_PUBLIC_HUBSPOT_BOOK_A_CALL_FORM_GUID ||
      "8838e29c-c51f-4464-9e0d-58f51af9edf5", // Actual prod Form GUID
    HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID:
      process.env.NEXT_PUBLIC_HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID ||
      "459a97f6-c0ff-415b-bfe0-352fcddf4dcd", // Actual prod Partial Form GUID
    GOOGLE_RECAPTCHA_SITEKEY:
      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITEKEY ||
      "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    CHILI_PIPER_DOMAIN: "snackmagic",
    CHILI_PIPER_ROUTER: "stadium_router", // Actual prod router
    CHILI_PIPER_JS_URL:
      "https://snackmagic.chilipiper.com/concierge-js/cjs/concierge.js",
    THANK_YOU_PAGE_URL:
      process.env.NEXT_PUBLIC_THANK_YOU_PAGE_URL || "/thank-you", // local app/thank-you page
    IS_SIMULATED: false,
  },
};
export const ENV_CONFIG = {
  ACTIVE_MODE: CURRENT_MODE,
  ...ENVIRONMENT_PROFILES[CURRENT_MODE],
  APP_NAME: "stadium",
  DEFAULT_COUNTRY_ISO: "US",
  SM_PROGRAM_ID: 2,
  HOSTED_EXPERIENCES_ENABLED: true,
};

/* ==========================================================================
   2. CONSTANTS & STATIC DATA
   ========================================================================== */
export const GDPR_COUNTRIES_ISO = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "GB"
];

export const TEAM_ROLE_OPTIONS = [
  { title: "HR" },
  { title: "Events" },
  { title: "Marketing/Brand" },
  { title: "Sales" },
  { title: "Customer Service" },
  { title: "Operations" },
  { title: "C-Suite" },
  { title: "Executive Assistant" },
];

export const COMPANY_SIZE_OPTIONS = [
  { title: "Small (Fewer than 100 employees)" },
  { title: "Medium (101 - 500 employees)" },
  { title: "Large (501 - 2,000 employees)" },
  { title: "Enterprise (2,000+ employees)" },
];

export const STADIUM_USAGE_OPTIONS = [
  { title: "Just the one time" },
  { title: "Ongoing for my entire company" },
  { title: "Ongoing for select team(s)" },
];

export const DEMO_OFFERINGS = [
  {
    key: "recognition",
    title: "Recognition",
    options: [
      { key: "1", title: "Kudos Program", subTitle: "(employee-to-employee)" },
      { key: "2", title: "Milestone Recognitions", subTitle: "(years of service, new hire)" },
      { key: "3", title: "Incentives", subTitle: "(Sales, workplace safety, wellness programs)" },
    ],
  },
  {
    key: "swag",
    title: "Swag",
    options: [
      { key: "1", title: "Shops" },
      { key: "2", title: "Bulk" },
      { key: "3", title: "On-Demand" },
      { key: "4", title: "Storage" },
      { key: "5", title: "Kits" },
      { key: "6", title: "In-Person Events" },
    ],
  },
  {
    key: "gifting",
    title: "Gifting",
    options: [
      { key: "1", title: "Snack Boxes" },
      { key: "2", title: "Employee Gifting", subTitle: "(Holiday, birthday)" },
      { key: "3", title: "Prospect/Client Gifting" },
    ],
  },
  {
    key: "hosted-experiences",
    title: "Hosted Experiences",
    options: [],
  },
  {
    key: "other",
    title: "Other",
    options: [],
  },
];

export const AUTOMATION_EMAILS = [
  "automation@snackmagic.com",
  "dheerajgarg121@gmail.com",
  "automation+1@snackmagic.com",
];

export const COUNTRIES = [
  { iso: "US", name: "United States", dialCode: "+1" },
  { iso: "CA", name: "Canada", dialCode: "+1" },
  { iso: "GB", name: "United Kingdom", dialCode: "+44" },
  { iso: "AU", name: "Australia", dialCode: "+61" },
  { iso: "IN", name: "India", dialCode: "+91" },
  { iso: "DE", name: "Germany", dialCode: "+49" },
  { iso: "FR", name: "France", dialCode: "+33" },
  { iso: "NL", name: "Netherlands", dialCode: "+31" },
  { iso: "IE", name: "Ireland", dialCode: "+353" },
  { iso: "SG", name: "Singapore", dialCode: "+65" },
  { iso: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { iso: "NZ", name: "New Zealand", dialCode: "+64" },
  { iso: "ES", name: "Spain", dialCode: "+34" },
  { iso: "IT", name: "Italy", dialCode: "+39" },
  { iso: "SE", name: "Sweden", dialCode: "+46" },
  { iso: "CH", name: "Switzerland", dialCode: "+41" },
  { iso: "BR", name: "Brazil", dialCode: "+55" },
  { iso: "MX", name: "Mexico", dialCode: "+52" },
  { iso: "JP", name: "Japan", dialCode: "+81" },
  { iso: "ZA", name: "South Africa", dialCode: "+27" },
  { iso: "PH", name: "Philippines", dialCode: "+63" },
];

export const EMAIL_WARNING = {
  heading: "That looks like a personal email",
  description:
    "That’s ok! However, we highly recommend using your company email for a more customized experience.",
};

export const BOOK_A_CALL_HUBSPOT_FORM_MAPPING: Record<string, string> = {
  first_name: "firstname",
  last_name: "lastname",
  email: "email",
  role: "jobtitle",
  country: "country",
  additionalinfo: "additionalinfo",
  company_size: "company_size",
  phone: "phone",
  offerings: "offerings",
  treat_type: "treat_type",
  stadium_usage: "stadium_usage",
};

/* ==========================================================================
   3. PURE TS UTILITY FUNCTIONS & HELPERS
   ========================================================================== */
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NON_WORK_EMAILS_REGEX =
  /^.*(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com|outlook\.com)[a-z0-9]*$/;

export const isNotWorkEmail = (value: string) =>
  NON_WORK_EMAILS_REGEX.test(value?.toString() || "");

export const isGmailAccount = (email: string) =>
  typeof email === "string" && email.toLowerCase().includes("@gmail");

export const isAutomationEmail = (email: string) =>
  AUTOMATION_EMAILS.includes(email);

export const getFirstAndLastName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  const firstName = parts[0] || ".";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : ".";
  return { firstName, lastName };
};

export const normalizePhone = (value: string, isInternational = false) => {
  if (!value) return value;
  const onlyNums = value.replace(/\D/g, "");
  const maxPhoneLength = isInternational ? 20 : 10;
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}  ${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}  ${onlyNums.slice(3, 6)}  ${onlyNums.slice(6, maxPhoneLength)}`;
};

export const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const transformObjectKeysToSnakeCase = (obj: Record<string, unknown>) => {
  const res: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    res[toSnakeCase(key)] = value;
  }
  return res;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export const getJsonCookie = (name: string) => {
  const raw = getCookie(name);
  if (!raw) return null;
  try {
    const val = raw.startsWith("j:") ? raw.slice(2) : raw;
    return JSON.parse(val);
  } catch {
    return null;
  }
};

/* Third-party globals this form talks to (GA4 gtag, ChiliPiper concierge) */
type ChiliPiperMethod = ((...args: unknown[]) => void) & { q?: unknown[][] };
type ChiliPiperApi = Record<string, ChiliPiperMethod>;
type StadiumWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  ChiliPiper?: ChiliPiperApi;
};
const win = () => window as StadiumWindow;

export const gtagEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && typeof win().gtag === "function") {
    win().gtag!("event", eventName, params);
  }
};

/* ==========================================================================
   4. CHILI PIPER SERVICE (With Simulation)
   ========================================================================== */
export const initChiliPiperScript = (callback?: () => void) => {
  if (typeof window === "undefined" || ENV_CONFIG.IS_SIMULATED) {
    callback?.();
    return;
  }
  if (win().ChiliPiper) {
    callback?.();
    return;
  }
  const script = document.createElement("script");
  script.src = ENV_CONFIG.CHILI_PIPER_JS_URL;
  script.async = true;
  script.onload = () => {
    function q(a: string) {
      return function (...args: unknown[]) {
        const api = win().ChiliPiper!;
        api[a].q = (api[a].q || []).concat([args]);
      };
    }
    win().ChiliPiper =
      win().ChiliPiper ||
      "submit scheduling showCalendar submit widget bookMeeting"
        .split(" ")
        .reduce<ChiliPiperApi>((a, b) => {
          a[b] = q(b);
          return a;
        }, {});
    callback?.();
  };
  document.body.appendChild(script);
};
export const submitChiliPiperModal = (
  lead: Record<string, unknown>,
  router: string,
  options: { onSuccess: () => void; onClose: () => void; onError?: (err: unknown) => void }
) => {
  // In mock mode, simulate successful appointment booking
  if (ENV_CONFIG.IS_SIMULATED) {
    console.log("⚡️ [MOCK MODE] ChiliPiper trigger bypassed. Lead payload:", lead);
    const confirmed = window.confirm(
      "[MOCK CHILI-PIPER MODAL]\n\nSimulating calendar booking appointment...\n\nClick OK to simulate 'Call Booked' & redirect to Thank You page."
    );
    if (confirmed) {
      options.onSuccess();
    } else {
      options.onClose();
    }
    return;
  }
  if (typeof window !== "undefined" && win().ChiliPiper) {
    win().ChiliPiper!.submit(ENV_CONFIG.CHILI_PIPER_DOMAIN, router, {
      titleStyle: "Thanks! What time works best for a quick call?",
      debug: ENV_CONFIG.ENVIRONMENT !== "production",
      map: true,
      trigger: "ThirdPartyForm",
      lead,
      ...options,
    });
  } else {
    options.onSuccess();
  }
};

/* ==========================================================================
   5. HUBSPOT & BACKEND APIS (With Simulation)
   ========================================================================== */
export const submitToHubSpotAPI = async (
  formGuid: string,
  fields: Array<{ name: string; value: unknown; objectTypeId?: string }>,
  pageName = "Book a Call"
) => {
  if (ENV_CONFIG.IS_SIMULATED) {
    console.log(`⚡️ [MOCK MODE] HubSpot Form Submitted (${formGuid}):`, {
      pageName,
      fields,
    });
    // Simulate brief network latency
    await new Promise((r) => setTimeout(r, 200));
    return { status: "success", mocked: true };
  }
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${ENV_CONFIG.HUBSPOT_PORTAL_ID}/${formGuid}`;
  const hutk = getCookie("hubspotutk");
  const geo = getJsonCookie("geo");
  const body = {
    submittedAt: Date.now(),
    fields: fields.map((f) => ({
      objectTypeId: f.objectTypeId || "0-1",
      name: f.name,
      value: f.value == null ? "" : String(f.value),
    })),
    context: {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName,
      ...(hutk ? { hutk } : {}),
      ...(geo?.ip_address ? { ipAddress: geo.ip_address } : {}),
    },
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error("HubSpot Submission Error:", err);
  }
};
export const bookACallBackendApi = async (payload: Record<string, unknown>) => {
  if (ENV_CONFIG.IS_SIMULATED) {
    console.log("⚡️ [MOCK MODE] Stadium Backend API POST /users/query:", payload);
    // Simulate brief server latency
    await new Promise((r) => setTimeout(r, 300));
    return { success: true, signupRequired: false, mocked: true };
  }
  try {
    const res = await fetch(`${ENV_CONFIG.ORDER_SERVICE_API_URL}/users/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Stadium Book A Call API Error:", err);
    return null;
  }
};

/* ==========================================================================
   6. PRESENTATION — Tailwind tokens from app/globals.css (Figma 3998:4924)
   Label 12.5 Bold uppercase · control 46h, r8, #e2e2de hairline, 13px text,
   #9999a3 placeholder · label→control gap 7 · textarea r10. Menus, checkboxes,
   error + focus states are not drawn in Figma and follow the same tokens.
   ========================================================================== */
const FIELD_WRAP = "flex min-w-0 flex-col gap-field-gap";
const LABEL = "font-sans text-field-label uppercase text-pricing-ink";
const FIELD =
  "w-full rounded-lg border bg-white px-3.5 font-sans text-field text-pricing-ink transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-field-placeholder focus:outline-none!";
const fieldState = (error: boolean, open = false) => {
  if (error)
    return `border-field-error bg-field-error-tint focus:border-field-error focus:shadow-field-error ${open ? "shadow-field-error" : ""
      }`;
  if (open) return "border-pricing-ink shadow-field-focus";
  return "border-field-border hover:border-field-border-hover focus:border-pricing-ink focus:shadow-field-focus";
};
const MENU =
  "field-menu-in absolute top-full z-30 mt-1.5 flex flex-col overflow-hidden rounded-xl border border-field-border bg-white shadow-dropdown";
const MENU_LIST = "max-h-80 overflow-y-auto overscroll-contain p-1.5";
const OPTION =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left font-sans text-field text-pricing-ink transition-colors duration-150 hover:bg-grey-100 focus-visible:bg-grey-100";
const OPTION_ACTIVE = "bg-pricing-cell font-semibold hover:bg-pricing-cell";
const APPLY =
  "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-grey-800 px-4 font-sans text-button-primary uppercase text-white transition-colors duration-200 hover:bg-black";

const Chevron: FC<{ open: boolean }> = ({ open }) => (
  <ChevronDown
    aria-hidden
    className={`ml-auto size-3.5 shrink-0 text-grey-500 transition-transform duration-200 ${open ? "rotate-180" : ""
      }`}
    strokeWidth={2}
  />
);

const OptionCheck: FC = () => <Check aria-hidden className="size-3.5 shrink-0" strokeWidth={2.5} />;

const FieldError: FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <p id={id} className="flex items-center gap-1 font-sans text-field-hint text-field-error">
    <CircleAlert aria-hidden className="size-3.5 shrink-0" strokeWidth={2} />
    {children}
  </p>
);

const SelectTrigger: FC<{
  id: string;
  open: boolean;
  error: boolean;
  errorId: string;
  placeholder: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ id, open, error, errorId, placeholder, onClick, children }) => (
  <button
    id={id}
    type="button"
    onClick={onClick}
    aria-haspopup="true"
    aria-expanded={open}
    aria-describedby={error ? errorId : undefined}
    className={`${FIELD} flex h-field-h cursor-pointer items-center gap-2 text-left ${fieldState(error, open)}`}
  >
    <span className={`min-w-0 flex-1 truncate ${placeholder ? "text-field-placeholder" : ""}`}>
      {children}
    </span>
    <Chevron open={open} />
  </button>
);

const OtherToggle: FC<{ active: boolean; selected: boolean; onClick: () => void }> = ({
  active,
  selected,
  onClick,
}) => (
  <div className="mt-1 border-t border-grey-200 pt-1">
    <button
      type="button"
      aria-expanded={active}
      onClick={onClick}
      className={`${OPTION} font-semibold ${selected ? OPTION_ACTIVE : ""}`}
    >
      <PenLine aria-hidden className="size-3.5 shrink-0 text-grey-500" strokeWidth={2} />
      <span className="flex-1">Other</span>
      <Chevron open={active} />
    </button>
  </div>
);

/* Native checkbox (keeps checked/onChange semantics) with a token-styled box */
const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <span className="relative mt-px inline-flex size-4 shrink-0">
    <input
      type="checkbox"
      {...props}
      className="peer size-4 cursor-pointer appearance-none rounded border border-field-border-hover bg-white transition-colors duration-150 checked:border-pricing-ink checked:bg-pricing-ink hover:border-grey-500 checked:hover:border-pricing-ink"
    />
    <Check
      aria-hidden
      className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
      strokeWidth={3}
    />
  </span>
);

/* ==========================================================================
   7. MAIN FORM COMPONENT
   ========================================================================== */
export interface BookACallFormProps {
  onSuccess?: () => void;
  onBookACallSubmit?: () => Promise<{ cartInfo?: string; shopNumber?: string }>;
}

export const BookACallForm: FC<BookACallFormProps> = ({
  onSuccess,
  onBookACallSubmit,
}) => {
  // Form Field State
  const [formValues, setFormValues] = useState({
    fullName: { value: "", validates: { presence: true } },
    email: { value: "", validates: { presence: true, email: true } },
    companyName: { value: "", validates: { presence: true } },
    role: { value: "", other: false, validates: { presence: true } },
    companySize: { value: "", validates: { presence: true } },
    stadiumUsage: { value: "", other: false, validates: { presence: true } },
    offerings: { value: [] as string[], otherValue: "", validates: { presence: true } },
    additionalinfo: { value: "", validates: { presence: false } },
    phone: { value: "", validates: { presence: true } },
    subscribeMarketingEmail: { value: false, validates: { presence: false } },
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Countries
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Dropdowns & Accordion UI toggles
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isRoleOtherActive, setIsRoleOtherActive] = useState(false);

  const [isCompanySizeDropdownOpen, setIsCompanySizeDropdownOpen] = useState(false);

  const [isOfferingsDropdownOpen, setIsOfferingsDropdownOpen] = useState(false);
  const [activeOfferingsAccordion, setActiveOfferingsAccordion] = useState<string[]>([]);

  const [isUsageDropdownOpen, setIsUsageDropdownOpen] = useState(false);
  const [isUsageOtherActive, setIsUsageOtherActive] = useState(false);

  // ReCAPTCHA ref
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Field element refs for auto-focus/scrolling on error. Each is its own
  // useRef (attached directly in JSX); fieldRefs maps them by field name for
  // the submit handler and the dropdown-dismiss effect.
  const fullNameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const companySizeRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);
  const stadiumUsageRef = useRef<HTMLDivElement>(null);
  const fieldRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    fullName: fullNameRef,
    email: emailRef,
    phone: phoneRef,
    companyName: companyNameRef,
    role: roleRef,
    companySize: companySizeRef,
    offerings: offeringsRef,
    stadiumUsage: stadiumUsageRef,
  };

  // Determine GDPR country
  const isGdprCountry = GDPR_COUNTRIES_ISO.includes(selectedCountry?.iso);

  // Load ChiliPiper & Detect Geo on Mount
  useEffect(() => {
    initChiliPiperScript();
    const geo = getJsonCookie("geo");
    if (geo?.country_code) {
      const match = COUNTRIES.find((c) => c.iso === geo.country_code);
      // The geo cookie only exists in the browser, so this has to run after
      // hydration (reading it during render would mismatch the server HTML).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (match) setSelectedCountry(match);
    }
  }, []);

  // Partial lead capture on blur
  const handleEmailAndPhoneBlur = () => {
    if (!formValues.email.value || !EMAIL_REGEX.test(formValues.email.value)) return;

    const payload: Array<{ name: string; value: unknown }> = [];
    const { firstName, lastName } = getFirstAndLastName(formValues.fullName.value);
    payload.push({ name: "firstName", value: firstName });
    payload.push({ name: "lastName", value: lastName });

    for (const [key, field] of Object.entries(formValues)) {
      if (!field.value || key === "fullName") continue;
      if (Array.isArray(field.value)) {
        payload.push({ name: key, value: field.value.join(", ") });
      } else {
        payload.push({ name: key, value: field.value });
      }
    }
    if (selectedCountry?.name) {
      payload.push({ name: "country", value: selectedCountry.name });
    }

    submitToHubSpotAPI(
      ENV_CONFIG.HUBSPOT_BOOK_A_CALL_PARTIAL_FORM_GUID,
      payload,
      typeof document !== "undefined" ? document.title : "Book a Call"
    );
  };

  // Generic Field Change Handler
  const handleFieldChange = (name: string, value: unknown, extra: Record<string, unknown> = {}) => {
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });

    setFormValues((prev) => ({
      ...prev,
      [name]: {
        ...(prev as Record<string, object>)[name],
        value,
        ...extra,
      },
    }));
  };

  // Offering formatting for backend & analytics
  const getFormattedOfferingsMap = () => {
    const selectedSet = new Set(formValues.offerings.value);
    const result: Record<string, string> = {};

    DEMO_OFFERINGS.forEach(({ title, options }) => {
      if (options.length === 0) {
        if (title !== "Other" && selectedSet.has(title)) {
          result[title] = `${title}: ${title}`;
        }
        return;
      }
      const matched = options.filter((o) => selectedSet.has(o.title)).map((o) => o.title);
      if (matched.length) {
        result[title] = `${title}: ${matched.join(", ")}`;
      }
    });

    if (formValues.offerings.otherValue.trim()) {
      result["Other"] = `Other: ${formValues.offerings.otherValue.trim()}`;
    }

    return result;
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formValues.fullName.value.trim()) errors.fullName = "Required";
    if (!formValues.companyName.value.trim()) errors.companyName = "Required";

    if (!formValues.email.value.trim()) {
      errors.email = "Required";
    } else if (!EMAIL_REGEX.test(formValues.email.value)) {
      errors.email = "Invalid Email";
    }

    if (!formValues.phone.value.trim()) errors.phone = "Required";
    if (!formValues.role.value.trim()) errors.role = "Required";
    if (!formValues.companySize.value.trim()) errors.companySize = "Required";
    if (!formValues.stadiumUsage.value.trim()) errors.stadiumUsage = "Required";

    const hasOfferings =
      formValues.offerings.value.length > 0 ||
      formValues.offerings.otherValue.trim().length > 0;
    if (!hasOfferings) errors.offerings = "Required";

    return errors;
  };

  // Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      // Auto-scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      fieldRefs[firstErrorField]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    try {
      // 1. Google reCAPTCHA Verification (Invisible)
      const isTestEmail = isAutomationEmail(formValues.email.value);
      if (!isTestEmail && recaptchaRef.current) {
        try {
          await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();
        } catch (captchaErr) {
          console.warn("reCAPTCHA validation skipped or failed:", captchaErr);
        }
      }

      // 2. Fetch Optional Cart Info from props
      let cartInfo = "";
      let shopNumber = "";
      if (onBookACallSubmit) {
        const addInfo = await onBookACallSubmit();
        cartInfo = addInfo?.cartInfo || "";
        shopNumber = addInfo?.shopNumber || "";
      }

      // 3. Assemble Form Data
      const { firstName, lastName } = getFirstAndLastName(formValues.fullName.value);
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
      const interestedPackage = searchParams.get("interestedPackage") || "";
      const sourceOrigin = searchParams.get("sourceOrigin") || "";
      const sourceUrl = typeof window !== "undefined" ? window.location.href.split("//")[1] || "" : "";

      const formattedOfferingsMap = getFormattedOfferingsMap();
      const combinedOfferingsString = [
        ...formValues.offerings.value,
        formValues.offerings.otherValue,
      ]
        .filter(Boolean)
        .join(", ");

      const parsedPayload = {
        firstName,
        lastName,
        email: formValues.email.value,
        company: formValues.companyName.value,
        origin: "book_a_call",
        program_id: Number(ENV_CONFIG.SM_PROGRAM_ID),
        preferences: {
          role: formValues.role.value,
          company_size: formValues.companySize.value,
          stadium_usage: formValues.stadiumUsage.value,
          offerings: combinedOfferingsString,
          country: selectedCountry.name,
          phone: `${selectedCountry.dialCode} ${formValues.phone.value}`,
          treat_type: "Stadium",
          source_origin: sourceOrigin || "Stadium",
          source_url: sourceUrl,
          additionalinfo: formValues.additionalinfo.value,
          ...(isGdprCountry ? { subscribe_marketing_email: formValues.subscribeMarketingEmail.value } : {}),
          ...(interestedPackage ? { interested_package: `Interested Package: ${interestedPackage}` } : {}),
          ...(cartInfo ? { cart_info: cartInfo } : {}),
          ...(shopNumber ? { shop_number: shopNumber } : {}),
        },
      };

      // 4. Submit to Stadium Order Service API
      await bookACallBackendApi(parsedPayload);

      // 5. GA4 Analytics Event
      const analyticsPayload = {
        first_name: firstName,
        last_name: lastName,
        email: formValues.email.value,
        company: formValues.companyName.value,
        ...parsedPayload.preferences,
        ...formattedOfferingsMap,
      };
      gtagEvent("book-a-call-form-submitted", analyticsPayload);

      // 6. Submit Full Lead to HubSpot Form API v3
      const hubspotMappedFields = Object.entries(BOOK_A_CALL_HUBSPOT_FORM_MAPPING)
        .filter(([key]) => analyticsPayload[key as keyof typeof analyticsPayload] !== undefined)
        .map(([key, hubspotKey]) => ({
          name: hubspotKey,
          value: analyticsPayload[key as keyof typeof analyticsPayload],
        }));

      submitToHubSpotAPI(
        ENV_CONFIG.HUBSPOT_BOOK_A_CALL_FORM_GUID,
        hubspotMappedFields,
        typeof document !== "undefined" ? document.title : "Book a Call"
      );

      // 7. ChiliPiper Scheduling Modal
      const onScheduleSuccess = () => {
        gtagEvent("call-booked");
        const redirectToNext = () => {
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.href = ENV_CONFIG.THANK_YOU_PAGE_URL;
          }
        };

        if (isGmailAccount(formValues.email.value)) {
          // 10s wait for gmail unknown sender security policy
          setTimeout(redirectToNext, 10000);
        } else {
          redirectToNext();
        }
      };

      submitChiliPiperModal(
        analyticsPayload,
        ENV_CONFIG.CHILI_PIPER_ROUTER,
        {
          onSuccess: onScheduleSuccess,
          onClose: () => {
            // Can redirect or leave user on page
          },
        }
      );
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered Countries list for dropdown search
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.iso.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  // Selected Offerings summary label
  const offeringsLabel = useMemo(() => {
    const all = [
      ...formValues.offerings.value,
      formValues.offerings.otherValue.trim(),
    ].filter(Boolean);
    if (!all.length) return "I’d like to learn more about...";
    if (all.length === 1) return all[0];
    return `${all[0]} + ${all.length - 1} more`;
  }, [formValues.offerings]);

  // Close any open dropdown on outside press or Escape (UI only — no form state)
  const countryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anyOpen =
      isCountryDropdownOpen ||
      isRoleDropdownOpen ||
      isCompanySizeDropdownOpen ||
      isOfferingsDropdownOpen ||
      isUsageDropdownOpen;
    if (!anyOpen) return;
    const menus: Array<[React.RefObject<HTMLDivElement | null>, (open: boolean) => void]> = [
      [countryRef, setIsCountryDropdownOpen],
      [fieldRefs.role, setIsRoleDropdownOpen],
      [fieldRefs.companySize, setIsCompanySizeDropdownOpen],
      [fieldRefs.offerings, setIsOfferingsDropdownOpen],
      [fieldRefs.stadiumUsage, setIsUsageDropdownOpen],
    ];
    const onPointerDown = (e: PointerEvent) => {
      menus.forEach(([ref, setOpen]) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      });
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") menus.forEach(([, setOpen]) => setOpen(false));
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fieldRefs holds stable useRef objects
  }, [
    isCountryDropdownOpen,
    isRoleDropdownOpen,
    isCompanySizeDropdownOpen,
    isOfferingsDropdownOpen,
    isUsageDropdownOpen,
  ]);

  const uid = useId();
  const ids = {
    fullName: `${uid}-full-name`,
    email: `${uid}-email`,
    country: `${uid}-country`,
    phone: `${uid}-phone`,
    companyName: `${uid}-company`,
    role: `${uid}-role`,
    companySize: `${uid}-company-size`,
    offerings: `${uid}-offerings`,
    stadiumUsage: `${uid}-usage`,
    additionalinfo: `${uid}-help`,
  };
  const errId = (name: keyof typeof ids) => `${ids[name]}-error`;

  return (
    <div className="book-a-call-container w-full max-w-[40.375rem] rounded-3xl bg-white p-6 text-left shadow-form md:p-10">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* ================= FULL NAME ================= */}
          <div ref={fullNameRef} className={FIELD_WRAP}>
            <label htmlFor={ids.fullName} className={LABEL}>
              Full Name
            </label>
            <input
              id={ids.fullName}
              type="text"
              autoComplete="name"
              placeholder="Jennifer Olsen"
              value={formValues.fullName.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("fullName", e.target.value)
              }
              aria-required
              aria-invalid={!!formErrors.fullName}
              aria-describedby={formErrors.fullName ? errId("fullName") : undefined}
              className={`${FIELD} h-field-h ${fieldState(!!formErrors.fullName)}`}
            />
            {formErrors.fullName && <FieldError id={errId("fullName")}>{formErrors.fullName}</FieldError>}
          </div>

          {/* ================= WORK EMAIL ================= */}
          <div ref={emailRef} className={FIELD_WRAP}>
            <label htmlFor={ids.email} className={LABEL}>
              Work Email
            </label>
            <input
              id={ids.email}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={formValues.email.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsEmailTouched(true);
                handleFieldChange("email", e.target.value);
                // Email personal address warning trigger
                setShowEmailWarning(isNotWorkEmail(e.target.value));
              }}
              onBlur={() => {
                setIsEmailTouched(false);
                handleEmailAndPhoneBlur();
              }}
              aria-required
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? errId("email") : undefined}
              className={`${FIELD} h-field-h ${fieldState(!!formErrors.email)}`}
            />
            {formErrors.email && <FieldError id={errId("email")}>{formErrors.email}</FieldError>}

            {/* Personal Email Warning */}
            {showEmailWarning && isEmailTouched && (
              <div
                role="status"
                className="field-menu-in relative flex gap-2.5 rounded-lg border border-field-warning-border bg-field-warning-bg py-3 pl-3 pr-9"
              >
                <Info aria-hidden className="mt-px size-4 shrink-0 text-field-warning-icon" strokeWidth={2} />
                <div className="flex flex-col gap-0.5">
                  <strong className="font-sans text-field font-semibold text-pricing-ink">
                    {EMAIL_WARNING.heading}
                  </strong>
                  <p className="font-sans text-field-hint text-grey-600">{EMAIL_WARNING.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailWarning(false)}
                  aria-label="Dismiss notice"
                  className="absolute right-2 top-2 inline-flex size-6 items-center justify-center rounded-full text-grey-500 transition-colors hover:bg-black/5 hover:text-pricing-ink"
                >
                  <X aria-hidden className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            )}
          </div>

          {/* ================= COUNTRY & PHONE ================= */}
          <div ref={phoneRef} className={FIELD_WRAP}>
            <label htmlFor={ids.phone} className={LABEL}>
              Phone Number
            </label>
            <div className="flex gap-field-gap">
              {/* Country Selector Dropdown */}
              <div ref={countryRef} className="relative shrink-0">
                <button
                  id={ids.country}
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isCountryDropdownOpen}
                  aria-label={`Country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
                  className={`${FIELD} flex h-field-h cursor-pointer items-center gap-1.5 ${fieldState(false, isCountryDropdownOpen)}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote CDN flag, hidden on error */}
                  <img
                    src={`https://cdn.bystadium.com/flags/small/${selectedCountry.iso}.PNG`}
                    alt=""
                    width={18}
                    height={14}
                    className="h-3.5 w-[1.125rem] rounded-[0.125rem] object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="text-pricing-ink">{selectedCountry.iso}</span>
                  <Chevron open={isCountryDropdownOpen} />
                </button>

                {isCountryDropdownOpen && (
                  <div className={`${MENU} left-0 w-[16.25rem] md:w-[17.5rem]`}>
                    <div className="border-b border-grey-200 p-1.5">
                      <div className="relative">
                        <Search
                          aria-hidden
                          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-field-placeholder"
                          strokeWidth={2}
                        />
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search country..."
                          aria-label="Search country"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="h-9 w-full rounded-md border border-transparent bg-grey-100 pl-8 pr-3 font-sans text-field text-pricing-ink transition-colors duration-150 placeholder:text-field-placeholder focus:border-pricing-ink focus:bg-white focus:outline-none!"
                        />
                      </div>
                    </div>
                    <div role="listbox" aria-label="Country" className={MENU_LIST}>
                      {filteredCountries.map((c) => {
                        const isSelected = selectedCountry.iso === c.iso;
                        return (
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            key={c.iso}
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                            }}
                            className={`${OPTION} ${isSelected ? OPTION_ACTIVE : ""}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element -- remote CDN flag, hidden on error */}
                            <img
                              src={`https://cdn.bystadium.com/flags/small/${c.iso}.PNG`}
                              alt=""
                              width={18}
                              height={14}
                              className="h-3.5 w-[1.125rem] shrink-0 rounded-[0.125rem] object-cover"
                              onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                            />
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="tabular-nums text-grey-500">{c.dialCode}</span>
                          </button>
                        );
                      })}
                      {filteredCountries.length === 0 && (
                        <p className="px-3 py-2.5 font-sans text-field text-grey-500">No matches</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dial code prefix + Phone Number Input */}
              <div
                className={`${FIELD} flex h-field-h min-w-0 flex-1 items-center gap-1.5 focus-within:border-pricing-ink focus-within:shadow-field-focus ${formErrors.phone
                  ? "border-field-error bg-field-error-tint focus-within:border-field-error focus-within:shadow-field-error"
                  : "border-field-border hover:border-field-border-hover"
                  }`}
              >
                <span className="shrink-0 tabular-nums text-grey-500">{selectedCountry.dialCode}</span>
                <input
                  id={ids.phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="XXX XXX XXXX"
                  value={formValues.phone.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("phone", normalizePhone(e.target.value))
                  }
                  onBlur={handleEmailAndPhoneBlur}
                  aria-required
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? errId("phone") : undefined}
                  className="h-full min-w-0 flex-1 bg-transparent text-pricing-ink placeholder:text-field-placeholder focus:outline-none!"
                />
              </div>
            </div>
            {formErrors.phone && <FieldError id={errId("phone")}>{formErrors.phone}</FieldError>}
          </div>

          {/* ================= COMPANY NAME ================= */}
          <div ref={companyNameRef} className={FIELD_WRAP}>
            <label htmlFor={ids.companyName} className={LABEL}>
              Company
            </label>
            <input
              id={ids.companyName}
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              value={formValues.companyName.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("companyName", e.target.value)
              }
              aria-required
              aria-invalid={!!formErrors.companyName}
              aria-describedby={formErrors.companyName ? errId("companyName") : undefined}
              className={`${FIELD} h-field-h ${fieldState(!!formErrors.companyName)}`}
            />
            {formErrors.companyName && (
              <FieldError id={errId("companyName")}>{formErrors.companyName}</FieldError>
            )}
          </div>

          {/* ================= TEAM / ROLE ================= */}
          <div ref={roleRef} className={`${FIELD_WRAP} relative`}>
            <label htmlFor={ids.role} className={LABEL}>
              Team
            </label>
            <SelectTrigger
              id={ids.role}
              open={isRoleDropdownOpen}
              error={!!formErrors.role}
              errorId={errId("role")}
              placeholder={!formValues.role.value}
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            >
              {formValues.role.value || "Select role"}
            </SelectTrigger>
            {formErrors.role && <FieldError id={errId("role")}>{formErrors.role}</FieldError>}

            {isRoleDropdownOpen && (
              <div className={`${MENU} inset-x-0`}>
                <div role="listbox" aria-label="Team" className={MENU_LIST}>
                  {TEAM_ROLE_OPTIONS.map((opt) => {
                    const isSelected = formValues.role.value === opt.title;
                    return (
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        key={opt.title}
                        onClick={() => {
                          handleFieldChange("role", opt.title, { other: false });
                          setIsRoleOtherActive(false);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`${OPTION} ${isSelected ? OPTION_ACTIVE : ""}`}
                      >
                        <span className="flex-1">{opt.title}</span>
                        {isSelected && <OptionCheck />}
                      </button>
                    );
                  })}
                  <OtherToggle
                    active={isRoleOtherActive}
                    selected={formValues.role.other}
                    onClick={() => setIsRoleOtherActive(!isRoleOtherActive)}
                  />
                  {isRoleOtherActive && (
                    <div className="flex gap-2 px-1.5 pb-1.5 pt-1">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Please specify"
                        aria-label="Other team"
                        value={formValues.role.other ? formValues.role.value : ""}
                        onChange={(e) =>
                          handleFieldChange("role", e.target.value, { other: true })
                        }
                        className={`${FIELD} h-9 flex-1 px-3 ${fieldState(false)}`}
                      />
                      <button
                        type="button"
                        onClick={() => setIsRoleDropdownOpen(false)}
                        className={APPLY}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================= COMPANY SIZE ================= */}
          <div ref={companySizeRef} className={`${FIELD_WRAP} relative`}>
            <label htmlFor={ids.companySize} className={LABEL}>
              Company Size
            </label>
            <SelectTrigger
              id={ids.companySize}
              open={isCompanySizeDropdownOpen}
              error={!!formErrors.companySize}
              errorId={errId("companySize")}
              placeholder={!formValues.companySize.value}
              onClick={() => setIsCompanySizeDropdownOpen(!isCompanySizeDropdownOpen)}
            >
              {formValues.companySize.value || "Select"}
            </SelectTrigger>
            {formErrors.companySize && (
              <FieldError id={errId("companySize")}>{formErrors.companySize}</FieldError>
            )}

            {isCompanySizeDropdownOpen && (
              <div className={`${MENU} inset-x-0`}>
                <div role="listbox" aria-label="Company size" className={MENU_LIST}>
                  {COMPANY_SIZE_OPTIONS.map((opt) => {
                    const isSelected = formValues.companySize.value === opt.title;
                    return (
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        key={opt.title}
                        onClick={() => {
                          handleFieldChange("companySize", opt.title);
                          setIsCompanySizeDropdownOpen(false);
                        }}
                        className={`${OPTION} ${isSelected ? OPTION_ACTIVE : ""}`}
                      >
                        <span className="flex-1">{opt.title}</span>
                        {isSelected && <OptionCheck />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ================= CUSTOMIZE YOUR DEMO (OFFERINGS) ================= */}
          <div ref={offeringsRef} className={`${FIELD_WRAP} relative`}>
            <label htmlFor={ids.offerings} className={LABEL}>
              Customize Your Demo
            </label>
            <SelectTrigger
              id={ids.offerings}
              open={isOfferingsDropdownOpen}
              error={!!formErrors.offerings}
              errorId={errId("offerings")}
              placeholder={
                formValues.offerings.value.length === 0 && !formValues.offerings.otherValue.trim()
              }
              onClick={() => setIsOfferingsDropdownOpen(!isOfferingsDropdownOpen)}
            >
              {offeringsLabel}
            </SelectTrigger>
            {formErrors.offerings && (
              <FieldError id={errId("offerings")}>{formErrors.offerings}</FieldError>
            )}

            {isOfferingsDropdownOpen && (
              <div className={`${MENU} left-0 w-full min-w-[17.5rem] md:w-[20rem]`}>
                <div className="max-h-[19rem] overflow-y-auto overscroll-contain p-1.5">
                  {DEMO_OFFERINGS.map(({ key, title, options }) => {
                    const isStandalone = options.length === 0;
                    const isOther = key === "other";
                    const isOpen = activeOfferingsAccordion.includes(key);

                    if (isStandalone) {
                      return (
                        <div key={key}>
                          <label className={`${OPTION} cursor-pointer font-semibold`}>
                            <Checkbox
                              checked={formValues.offerings.value.includes(title)}
                              onChange={() => {
                                const exists = formValues.offerings.value.includes(title);
                                const updated = exists
                                  ? formValues.offerings.value.filter((v) => v !== title)
                                  : [...formValues.offerings.value, title];
                                handleFieldChange("offerings", updated, {
                                  otherValue: formValues.offerings.otherValue,
                                });
                              }}
                            />
                            <span className="flex-1">{title}</span>
                          </label>
                          {isOther && formValues.offerings.value.includes("Other") && (
                            <div className="px-1.5 pb-1.5 pl-9">
                              <input
                                type="text"
                                autoFocus
                                placeholder="Please specify"
                                aria-label="Other offering"
                                value={formValues.offerings.otherValue}
                                onChange={(e) =>
                                  handleFieldChange("offerings", formValues.offerings.value, {
                                    otherValue: e.target.value,
                                  })
                                }
                                className={`${FIELD} h-9 px-3 ${fieldState(false)}`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    }

                    const selectedCount = options.filter((o) =>
                      formValues.offerings.value.includes(o.title)
                    ).length;

                    return (
                      <div key={key}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setActiveOfferingsAccordion((prev) =>
                              prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
                            )
                          }
                          className={`${OPTION} font-semibold`}
                        >
                          <span className="flex-1">{title}</span>
                          {selectedCount > 0 && (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-pricing-ink px-1.5 font-sans text-pill tabular-nums text-white">
                              {selectedCount}
                            </span>
                          )}
                          <Chevron open={isOpen} />
                        </button>

                        {isOpen && (
                          <div className="field-menu-in mb-1 ml-4 border-l border-grey-200 pl-1.5">
                            {options.map((opt) => {
                              const isChecked = formValues.offerings.value.includes(opt.title);
                              return (
                                <label key={opt.key} className={`${OPTION} cursor-pointer items-start`}>
                                  <Checkbox
                                    checked={isChecked}
                                    onChange={() => {
                                      const updated = isChecked
                                        ? formValues.offerings.value.filter((v) => v !== opt.title)
                                        : [...formValues.offerings.value, opt.title];
                                      handleFieldChange("offerings", updated, {
                                        otherValue: formValues.offerings.otherValue,
                                      });
                                    }}
                                  />
                                  <span className="flex flex-1 flex-col">
                                    <span>{opt.title}</span>
                                    {opt.subTitle && (
                                      <small className="font-sans text-field-hint text-grey-500">
                                        {opt.subTitle}
                                      </small>
                                    )}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-grey-200 px-3 py-2">
                  <span className="font-sans text-field-hint text-grey-500">
                    {formValues.offerings.value.filter((v) => v !== "Other").length +
                      (formValues.offerings.otherValue.trim() ? 1 : 0)}{" "}
                    selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOfferingsDropdownOpen(false)}
                    className={APPLY}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ================= STADIUM USAGE FREQUENCY ================= */}
          <div ref={stadiumUsageRef} className={`${FIELD_WRAP} relative`}>
            <label htmlFor={ids.stadiumUsage} className={LABEL}>
              How often would you use Stadium?
            </label>
            <SelectTrigger
              id={ids.stadiumUsage}
              open={isUsageDropdownOpen}
              error={!!formErrors.stadiumUsage}
              errorId={errId("stadiumUsage")}
              placeholder={!formValues.stadiumUsage.value}
              onClick={() => setIsUsageDropdownOpen(!isUsageDropdownOpen)}
            >
              {formValues.stadiumUsage.value || "Select usage"}
            </SelectTrigger>
            {formErrors.stadiumUsage && (
              <FieldError id={errId("stadiumUsage")}>{formErrors.stadiumUsage}</FieldError>
            )}

            {isUsageDropdownOpen && (
              <div className={`${MENU} inset-x-0`}>
                <div role="listbox" aria-label="Usage" className={MENU_LIST}>
                  {STADIUM_USAGE_OPTIONS.map((opt) => {
                    const isSelected = formValues.stadiumUsage.value === opt.title;
                    return (
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        key={opt.title}
                        onClick={() => {
                          handleFieldChange("stadiumUsage", opt.title, { other: false });
                          setIsUsageOtherActive(false);
                          setIsUsageDropdownOpen(false);
                        }}
                        className={`${OPTION} ${isSelected ? OPTION_ACTIVE : ""}`}
                      >
                        <span className="flex-1">{opt.title}</span>
                        {isSelected && <OptionCheck />}
                      </button>
                    );
                  })}
                  <OtherToggle
                    active={isUsageOtherActive}
                    selected={formValues.stadiumUsage.other}
                    onClick={() => setIsUsageOtherActive(!isUsageOtherActive)}
                  />
                  {isUsageOtherActive && (
                    <div className="flex flex-col gap-2 px-1.5 pb-1.5 pt-1">
                      <textarea
                        rows={2}
                        autoFocus
                        placeholder="Please specify"
                        aria-label="Other usage"
                        value={formValues.stadiumUsage.other ? formValues.stadiumUsage.value : ""}
                        onChange={(e) =>
                          handleFieldChange("stadiumUsage", e.target.value, { other: true })
                        }
                        className={`${FIELD} resize-none px-3 py-2 ${fieldState(false)}`}
                      />
                      <button
                        type="button"
                        onClick={() => setIsUsageDropdownOpen(false)}
                        className={`${APPLY} self-end`}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================= HOW CAN WE HELP (ADDITIONAL INFO) ================= */}
          <div className={`${FIELD_WRAP} md:col-span-2`}>
            <label htmlFor={ids.additionalinfo} className={LABEL}>
              How can we help?
            </label>
            <textarea
              id={ids.additionalinfo}
              rows={3}
              placeholder="What would your ideal solution look like? Anything else we should know?"
              value={formValues.additionalinfo.value}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleFieldChange("additionalinfo", e.target.value)
              }
              className={`${FIELD} min-h-28 resize-y rounded-[0.625rem] p-3.5 ${fieldState(false)}`}
            />
          </div>
        </div>

        {/* ================= GDPR MARKETING CHECKBOX ================= */}
        {isGdprCountry && (
          <label className="flex cursor-pointer items-start gap-2.5 font-sans text-field text-grey-700">
            <Checkbox
              checked={formValues.subscribeMarketingEmail.value}
              onChange={(e) =>
                handleFieldChange("subscribeMarketingEmail", e.target.checked)
              }
            />
            <span>I’d like to stay in the loop about Stadium via email.</span>
          </label>
        )}

        <div>
          {/* ================= INVISIBLE RECAPTCHA CONTAINER ================= */}
          {!isAutomationEmail(formValues.email.value) && (
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={ENV_CONFIG.GOOGLE_RECAPTCHA_SITEKEY}
            />
          )}

          {/* ================= SUBMIT BUTTON ================= */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="inline-flex h-button-h w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-grey-800 px-button-x font-sans text-button-primary uppercase text-white inset-shadow-button-dark transition-all duration-200 hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
          >
            {isLoading && <LoaderCircle aria-hidden className="size-3.5 animate-spin" strokeWidth={2.5} />}
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {isLoading ? "Submitting..." : "BOOK A DEMO"}
            </span>
          </button>

          {/* Required attribution when the reCAPTCHA badge is hidden
              (.grecaptcha-badge in globals.css) — Google reCAPTCHA FAQ */}
          <p className="mt-3 text-center font-sans text-field-hint text-grey-500">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-pricing-ink"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-pricing-ink"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookACallForm;
