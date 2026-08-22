"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";
import Hero from "@/components/public/Hero";
import SearchSection from "@/components/public/SearchSection";
import ScrollReveal from "@/components/common/ScrollReveal";
import AnimatedCounter from "@/components/common/AnimatedCounter";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <SearchSection />

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 10000, suffix: "+", label: "Registered Donors", icon: "🩸" },
              { value: 500, suffix: "+", label: "Hospitals", icon: "🏥" },
              { value: 150, suffix: "+", label: "Organizations", icon: "🏢" },
              { value: 25000, suffix: "+", label: "Successful Connections", icon: "🤝" },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div className="p-4">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-3xl font-bold text-dark">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="text-[14px] text-muted mt-1">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-section-title text-dark mb-2">How It Works</h2>
              <p className="text-[15px] text-muted max-w-lg mx-auto">
                Four simple steps to connect donors with those in need
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Register", desc: "Create your account as a donor, hospital, or organization." },
              { step: "02", title: "Find", desc: "Search for donors by blood group and location." },
              { step: "03", title: "Request", desc: "Send a blood request with urgency and details." },
              { step: "04", title: "Connect", desc: "Donors respond and coordinate blood donation." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} direction="up" delay={i * 150}>
                <div className="text-center bg-white border border-border rounded-lg p-6">
                  <span className="text-[12px] font-semibold text-red-600 uppercase tracking-wider">
                    Step {item.step}
                  </span>
                  <h3 className="font-semibold text-dark mt-2 mb-2 text-[16px]">{item.title}</h3>
                  <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-section-title text-dark mb-2">Why Choose Us</h2>
              <p className="text-[15px] text-muted max-w-lg mx-auto">
                The trusted platform for blood donation coordination
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Fast Donor Discovery", desc: "Find available donors in your area within seconds." },
              { title: "Blood Group Filtering", desc: "Filter by all 8 blood groups to find exactly what you need." },
              { title: "Hospital Connectivity", desc: "Hospitals can directly connect with verified donors." },
              { title: "Organization Support", desc: "NGOs and blood banks can coordinate campaigns and drives." },
              { title: "Request Tracking", desc: "Track the status of every blood request." },
              { title: "Privacy Protected", desc: "Donor personal information is protected." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div className="bg-surface border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-dark mb-1 text-[15px]">{item.title}</h3>
                  <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Groups */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-section-title text-dark mb-2">All Blood Groups Welcome</h2>
              <p className="text-[15px] text-muted">We connect donors across all blood types</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-2xl mx-auto">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group, i) => (
              <ScrollReveal key={group} direction="scale" delay={i * 50}>
                <div className="bg-white border border-border rounded-lg p-3 text-center hover:border-red-300 transition-colors cursor-default">
                  <p className="text-[16px] font-bold text-red-600">{group}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="scale">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-[13px] font-medium text-white/90">Emergency Blood Needed?</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-section-title text-white mb-3">Need Blood Urgently?</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-[15px]">
              Search for available donors in your area right now or contact our emergency helpline.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/public/dashboard" className="bg-white text-red-600 px-6 py-3 rounded-md font-medium text-[15px] hover:bg-red-50 transition-colors inline-flex items-center justify-center">
                Find Donors Now
              </Link>
              <a href="tel:108" className="bg-red-700 text-white px-6 py-3 rounded-md font-medium text-[15px] hover:bg-red-800 transition-colors border border-red-500 inline-flex items-center justify-center">
                Call Emergency: 108
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Facts */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-section-title text-dark text-center mb-10">Why Donate Blood?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { stat: "1", label: "donation saves up to 3 lives" },
              { stat: "38%", label: "of the population is eligible" },
              { stat: "1 in 30", label: "people need blood in their lifetime" },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 150}>
                <div className="text-center p-6 bg-surface border border-border rounded-lg">
                  <p className="text-[28px] font-bold text-red-600 mb-1">{item.stat}</p>
                  <p className="text-[14px] text-muted">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
