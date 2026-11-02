import React, { useState } from 'react';

export default function WmgCorporateContactDesk({ onOpenVendorOnboarding, showToast }) {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      if (showToast) showToast('Please enter a valid email address');
      return;
    }
    if (showToast) showToast('Subscribed to WedMeGood wedding trend updates! 💌');
    setEmail('');
  };

  return (
    <section className="py-12 bg-white font-sans">
      <div className="wmg-container">
        <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c] mb-4">
          WedMeGood - Your Personal Wedding Planner
        </h2>
        <p className="text-[13px] text-[#666] leading-relaxed mb-6">
          WedMeGood is an Indian Wedding Planning Website and app where you can find the best wedding vendors, with prices and reviews at the click of a button. Whether you are looking to hire wedding planners in Delhi NCR, or looking for the top photographers, or just some ideas and inspiration for your wedding. WedMeGood can help you solve your wedding planning woes through its unique features. With a checklist, detailed vendor list, inspiration gallery and blog - you won&apos;t need to spend hours planning a wedding anymore.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#f0f0f0]">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-[14px] text-[#2c2c2c] mb-2">Contact Us to get Best Deals</h4>
            <p className="text-[12px] text-[#666] mb-1">
              <span className="font-bold text-[#333]">For Vendors:</span> vendors@wedmegood.com
            </p>
            <p className="text-[12px] text-[#666] mb-1">
              <span className="font-bold text-[#333]">Phone:</span> 0124-6812346
            </p>
            <p className="text-[12px] text-[#666] mb-1">
              <span className="font-bold text-[#333]">For Users:</span> info@wedmegood.com
            </p>
            <p className="text-[12px] text-[#666]">
              <span className="font-bold text-[#333]">Phone:</span> 0124-6812345
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-[14px] text-[#2c2c2c] mb-2">Registered Office Address</h4>
            <p className="text-[12px] text-[#666] leading-relaxed">
              Second Floor, Ocus Technopolis, Sector 54, Golf Course Road, Gurgaon, Haryana, India - 122002
            </p>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-[14px] text-[#2c2c2c] mb-2">Get The Latest Wedding Trends</h4>
            <form onSubmit={handleNewsletter} className="flex items-center mb-4">
              <input 
                className="border border-gray-300 rounded-l-md px-3 py-1.5 text-[13px] outline-none w-full" 
                placeholder="Enter your email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-[#e72e77] text-white text-[13px] font-bold px-4 py-1.5 rounded-r-md hover:bg-[#d11f67] transition whitespace-nowrap"
              >
                Submit
              </button>
            </form>
            <button 
              onClick={onOpenVendorOnboarding}
              className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] px-6 py-2.5 rounded-md transition shadow-sm inline-block"
            >
              Register as a Vendor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
