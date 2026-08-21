import johnnyImg from "@/public/testimonials/johnny.png";
import kateImg from "@/public/testimonials/kate.png";
import meganImg from "@/public/testimonials/megan.png";
import natalieImg from "@/public/testimonials/natalie.png";
import shairaImg from "@/public/testimonials/shaira.png";

import Testimonials, {
  type TestimonialItem,
} from "@/app/components/common/VerticalTestimonials";

const items: TestimonialItem[] = [
  {
    title: "Shaira Javier",
    subtitle: "People Experience Manager",
    text: "Stadium’s customer service is really proactive. That level of care is rare.",
    image: shairaImg,
  },
  {
    title: "Johnny Sorman",
    subtitle: "Manager, Customer Support",
    text: "I cut my time in half by gifting with Stadium this year. What normally took 2–3 months was condensed into just under four weeks.",
    image: johnnyImg,
  },
  {
    title: "Kate Wenzel",
    subtitle: "Director of Brand and Marketing",
    text: "Since moving to Stadium, we’ve been able to expand multiple rewards and recognition programs because the foundation and stores already exist.",
    image: kateImg,
  },
  {
    title: "Megan Caldwell",
    subtitle: "Global People Experience Specialist",
    text: "The onboarding experience for new hires is unmatched. It’s automated, it’s on brand, and we’ve received the most amount of praise we've ever had.",
    image: meganImg,
  },
  {
    title: "Natalie Alexander",
    subtitle: "Senior Enablement & Engagement Specialist",
    text: "Everything we want, eventually, Stadium is like, ‘oh, we’ve got it.’",
    image: natalieImg,
  },
];

export default function TestimonialsSection() {
  return (
    <Testimonials
      title={
        <>
          The proof is
          <br className="hidden md:block" /> in the people
        </>
      }
      showRating
      rating={4.8}
      ratingLabel="on G2 from 1,515 reviews"
      blockquote="What sets Stadium apart is their ability to deliver a complete solution and empower our team — no matter the challenge."
      citation="Maxime Bascon • Chief of Staff • Elktech"
      items={items}
    />
  );
}
