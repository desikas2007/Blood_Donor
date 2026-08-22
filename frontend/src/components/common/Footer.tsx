import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🩸</span>
              <span className="text-lg font-bold text-white">
                Blood Donor Portal
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting donors, hospitals and organizations through one trusted
              blood-support platform. Every donation saves lives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/public/dashboard" className="hover:text-white transition-colors">
                  Find Blood
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Blood Donation Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Blood Donation</h3>
            <ul className="space-y-2 text-sm">
              <li>One donation saves up to 3 lives</li>
              <li>Donating takes only 30-45 minutes</li>
              <li>You must be 17+ to donate</li>
              <li>You can donate every 56 days</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>support@blooddonor.org</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91-1800-BLOOD-HELP</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🚨</span>
                <span className="text-red-400 font-semibold">Emergency: 108</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Blood Donor Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
