"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Hero() {
  const parallaxRef = useParallax({ speed: 0.3, damping: 0.12 });
  const [titleRef, titleVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [subtitleRef, subtitleVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={parallaxRef}
      className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl" style={{ top: "10%", left: "5%" }} />
        <div className="absolute w-80 h-80 bg-white/5 rounded-full blur-3xl" style={{ bottom: "10%", right: "10%" }} />
      </div>

      {/* Decorative blood drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10"
            style={{ left: `${20 + i * 15}%`, top: `${25 + (i % 3) * 20}%`, fontSize: `${20 + i * 6}px` }}
          >
            🩸
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={titleRef}
            className={`inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-2 h-2 bg-white rounded-full" />
            <span className="text-[13px] font-medium text-white/90">Trusted by thousands of donors and hospitals</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-[56px] font-bold mb-6 leading-tight transition-all duration-700 delay-200 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Every Drop Matters.
            <br />
            <span className="text-white/80">Every Donor Can Save a Life.</span>
          </h1>

          <p
            ref={subtitleRef}
            className={`text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Connect donors, hospitals and organizations through one trusted
            blood-support platform. Find the right donor, when it matters most.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-500 ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/public/dashboard">
              <span className="inline-flex items-center justify-center bg-white text-red-600 px-6 py-3 rounded-md font-medium text-[15px] hover:bg-red-50 transition-colors w-full sm:w-auto">
                Find Blood
              </span>
            </Link>
            <Link href="/register">
              <span className="inline-flex items-center justify-center border border-white text-white px-6 py-3 rounded-md font-medium text-[15px] hover:bg-white hover:text-red-600 transition-colors w-full sm:w-auto">
                Become a Donor
              </span>
            </Link>
          </div>

          <div
            className={`flex flex-wrap items-center justify-center gap-6 mt-12 text-[13px] text-white/70 transition-all duration-700 delay-700 ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {["Free to use", "Verified donors", "24/7 availability"].map((text, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
