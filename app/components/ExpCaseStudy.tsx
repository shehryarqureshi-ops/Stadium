import Testimonials, {
  type TestimonialItem,
} from "@/app/components/common/VerticalTestimonials";

/* Source: Events quotes sheet (Oct 2026 reviews). Text-only cards — no photos or logos supplied.
   eyebrow = company, title = reviewer, subtitle = the event they booked. Obvious typos in the
   submitted quotes are corrected. */
const items: TestimonialItem[] = [
  {
    eyebrow: "Patra Corp",
    title: "Kelly Oliver",
    subtitle: "Culture Club: Self-Doubt to Confidence",
    text: "Always so happy with these events we plan for our virtual teams. Host was outstanding, engaging and kept the group moving along.",
  },
  {
    eyebrow: "Koya Medical",
    title: "Dan Frye",
    subtitle: "Halloween Traitorous Trivia",
    text: "Had a blast doing Traitorous Halloween Trivia, with a large team of 30+ individuals it’s hard to get everyone together for one virtual event. The team did a great job of having facilitators engage the team and keep the event moving. It was a really fun event and the team really enjoyed it!",
  },
  {
    eyebrow: "Alliant Insurance Services, Inc.",
    title: "Vanessa Castellanos",
    subtitle: "Hispanic & Latin American Trivia",
    text: "The host and the scorekeeper were amazing! Their energy brought the event to life. Even though we had a smaller than expected turnout, it worked out because they were able to address everyone on the call. It felt personal and special thanks to the Confetti team.",
  },
  {
    eyebrow: "ViB",
    title: "Laurie Breau",
    subtitle: "Halloween Mystery Chocolate Tasting",
    text: "Our Sommelier was very informative and personable and we learned a lot about chocolate. It was a lot of fun and our team enjoyed it very much.",
  },
  {
    eyebrow: "Cisco Systems Canada",
    title: "Stephanie Kingston",
    subtitle: "Calm and Create",
    text: "Jemima 1000% made this a 5 star event. Her energy was infectious and she was exactly what we needed. The flow of stretches and movement to drawing was wonderfully plotted and Jemima made everything easy and enjoyable. It was an amazing hour and we would absolutely do this event again and have Jemima in for anything.",
  },
  {
    eyebrow: "Stability AI",
    title: "Liza Garibaldi",
    subtitle: "BYO Chilaquiles Making Class",
    text: "We absolutely loved our team cooking event with Vidiana. We were especially excited to learn that she was teaching us this amazing Mexican dish from her home in Mexico City! Can't get more authentic than that. The food was so delicious and we really enjoyed learning some new techniques too.",
  },
  {
    eyebrow: "myLaurel Health",
    title: "Brandy Olden",
    subtitle: "Halloween Traitorous Trivia",
    text: "Our team had a really fun time, it was very engaging, and they loved the fact that you got to trick each other",
  },
  {
    eyebrow: "Atlassian",
    title: "Nicole Heck",
    subtitle: "Magic & Mentalism Show",
    text: "We had a great time! Our magician was engaging with the group, and we had a lot of laughs and the tricks were impressive. He kept the group engaged, which is especially difficult to do remotely. Would definitely do it again!",
  },
  {
    eyebrow: "Stout",
    title: "Fiona Stollfuss",
    subtitle: "Sign Language Workshop: LGBTQIA+ Edition",
    text: "Dr. Lampra was fantastic! She was engaging, energetic, and made the material both enjoyable and easy to follow. She kept the event moving at a great pace while sharing as much valuable information as possible within the time allotted. Thank you so much for such an informative and enjoyable experience!",
  },
  {
    eyebrow: "Delta Dental Insurance",
    title: "Kris Varanelli",
    subtitle: "Fudge Making Class",
    text: "From start to finish it was an easy frictionless experience that provided an excellent Team Building experience for my team.",
  },
];

export default function ExpCaseStudy() {
  return (
    <Testimonials
      title={
        <>
          The best part is
          <br className="hidden md:block" /> what people say
          <br className="hidden md:block" /> after
        </>
      }
      showRating
      rating={4.8}
      ratingLabel="on G2 from 1,515 reviews"
      blockquote="Thanks so much for a smooth, fun experience from booking to even beyond the event! The team loved the hosts’ energy and had many laughs–great way to end the year."
      citation="Susie L. • Product Design Team Ops • Netflix"
      items={items}
    />
  );
}
