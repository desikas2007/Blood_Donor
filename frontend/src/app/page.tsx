import Hero from "@/components/public/Hero";
import SearchSection from "@/components/public/SearchSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search",
                desc: "Find donors by blood group and location.",
              },
              {
                step: "2",
                title: "Connect",
                desc: "Send a blood request to available donors.",
              },
              {
                step: "3",
                title: "Save Lives",
                desc: "Donors respond and coordinate blood donation.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Donation Awareness */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Donate Blood?
          </h2>
          <p className="text-gray-600 mb-8">
            One donation can save up to three lives. Blood is always in demand,
            and your contribution makes a real difference in your community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { stat: "1", label: " donation saves 3 lives" },
              { stat: "38", label: "% of the population is eligible" },
              { stat: "1 in 30", label: " people need blood in their lifetime" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-primary-600 mb-2">
                  {item.stat}
                </p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,200+", label: "Donors" },
              { value: "500+", label: "Requests Fulfilled" },
              { value: "50+", label: "Hospitals" },
              { value: "10+", label: "Cities" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-primary-600">{item.value}</p>
                <p className="text-sm text-gray-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
