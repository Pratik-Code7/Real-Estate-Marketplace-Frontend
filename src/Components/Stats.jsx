import React from "react";
import { House, Users, MapPin, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: House,
    value: "500+",
    label: "Listings",
    description: "Properties available",
  },
  {
    icon: Users,
    value: "200+",
    label: "Property Owners",
    description: "Trusted owners",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Locations",
    description: "Across Nepal",
  },
  {
    icon: ShieldCheck,
    value: "99%",
    label: "Trusted",
    description: "Positive experience",
  },
];

const Stats = () => {
  return (
    <section className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-5 py-10 text-center ${
                  index !== stats.length - 1
                    ? "border-b border-white md:border-b-0 md:border-r"
                    : ""
                } ${index === 1 ? "border-r border-white" : ""}`}
              >
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="bg-gray-400 rounded-full h-14 w-14 p-4"
                />

                <h3 className="mt-5 text-3xl font-bold  md:text-4xl">
                  {stat.value}
                </h3>

                <p className="mt-2 font-medium ">{stat.label}</p>

                <p className="mt-1 text-sm ">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
