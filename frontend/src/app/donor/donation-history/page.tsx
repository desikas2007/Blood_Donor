"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { getReceivedRequests } from "@/services/request.service";
import Loading from "@/components/common/Loading";

export default function DonationHistoryPage() {
  const { user, loading: authLoading } = useRole("donor");
  const [history, setHistory] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getReceivedRequests()
      .then((requests) =>
        // A donation happened when the donor accepted (or completed) a request
        setHistory(requests.filter((r) => r.status === "completed" || r.status === "accepted"))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || loading) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Donation History</h1>
        <p className="text-[15px] text-muted mt-1">Your past blood donations.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-[15px] text-dark font-medium mb-1">No donations yet</p>
          <p className="text-[13px] text-muted">
            When you accept and complete blood requests, they will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Hospital / Organization</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Blood Group</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-[14px] text-dark">{new Date(item.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className="px-5 py-4 text-[14px] text-dark">{item.requester_name}</td>
                    <td className="px-5 py-4">
                      <span className="text-[13px] font-semibold text-red-600">{item.blood_group}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                        item.status === "completed" ? "bg-gray-100 text-gray-600" : "bg-green-50 text-green-700"
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {history.map((item) => (
              <div key={item.id} className="bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-dark">{item.requester_name}</span>
                  <span className="text-[13px] font-semibold text-red-600">{item.blood_group}</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-muted">
                  <span>{new Date(item.created_at).toLocaleDateString("en-IN")}</span>
                  <span className="capitalize">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
