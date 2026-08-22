import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Blood Donor Portal</h3>
            <p className="text-sm">
              Connecting those in need with life-saving blood donors.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/public/dashboard" className="hover:text-white">
                  Find Blood
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">
                  Become a Donor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@blooddonor.org</li>
              <li>Phone: +91-1800-BLOOD-HELP</li>
              <li>Emergency: 108</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Blood Donor Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
