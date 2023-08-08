import Image from "next/image";
import { Container } from "~/components/display/Container";

import avatarImage1 from "../../images/avatars/avatar-1.png";
import avatarImage2 from "@/images/avatars/avatar-2.png";
import avatarImage3 from "@/images/avatars/avatar-3.png";
import avatarImage4 from "@/images/avatars/avatar-4.png";
import avatarImage5 from "@/images/avatars/avatar-5.png";

const testimonials = [
  [
    {
      content:
        "As a new mom, I was constantly worried about my baby's sleep patterns. This app has been a lifesaver! The detailed analysis helped me understand my child's sleep habits and put my mind at ease. I can now make informed decisions to ensure my little one gets the rest he needs.",
      author: {
        name: "Sheryl Berge",
        role: "New Parent",
        image: avatarImage1,
      },
    },
    {
      content:
        "I often suggest this app to the parents of my young patients. Its robust analysis tools provide valuable insights into a child's sleep, which is crucial for their development. The ability to monitor sleep trends over time is an excellent feature that can aid in early detection of potential issues.",
      author: {
        name: "Amy Hahn",
        role: "Pediatrician",
        image: avatarImage4,
      },
    },
  ],
  [
    {
      content:
        "As someone who appreciates good technology, I must say that this app is incredibly user-friendly and precise. The charts and data visualizations are clear, making it easy to track and understand my daughter's sleep patterns. It's become an essential part of our nightly routine.",
      author: {
        name: "Leland Kiehn",
        role: "Tech-Savvy Dad",
        image: avatarImage5,
      },
    },
    {
      content:
        "I love the simplicity and efficiency of this app! Tracking both my kids' sleep patterns in one place is a breeze. The insights provided are extremely helpful in maintaining a healthy sleep routine for them. I highly recommend it to any parent looking to understand their child's sleep better.",
      author: {
        name: "Erin Powlowski",
        role: "Father of Two",
        image: avatarImage2,
      },
    },
  ],
  [
    {
      content:
        "Managing the sleep of our triplets was a daunting task until we found this app. The ability to record and analyze sleep data for all three children individually has been invaluable. The suggestions and insights provided have made our nights much more peaceful. A must-have for parents with multiples!",
      author: {
        name: "Peter Renolds",
        role: "Parents of Triplets",
        image: avatarImage3,
      },
    },
    {
      content:
        "My daughter introduced me to this app to help me with my grandchildren when they stay over. It's so simple to use, even for someone who isn't tech-savvy like me! I love how it allows me to ensure that they're getting proper rest, just like their parents would.",
      author: {
        name: "Amy Hahn",
        role: "Grandmother",
        image: avatarImage4,
      },
    },
  ],
];

interface Props {
  [key: string]: any;
}

function QuoteIcon(props: Props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Loved by businesses worldwide.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Our software is so simple that people can’t help but fall in love
            with it. Simplicity is easy when you just skip tons of
            mission-critical features.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
