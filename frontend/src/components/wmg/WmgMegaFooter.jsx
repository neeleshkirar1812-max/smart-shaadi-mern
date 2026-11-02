import React from 'react';

export default function WmgMegaFooter({ setView, onScrollToSection, onOpenAuth }) {
  return (
    <footer className="bg-[#f8f8f8] border-t border-[#e4e4e4] pt-12 pb-8 text-[12px] text-[#666] font-sans">
      <div className="wmg-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Column 1: Start Planning */}
          <div>
            <h4 className="font-bold text-[#2c2c2c] text-[13px] uppercase tracking-wider mb-3">
              Start Planning
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => setView?.('vendors')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Search By Vendor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('venues')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Search By City
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection?.('app-download')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Download Our App
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('vendors')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Top Rated Vendors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('venues')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Destination Wedding
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Wedding Ideas */}
          <div>
            <h4 className="font-bold text-[#2c2c2c] text-[13px] uppercase tracking-wider mb-3">
              Wedding Ideas
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => setView?.('blog-page')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Wedding Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('photos-gallery')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Wedding Inspiration Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('real-weddings-page')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Real Wedding
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth?.('couple')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Submit Wedding
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Photo Gallery */}
          <div>
            <h4 className="font-bold text-[#2c2c2c] text-[13px] uppercase tracking-wider mb-3">
              Photo Gallery
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Bridal Wear</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Wedding Jewellery</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Bridal Makeup &amp; Hair</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Wedding Decor</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Wedding Photography</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Groom Wear</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Invitations &amp; Favors</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Wedding Accessories</button></li>
              <li><button onClick={() => setView?.('photos-gallery')} className="hover:text-[#e72e77]">Mehendi Designs</button></li>
            </ul>
          </div>

          {/* Column 4: Home */}
          <div>
            <h4 className="font-bold text-[#2c2c2c] text-[13px] uppercase tracking-wider mb-3">
              Home
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">About WedMeGood</button></li>
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">Careers</button></li>
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">Contact Us</button></li>
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">Site Map</button></li>
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">Terms &amp; Conditions</button></li>
              <li><button onClick={() => setView?.('discover')} className="hover:text-[#e72e77]">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Column 5: Wedding Invitation Maker */}
          <div>
            <h4 className="font-bold text-[#2c2c2c] text-[13px] uppercase tracking-wider mb-3">
              Wedding Invitation Maker
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => setView?.('e-invites-page')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Wedding Card Designs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('e-invites-page')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Save the Date Templates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView?.('e-invites-page')} 
                  className="hover:text-[#e72e77] text-left"
                >
                  Invitation Video Templates
                </button>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-bold text-[#2c2c2c] text-[11px] uppercase tracking-wider mb-2">
                Follow Us
              </h5>
              <div className="flex items-center space-x-3 text-[#555]">
                <a className="hover:text-[#e72e77]" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a className="hover:text-[#e72e77]" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                <a className="hover:text-[#e72e77]" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a className="hover:text-[#e72e77]" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#888]">
          <div>
            © 2026 Terms &amp; Conditions | Privacy Policy
          </div>
          <div className="mt-2 md:mt-0 font-medium">
            WedMeGood - Indian Wedding Planning Website
          </div>
        </div>
      </div>
    </footer>
  );
}
