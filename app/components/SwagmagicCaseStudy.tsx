import before from "@/public/swag2/sw2-casestudy-before.jpg";
import during from "@/public/swag2/sw2-casestudy-during.jpg";
import after from "@/public/swag2/sw2-casestudy-after.jpg";

import StickyStepCards from "@/app/components/common/StickyStepCards";

export default function SwagmagicCaseStudy() {
  return (
    <StickyStepCards
      caption="CASE STUDY"
      captionColor="#218554"
      title={
        <>
          From nine
          <br />
          swag vendors to one
        </>
      }
      description="How Paperchase simplified global swag and gave marketing its time back."
      blockquote="We were juggling nine swag vendors, and marketing was stuck managing logistics. Now the program runs itself, and our vendor list is just one."
      quoteAuthor="Nish Patel • CEO, Paperchase"
      link="https://www.bystadium.com/case-study/financial-services-company"
      steps={[
        {
          stepLabel: "BEFORE",
          image: before,
          imageAlt:
            "A marketing manager at a desk covered in paperwork and shipping boxes, head in hand",
          title: "Nine vendors, one exhausted manager",
          content: (
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>9 swag vendors</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>Inventory aging in a basement</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>Marketing doing logistics</span>
              </li>
            </ul>
          ),
        },
        {
          stepLabel: "DURING",
          image: during,
          imageAlt:
            "A Stadium teammate walking a customer through the migration on a laptop",
          title: "Migrated in 67 days",
          content: (
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>6 brand stores live</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>0 programs paused</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>One brand pack</span>
              </li>
            </ul>
          ),
        },

        {
          stepLabel: "AFTER",
          image: after,
          imageAlt:
            "A smiling admin in a Stadium tee running the swag program from one laptop",
          title: "One platform, two admins",
          dark: true,
          content: (
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>1 vendor, 1 invoice</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>14-country program</span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-[#d9d9d9]"
                />
                <span>Marketing got their job back</span>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
