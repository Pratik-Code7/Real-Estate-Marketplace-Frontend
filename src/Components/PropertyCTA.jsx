import React from "react";
import { ArrowRight, House } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCTA = () => {
  return (
    <section className="px-5 py-16 md:px-10 lg:px-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102b31]">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e8b75c]/10 blur-3xl" />

        <div className="relative grid items-center gap-10 px-7 py-14 md:grid-cols-2 md:px-14 lg:px-20 lg:py-20">
          {/* Content */}
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8b75c] text-[#14252b]">
              <House size={24} />
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Have a property to rent?
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
              List your property on Nestra and connect with people looking for
              their next home.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/post-property"
                className="group flex items-center gap-2 rounded-xl bg-[#e8b75c] px-6 py-3.5 font-semibold text-[#14252b] transition hover:bg-[#f0c878]"
              >
                List Your Property
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/listing"
                className="rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Properties
              </Link>
            </div>
          </div>

          {/* Property visual */}
          <div className="relative hidden md:block">
            <div className="ml-auto max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Modern property"
                className="h-75 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCTA;
