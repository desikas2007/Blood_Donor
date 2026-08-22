"use client";

import { useRole } from "@/hooks/useRole";
import Loading from "@/components/common/Loading";

const mockHistory = [
  { date: "12 Aug 2026", hospital: "KSR Hospital", bloodGroup: "O+", units: 1 },
  { date: "20 May 2026", hospital: "City Hospital", bloodGroup: "O+", units: 2 },
  { date: "15 Feb 2026", hospital: "Government Hospital", bloodGroup: "O+", units: 1 },
  { date: "10 Nov 2025", hospital: "Red Cross Society", bloodGroup: "O+", units: 1 },
];

export default function DonationHistoryPage() {
  const { user, loading: authLoading } = useRole("donor");

  if (authLoading) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Donation History</h1>
        <p className="text-[15px] text-muted mt-1">Your past blood donations.</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Date</th>
              <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Hospital</th>
              <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Blood Group</th>
              <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Units</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((item, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-5 py-4 text-[14px] text-dark">{item.date}</td>
                <td className="px-5 py-4 text-[14px] text-dark">{item.hospital}</td>
                <td className="px-5 py-4">
                  <span className="text-[13px] font-semibold text-red-600">{item.bloodGroup}</span>
                </td>
                <td className="px-5 py-4 text-[14px] text-muted">{item.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {mockHistory.map((item, i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-semibold text-dark">{item.hospital}</span>
              <span className="text-[13px] font-semibold text-red-600">{item.bloodGroup}</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-muted">
              <span>{item.date}</span>
              <span>{item.units} unit{item.units > 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
