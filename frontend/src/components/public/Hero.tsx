import Link from "next/link";
import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Every Drop Counts. <br />
          Save a Life Today.
        </h1>
        <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Connect with eligible blood donors in your area. Whether you need
          blood or want to donate, we make it simple and fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/public/dashboard">
            <Button variant="secondary" size="lg">
              🔍 Find Blood
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-700"
            >
              ❤️ Become a Donor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
