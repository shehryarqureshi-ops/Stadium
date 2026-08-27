"use client";

import StepCardsCarousel, {
  type StepCardsCarouselStep,
} from "@/app/components/common/StepCardsCarousel";

const steps: StepCardsCarouselStep[] = [
  {
    title: "Team Building",
    description:
      "Strengthen team connections by laughing and collaborating together.",
    cards: [
      {
        title: "Classic Trivia",
        description: "60 min · 2 to 500",
        image: "/exp2/cat/xp-cat-classic-trivia.jpg",
        imageAlt: "",
      },
      {
        title: "Escape Quest",
        description: "75 to 90 min · max 500",
        image: "/exp2/cat/xp-cat-escape-quest.jpg",
        imageAlt: "",
      },
      {
        title: "Coworker Clash",
        description: "60 min · 4 to 200",
        image: "/exp2/cat/xp-cat-coworker-clash.jpg",
        imageAlt: "",
      },
      {
        title: "Codeword",
        description: "60 min · 4 to 40",
        image: "/exp2/cat/xp-cat-codeword.jpg",
        imageAlt: "",
      },
      {
        title: "Culture Club: Self-Doubt",
        description: "60 min · 4 to 20",
        image: "/exp2/cat/xp-cat-culture-club-self-doubt.jpg",
        imageAlt: "",
      },
      {
        title: "Culture Club: Work Community",
        description: "60 min · 4 to 20",
        image: "/exp2/cat/xp-cat-culture-club-work-community.jpg",
        imageAlt: "",
      },
      {
        title: "Charades",
        description: "60 min · 4 to 995",
        image: "/exp2/cat/xp-cat-charades.jpg",
        imageAlt: "",
      },
      {
        title: "Live World Tour",
        description: "60 min · max 995",
        image: "/exp2/cat/xp-cat-live-world-tour.jpg",
        imageAlt: "",
      },
    ],
  },
  {
    title: "Learning & Development",
    description:
      "Identify goals and learn soft skills that will empower your team to grow.",
    cards: [
      {
        title: "Bucket List Workshop",
        description: "60 min · 5 to 500",
        image: "/exp2/cat/xp-cat-bucket-list-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Employee Listening for Leaders",
        description: "30 min · 2 to 500",
        image: "/exp2/cat/xp-cat-employee-listening-for-leaders.jpg",
        imageAlt: "",
      },
      {
        title: "Disability Allyship at Work",
        description: "60 min · max 150",
        image: "/exp2/cat/xp-cat-disability-allyship-at-work.jpg",
        imageAlt: "",
      },
      {
        title: "Vision Board Workshop",
        description: "90 min · max 495",
        image: "/exp2/cat/xp-cat-vision-board-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Totem: Strength Recognition",
        description: "60 min · 4 to 95",
        image: "/exp2/cat/xp-cat-totem-strength-recognition.jpg",
        imageAlt: "",
      },
      {
        title: "Empathy Water Cooler",
        description: "45 to 60 min · 4 to 75",
        image: "/exp2/cat/xp-cat-empathy-water-cooler.jpg",
        imageAlt: "",
      },
      {
        title: "Stress Management Workshop",
        description: "60 to 75 min · max 495",
        image: "/exp2/cat/xp-cat-stress-management-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Workplace Mental Health",
        description: "60 min · max 100",
        image: "/exp2/cat/xp-cat-workplace-mental-health.jpg",
        imageAlt: "",
      },
    ],
  },
  {
    title: "Health & Wellness",
    description: "Encourage physical and mental wellness in the workplace.",
    cards: [
      {
        title: "Self-Defense Workshop",
        description: "60 min · max 100",
        image: "/exp2/cat/xp-cat-self-defense-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Bucket List Workshop",
        description: "60 min · 5 to 500",
        image: "/exp2/cat/xp-cat-bucket-list-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Candle Making Class",
        description: "30 to 45 min · max 300",
        image: "/exp2/cat/xp-cat-candle-making-class.jpg",
        imageAlt: "",
      },
      {
        title: "Deskercise Class",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-deskercise-class.jpg",
        imageAlt: "",
      },
      {
        title: "Meditation Class",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-meditation-class.jpg",
        imageAlt: "",
      },
      {
        title: "Terrarium Workshop",
        description: "60 min · max 300",
        image: "/exp2/cat/xp-cat-terrarium-workshop.jpg",
        imageAlt: "",
      },
      {
        title: "Laughter Yoga",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-laughter-yoga.jpg",
        imageAlt: "",
      },
      {
        title: "Vision Board Workshop",
        description: "90 min · max 495",
        image: "/exp2/cat/xp-cat-vision-board-workshop.jpg",
        imageAlt: "",
      },
    ],
  },
  {
    title: "Seasonal Celebrations",
    description:
      "Find memorable moments to celebrate your employees throughout the year.",
    cards: [
      {
        title: "Mixology Class",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-mixology-class.jpg",
        imageAlt: "",
      },
      {
        title: "Murder Mystery Party",
        description: "90 min · max 300",
        image: "/exp2/cat/xp-cat-murder-mystery-party.jpg",
        imageAlt: "",
      },
      {
        title: "Wine Tasting",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-wine-tasting.jpg",
        imageAlt: "",
      },
      {
        title: "Whiskey & Bourbon Tasting",
        description: "30 to 60 min · max 495",
        image: "/exp2/cat/xp-cat-whiskey-and-bourbon-tasting.jpg",
        imageAlt: "",
      },
      {
        title: "Custom Cookie Decorating",
        description: "75 min · max 495",
        image: "/exp2/cat/xp-cat-custom-cookie-decorating.jpg",
        imageAlt: "",
      },
      {
        title: "Lunch Party",
        description: "all group sizes",
        image: "/exp2/cat/xp-cat-lunch-party.jpg",
        imageAlt: "",
      },
      {
        title: "Confetti Pub",
        description: "60 to 120 min · max 975",
        image: "/exp2/cat/xp-cat-confetti-pub.jpg",
        imageAlt: "",
      },
      {
        title: "Office Olympics",
        description: "90 to 120 min · 4 to 488",
        image: "/exp2/cat/xp-cat-office-olympics.jpg",
        imageAlt: "",
      },
    ],
  },
  {
    title: "Employee Onboarding",
    description: "Introduce new hires to your amazing culture from the get-go.",
    cards: [
      {
        title: "Escape Quest",
        description: "75 to 90 min · max 500",
        image: "/exp2/cat/xp-cat-escape-quest.jpg",
        imageAlt: "",
      },
      {
        title: "Coworker Clash",
        description: "60 min · 4 to 200",
        image: "/exp2/cat/xp-cat-coworker-clash.jpg",
        imageAlt: "",
      },
      {
        title: "Taboo",
        description: "60 min · 4 to 995",
        image: "/exp2/cat/xp-cat-taboo.jpg",
        imageAlt: "",
      },
      {
        title: "Classic Trivia",
        description: "60 min · 2 to 500",
        image: "/exp2/cat/xp-cat-classic-trivia.jpg",
        imageAlt: "",
      },
      {
        title: "Show n Share Water Cooler",
        description: "30 to 45 min · 4 to 200",
        image: "/exp2/cat/xp-cat-show-n-share-water-cooler.jpg",
        imageAlt: "",
      },
      {
        title: "Jeoparty",
        description: "45 to 60 min · 2 to 180",
        image: "/exp2/cat/xp-cat-jeoparty.jpg",
        imageAlt: "",
      },
      {
        title: "Guess Who",
        description: "60 min · 6 to 15",
        image: "/exp2/cat/xp-cat-guess-who.jpg",
        imageAlt: "",
      },
      {
        title: "Mash-Up",
        description: "60 to 90 min · 4 to 200",
        image: "/exp2/cat/xp-cat-mash-up.jpg",
        imageAlt: "",
      },
    ],
  },
  {
    title: "Diversity, Equity, & Inclusion",
    description:
      "Promote DEI and create a better sense of belonging within teams.",
    cards: [
      {
        title: "Neurodiversity 101",
        description: "60 min · 2 to 500",
        image: "/exp2/cat/xp-cat-neurodiversity-101.jpg",
        imageAlt: "",
      },
      {
        title: "Disability Allyship at Work",
        description: "60 min · max 150",
        image: "/exp2/cat/xp-cat-disability-allyship-at-work.jpg",
        imageAlt: "",
      },
      {
        title: "Black Cultural Impact",
        description: "60 min · max 495",
        image: "/exp2/cat/xp-cat-black-cultural-impact.jpg",
        imageAlt: "",
      },
      {
        title: "Black History & Culture Trivia",
        description: "60 min · 2 to 500",
        image: "/exp2/cat/xp-cat-black-history-and-culture-trivia.jpg",
        imageAlt: "",
      },
      {
        title: "Women's History Trivia",
        description: "60 min · 2 to 500",
        image: "/exp2/cat/xp-cat-womens-history-trivia.jpg",
        imageAlt: "",
      },
      {
        title: "Exploring Black Art",
        description: "60 min · max 495",
        image: "/exp2/cat/xp-cat-exploring-black-art.jpg",
        imageAlt: "",
      },
      {
        title: "Understanding Juneteenth",
        description: "60 min · max 495",
        image: "/exp2/cat/xp-cat-understanding-juneteenth.jpg",
        imageAlt: "",
      },
      {
        title: "Exploring Hispanic Art",
        description: "60 min · max 495",
        image: "/exp2/cat/xp-cat-exploring-hispanic-art.jpg",
        imageAlt: "",
      },
    ],
  },
];

export default function ExpCategories() {
  return (
    <StepCardsCarousel
      caption="Browse by category"
      captionColor="#FF5B77"
      title="Pick what fits your team, not a generic list"
      description="Some teams want to compete. Others want to create, learn, or unwind."
      steps={steps}
      showNumberInHeading={false}
    />
  );
}
