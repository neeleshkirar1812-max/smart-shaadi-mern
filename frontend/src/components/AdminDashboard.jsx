import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Building2, 
  Calendar, 
  Star,
  Crown
} from 'lucide-react';

export default function AdminDashboard({ vendors, onApproveVendor, showToast }) {
  const pendingVendors = vendors.filter(v => v.approval_status === 'pending');
  const approvedVendors = vendors.filter(v => v.approval_status === 'approved');

  const stats = [
    { label: 'Registered Studios', val: vendors.length, icon: Building2, change: '+14% this quarter' },
    { label: 'Verification Queue', val: pendingVendors.length, icon: ShieldCheck, change: 'Requires manual audit' },
    { label: 'Active Weddings', val: '52', icon: Calendar, change: 'Across 5 Top Hubs' },
    { label: 'Guest Satisfaction', val: '4.98', icon: Star, change: '1,400+ Verified Reviews' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-royal-ruby block mb-1">
            Platform Operations & Governance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Control Room & Listing Approvals
          </h2>
          <p className="text-xs text-royal-muted mt-1">
            Audit newly registered wedding artisans, palace venues, and service studios before public discovery.
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Admin Superuser Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-3xl border border-royal-sand/80 shadow-card">
              <div className="flex items-center justify-between text-royal-muted mb-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">{s.label}</span>
                <Icon className="w-4 h-4 text-royal-ruby" />
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-royal-charcoal">{s.val}</span>
              <span className="text-[10px] text-royal-muted block mt-1">{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* Pending Approval Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-royal-charcoal flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-royal-ruby" />
              <span>Studio Verification Queue ({pendingVendors.length})</span>
            </h3>
            <p className="text-xs text-royal-muted mt-0.5">
              Review certifications, portfolio, and verify standards before granting &apos;Verified Partner&apos; seal.
            </p>
          </div>
        </div>

        {pendingVendors.length === 0 ? (
          <div className="text-center py-12 bg-emerald-50/40 rounded-2xl border border-dashed border-emerald-200 text-emerald-800">
            <Check className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
            <h4 className="font-bold text-sm">All vendor submissions are vetted!</h4>
            <p className="text-xs text-emerald-600 mt-0.5">No pending vendor approvals in the review pipeline.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="p-5 rounded-2xl bg-royal-sand/20 border border-royal-sand/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-royal-sand"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-lg font-bold text-royal-charcoal">{vendor.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-white text-royal-ruby text-[10px] font-bold uppercase shadow-xs">
                        {vendor.category}
                      </span>
                    </div>
                    <p className="text-xs text-royal-muted mt-0.5">{vendor.city} • Starts {vendor.price}</p>
                    <p className="text-xs text-royal-slate mt-1 max-w-xl">{vendor.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onApproveVendor(vendor.id, true);
                      showToast(`${vendor.name} approved & verified! ✨`);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => {
                      onApproveVendor(vendor.id, false);
                      showToast(`${vendor.name} rejected.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-bold transition flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Directory of Approved Vendors */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card">
        <h3 className="font-serif text-xl font-bold text-royal-charcoal mb-4">
          All Active Curated Partners ({approvedVendors.length})
        </h3>
        <div className="divide-y divide-gray-100 text-xs">
          {approvedVendors.map((v) => (
            <div key={v.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-royal-charcoal">{v.name}</span>
                <span className="text-royal-muted">({v.category} - {v.city})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-royal-ruby font-bold">{v.price}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Verified Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
