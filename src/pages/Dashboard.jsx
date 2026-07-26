import { useEffect, useState, useMemo } from "react";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all registrations from your backend API
useEffect(() => {
  const fetchRegistrations = async () => {
    try {
      // Get base URL from env, with a fallback if undefined
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

      // Resulting endpoint: http://127.0.0.1:8000/api/registrations
      const response = await fetch(`${API_BASE_URL}/registrations`);

      if (!response.ok) {
        throw new Error("Failed to fetch donor registrations");
      }
      const data = await response.json();
      setDonors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchRegistrations();
}, []);

  // Compute analytics dynamically from the Donor array
  const analytics = useMemo(() => {
    const total = donors.length;
    const todayStr = new Date().toISOString().split("T")[0];

    let todayCount = 0;
    const bloodGroupCounts = {};
    const districtCounts = {};
    const entrantsSet = new Set();
    const recentActivity = [];

    donors.forEach((donor) => {
      // 1. Today's entries
      if (donor.created_at) {
        const createdDate = new Date(donor.created_at).toISOString().split("T")[0];
        if (createdDate === todayStr) {
          todayCount++;
        }
      }

      // 2. Blood group breakdown
      if (donor.blood_group) {
        const bg = donor.blood_group.toUpperCase();
        bloodGroupCounts[bg] = (bloodGroupCounts[bg] || 0) + 1;
      }

      // 3. Geographic distribution (District)
      if (donor.district) {
        districtCounts[donor.district] = (districtCounts[donor.district] || 0) + 1;
      }

      // 4. Data Entrants count (Unique `entered_by` UUIDs)
      if (donor.entered_by) {
        entrantsSet.add(donor.entered_by);
      }
    });

    // Sort top 5 districts
    const topDistricts = Object.entries(districtCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Estimated storage calculation (~1.5 KB per record text + metadata)
    const storageKB = (total * 1.5).toFixed(1);
    const storageMB = (storageKB / 1024).toFixed(2);

    return {
      total,
      todayCount,
      uniqueEntrants: entrantsSet.size,
      storageMB,
      bloodGroupCounts,
      topDistricts,
      recentDonors: donors.slice(0, 5), // Since backend sorts by created_at desc
    };
  }, [donors]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-red-600 font-semibold">
          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          Loading Analytics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
        <p className="font-semibold">Error loading dashboard data:</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen text-slate-800 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Real-Time Portal Monitoring
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome to eBloodLine Registration Command Center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg uppercase">
            Role: {role || "User"}
          </span>
        </div>
      </div>

      {/* Main High-Level Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Registrations */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg shadow-red-200 p-6 text-white relative overflow-hidden">
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-9xl font-black select-none">
            🩸
          </div>
          <p className="text-red-100 text-xs font-bold uppercase tracking-wider">
            Total Registrations
          </p>
          <p className="text-5xl font-black mt-3">{analytics.total}</p>
          <p className="text-xs text-red-200 mt-2">All-time blood donors recorded</p>
        </div>

        {/* Today's Entries */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            Today's Entries
          </p>
          <div className="flex items-baseline gap-2 mt-3">
            <p className="text-4xl font-black text-slate-900">
              {analytics.todayCount}
            </p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">New donor records today</p>
        </div>

        {/* Admin Metric: Data Entrants */}
        {role === "admin" ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Data Entrants
            </p>
            <p className="text-4xl font-black text-slate-900 mt-3">
              {analytics.uniqueEntrants}
            </p>
            <p className="text-xs text-slate-400 mt-2">Active portal operators</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Districts Covered
            </p>
            <p className="text-4xl font-black text-slate-900 mt-3">
              {analytics.topDistricts.length}
            </p>
            <p className="text-xs text-slate-400 mt-2">Geographic locations</p>
          </div>
        )}

        {/* Admin Metric: Storage Used */}
        {role === "admin" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Estimated Database Load
            </p>
            <p className="text-4xl font-black text-slate-900 mt-3">
              {analytics.storageMB} <span className="text-lg text-slate-500">MB</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">Encrypted donor storage</p>
          </div>
        )}
      </div>

      {/* Deep Analytics Visual Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blood Group Insights Matrix */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Blood Group Distribution
              </h2>
              <p className="text-xs text-slate-500">
                Real-time inventory mapping of donor blood types
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => {
              const count = analytics.bloodGroupCounts[type] || 0;
              const percentage = analytics.total
                ? ((count / analytics.total) * 100).toFixed(1)
                : 0;

              return (
                <div
                  key={type}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-red-600 text-lg">{type}</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {percentage}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-black text-slate-800">{count}</p>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-red-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic / District Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Top Registrations by District
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Highest density donor areas
            </p>

            <div className="space-y-4">
              {analytics.topDistricts.length > 0 ? (
                analytics.topDistricts.map(([district, count]) => {
                  const percent = (
                    (count / analytics.total) *
                    100
                  ).toFixed(0);

                  return (
                    <div key={district} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{district}</span>
                        <span className="text-slate-500">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-800 h-full rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No district data available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donor Registrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Donor Entries
            </h2>
            <p className="text-xs text-slate-500">
              Latest additions to the eBloodLine database
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Donor Name</th>
                <th className="py-3 px-4 font-semibold">Blood Group</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analytics.recentDonors.length > 0 ? (
                analytics.recentDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                        {donor.first_name?.[0] || "D"}
                      </div>
                      {donor.first_name} {donor.last_name || ""}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md font-bold text-xs">
                        {donor.blood_group}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{donor.phone}</td>
                    <td className="py-3 px-4 text-slate-500">
                      {[donor.city, donor.district].filter(Boolean).join(", ") ||
                        "N/A"}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">
                      {donor.created_at
                        ? new Date(donor.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">
                    No donor records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
