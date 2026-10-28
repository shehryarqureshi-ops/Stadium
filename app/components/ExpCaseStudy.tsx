import Testimonials, {
  type TestimonialItem,
} from "@/app/components/common/VerticalTestimonials";

/* Source: Events quotes sheet. Text-only cards — no photos or logos supplied. */
const items: TestimonialItem[] = [
  {
    eyebrow: "PATRA CORP FOR CULTURE CLUB",
    title: "Kelly Olive",
    text: "Always so happy with these events we plan for our virtual teams. Host was outstanding, engaging and kept the group moving along.",
  },
  {
    eyebrow: "KOYA MEDICAL",
    title: "Dan Frye",
    text: "Had a blast doing Traitorous Halloween Trivia, with a large team of 30+ individuals it’s hard to get everyone together for one virtual event. The team did a great job of having facilitators engage the team and keep the event moving. It was a really fun event and the team really enjoyed it!",
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
