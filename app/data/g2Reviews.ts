/* Snapshot of the 20 latest 5-star G2 reviews (Stadium Shops | SnackMagic | SwagMagic),
   taken 2026-10-18. Only a fallback: <G2Reviews> fetches the live list and uses this
   if the request fails. Source: g2.com/products/snackmagic/reviews */

export type G2Review = {
  name: string;
  rating: number;
  title: string;
  text: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  url: string;
};

export const G2_FALLBACK_SUMMARY = { rating: 4.8, count: 2373 };

export const G2_FALLBACK_REVIEWS: G2Review[] = [
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Amazing Variety of Delicious Snacks at Reasonable Prices!",
    "text": "I was so amazed to see such of a variety of delicious snacks, and at reasonable prices! There were no dislikes at all. I liked very much! N/A my first time and was very pleased.",
    "date": "2026-10-15",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13794624"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Great Variety of Healthy Treats at a Great Value",
    "text": "I like the assortment of choices, especially the healthy treats. Overall, I feel the product offers good value for what you get. I’m so excited to receive my package—I really didn’t want to wait. It’s so hard to find vegan and dairy-free snacks, but Snack Magic has a good assortment of them.",
    "date": "2026-10-15",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13795278"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Easy to Use with Clear Ingredient Lists and Helpful Preferences Tool",
    "text": "It was incredibly easy to use and all of the items I looked at for snacks had the ingredients clearly listed which made it easier to navigate specific allergens. The built in tool for preferences was also a very easy to look through. For some of the preferences, I wish it was easier to specify what allergen specifically may be the problem. Especially as my nut allergy does not cover all nuts. Especially with allergens listed for items. Did not encounter any problems really. This tool was directed at our team as an employee appreciation gift. It made it easier to ensure everyone got what they wanted that could also enjoy the gift.",
    "date": "2026-10-13",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13776923"
  },
  {
    "name": "Tristen F.",
    "rating": 5,
    "title": "Takes the Guesswork Out of Gifting with Plenty of Snack Choices",
    "text": "Everyone can pick the items they actually like, which takes the guesswork out of giving a gift. There’s also a lot to choose from, especially for anyone with restrictions. I'd like to view all possible snack options at once filtered by price. It's removing the guesswork and simplifying gift giving at my company. It's so much more personal than a gift card, but they still get to choose.",
    "date": "2026-10-12",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13766657"
  },
  {
    "name": "Briana G.",
    "rating": 5,
    "title": "So Many Top-of-the-Line Choices, from Snacks to Electronics",
    "text": "I love all the options they offer, from snacks to electronics! There are so many top-of-the-line choices, including plenty of healthy alternatives for us to pick from. There isn’t anything I don’t like about Snackmagic. I don’t have to think too hard about which snacks to choose from, because they already have boxes pre-selected if you want to go that route. It’s super simple, and for someone like me who likes suggestions, it’s nice that they take care of that part for me.",
    "date": "2026-10-10",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13754463"
  },
  {
    "name": "Trinesha H.",
    "rating": 5,
    "title": "A Fun Variety of Cool Goodies You Won’t Find Everywhere",
    "text": "the different variety and cool goodies that arenot in every store Not a dislike but they need more universal snacks on there. Helping me fuel up on clean snacks and energy for busy work season.",
    "date": "2026-10-09",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13749630"
  },
  {
    "name": "Vishranti T.",
    "rating": 5,
    "title": "Clear Product Segregation and Display",
    "text": "I like the clear method used for product segregation and display. There are only a limited number of product pictures available—just one. It displays products across regions, which helps with hassle-free order submission from any part of the world without having to worry about logistics or additional local taxes.",
    "date": "2026-10-08",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13739724"
  },
  {
    "name": "Nick M.",
    "rating": 5,
    "title": "Great Products and an Easy-to-Navigate Site",
    "text": "Great products and easy to navigate site The \"spending\" amount refreshed per category. That was a little annoying Company provided an easy source to use for awards",
    "date": "2026-10-07",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13731327"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Easy to Navigate, Great Variety, and Consistently Pleased with the Products",
    "text": "The website was very easy to navigate and there is a good variety of options to choose from. I've always been very pleased with the products I have received. Thank you! Denise There is nothing to dislike! I've always been very happy with the products I have received. Thank you! I've not had any issues with any of the ordering process.",
    "date": "2026-10-07",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13733804"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Stress-Free Tax Savings Made Choosing What I Wanted Easy",
    "text": "I didn't have to worry about saving enough for Taxes. That made getting to choose what I really wanted easier. I wish there were more \"puff\" options and none chocolate sweets. Employee appreciation.",
    "date": "2026-10-06",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13713595"
  },
  {
    "name": "Tammy W.",
    "rating": 5,
    "title": "Wide Product Selection—Great Value Even with $50 in Stadium Dollars",
    "text": "I like Stadium as a recipient of Stadium dollars because they offer a wide range of products to choose from, even when the amount of Stadium dollars I have is as low as $50. For constructive feedback, I’d suggest offering smaller packages of some of the snacks so the recipient can sample the treat without having to spend all of their Stadium dollars just to get a taste. Stadium offers workplace products that help make employees feel special and appreciated.",
    "date": "2026-10-05",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13707120"
  },
  {
    "name": "Astin S.",
    "rating": 5,
    "title": "Endless Snack Variety with Healthier Treat Options (and not feeling guilty for it!)!",
    "text": "I love the variety and the opportunities to try new things. The Dubai cones, plus the healthier variety of chips and cookies, make the options feel endless. It’s the kind of place where snacks can be a sweet treat for yourself without feeling quite so guilty about having one. I have no complaints! I’m truly grateful that you partnered with Fetch to show that User Support really matters, and to highlight the impact we have on our users and the company. What we do genuinely makes a difference, and you were part of that mission—helping us feel rewarded, just like our users do! Not sure, but what you guys do for users, company partners, and the difference you make in users lives like mine, make me feel like what I am doing does matter and that we are making an impact!",
    "date": "2026-10-03",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13695972"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Fast, Easy International Gifting with Great Box Selection",
    "text": "I used this service to send a gift to a friend in another country, and it worked really well for this. There's a good selection of boxes, and the interface is clear: you can order in just three steps (address, box selection, order confirmation). Delivery took only 2.5 days from purchase to arrival, and a tracking number was provided. Most importantly, my friend was delighted with the gift! One small drawback: the tracking link led to FedEx, but the tracking number was actually from Thailand Post. I figured it out with the help of AI, but it would be better if the link pointed to the correct carrier. I can send gifts to friends all over the world, and there are two ways to do it: I can send a redeem link so the recipient picks their own box, or I can choose the box myself and have it sent directly. Gift values range from $45 to $99, so there's a good option for different budgets.",
    "date": "2026-10-02",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13687009"
  },
  {
    "name": "Steven S.",
    "rating": 5,
    "title": "Easy-to-Use Merchandise Portal with Fast Shipping and a Responsive Site",
    "text": "Provides a very easy to use portal for company merchandise. Very simple interface, easy shipping, fast and responsive website. More pictures of the items is always welcome Makes it easy for employees like me to pick the swag they like",
    "date": "2026-10-01",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13684669"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "Stadium Makes Shopping Easy with Save-for-Later and Helpful Credit Reminders",
    "text": "Using Stadium is really easy. Even if I don’t buy anything right away, I can save what I want and come back to purchase it later. I also like that it reminds me when I have credits/cash to spend. So far, I don’t have any dislikes about Stadium. Over the last two years at my company, Swagmagic, I can say they’ve updated to offer more products and more variety at Snackmagic.",
    "date": "2026-10-01",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13685898"
  },
  {
    "name": "Veena B.",
    "rating": 5,
    "title": "Very Good Product Quality—Highly Recommended by Colleagues",
    "text": "Quality of the product is very good and i got to know form my collegues don’t have any major dislikes. Overall, the experience has been good nothing",
    "date": "2026-09-30",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13672798"
  },
  {
    "name": "Dinesh D.",
    "rating": 5,
    "title": "Easy to Use, Centralized Hub for All Our Recognition",
    "text": "It’s very easy to use, and it lets us see all of our appreciations, shoutouts, awards, and similar recognition in one place. The Marketplace amounts are only showing in $ even when I’m outside the US, so I can’t purchase using my local currency. Employee perks and shoutouts, rewards we can manage in single url",
    "date": "2026-09-30",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13667587"
  },
  {
    "name": "Verified User",
    "rating": 5,
    "title": "An Easy Way to Send Corporate Gifts with Flexible Choice",
    "text": "Easy solution to give a corporate gift. You can choose your own. n/an/an/an/an/an/an/an/an/an/an/an/an/an/an/a It has made corporate gifting very easy Employees can choose whatever they want . also the goodies.",
    "date": "2026-09-29",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13650065"
  },
  {
    "name": "Lingasvaran S.",
    "rating": 5,
    "title": "Plenty of Options to Choose From",
    "text": "Too much option to choose which is better Listing loads too fast and better in showing the UI Redeeming company gifts is very easy because we already have the information upfront, like which items are eligible and their best prices, all on a single site. Otherwise, we would need to visit multiple sites to check prices and decide which one is offering the lowest. In Stadium, the prices also seem affordable.",
    "date": "2026-09-28",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13646469"
  },
  {
    "name": "Neil S.",
    "rating": 5,
    "title": "Ordering My First Gift Pack Was Effortless",
    "text": "The ease of ordering my first gift pack. The descriptions of the gift packs could be easier to read, i.e. what was actually in the gift packs. It's making it easy to order a gift pack, whether for my staff or clients",
    "date": "2026-09-25",
    "url": "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews/stadium-i-snackmagic-i-swagmagic-review-13606752"
  }
];
