import React from "react";
import { Search, MessageCircle, CalendarDays, House } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description:
      "Find properties that match your location, budget, and preferences.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Connect",
    description:
      "Connect directly with verified property owners without unnecessary hassle.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Visit",
    description:
      "Schedule a visit and explore the property before making your decision.",
  },
  {
    number: "04",
    icon: House,
    title: "Move In",
    description:
      "Choose your perfect place and move into your new home with confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white px-5 py-20 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#f5efe2] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#8a641d]">
            How It Works
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#14252b] md:text-4xl lg:text-5xl">
            Finding your next home is simple
          </h2>

          <p className="mt-4 text-gray-500">
            We've made the process easy and hassle-free for you.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-4 md:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                {/* Connecting line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[60%] top-7 hidden w-[80%] border-t border-dashed border-gray-300 md:block" />
                )}

                {/* Number / Icon */}
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#142f35] text-white shadow-lg">
                  <Icon size={22} />
                </div>

                <span className="mt-5 block text-xs font-semibold text-[#b88932]">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-[#14252b]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-60 text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
