import React from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Anita Gurung",
    role: "Demo Tenant",
    location: "Kathmandu",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Nestra makes finding a rental property much simpler. Everything I need is available in one place.",
  },
  {
    name: "Rohit Thapa",
    role: "Demo Property Owner",
    location: "Lalitpur",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Listing a property and connecting with potential tenants feels much easier with Nestra.",
  },
  {
    name: "Pema Sherpa",
    role: "Demo Tenant",
    location: "Pokhara",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The platform is clean and easy to use. Searching for properties feels much less stressful.",
  },
];

const Testimonials = ({ review }) => {
  return (
    <section id="review" className="bg-[#fafafa] px-5 py-20 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#f5efe2] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#8a641d]">
            Testimonials
          </span>

          <h2 className="mt-5 text-3xl font-bold text-[#14252b] md:text-4xl">
            What our users say
          </h2>

          <p className="mt-4 text-gray-500">
            Demo feedback from the Nestra marketplace experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Quote
                  size={30}
                  className="text-[#142f35]"
                  fill="currentColor"
                />

                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-[#e8b75c] text-[#e8b75c]"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-6 min-h-[110px] text-[15px] leading-7 text-gray-600">
                "{testimonial.review}"
              </p>

              <div className="mt-7 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-[#14252b]">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
