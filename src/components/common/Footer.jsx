import React from 'react';

// Import your social media and other icons from assets
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import linkedinIcon from '../../assets/linkedin.png';
import youtubeIcon from '../../assets/youtube.png';
import tiktokIcon from '../../assets/tiktok.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-300 py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold text-[#f04f18] font-['Plus_Jakarta_Sans'] mb-2">
              Follow us on
            </h2>
            <div className="flex space-x-4 mb-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <img src={tiktokIcon} alt="TikTok" className="w-6 h-6" />
              </a>
            </div>
            <p className="text-base text-black font-medium font-['Plus_Jakarta_Sans'] ml-2">
              @ power By. A1ItInovation.
            </p>
          </div>

          {/* Center Taglines */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-[#f04f18] font-['Plus_Jakarta_Sans']">
              RIDE SMART || TRAVEL SAFE
            </h2>
            <p className="text-base font-medium text-[#f04f18] font-['Plus_Jakarta_Sans']">
              YOUR TRAVEL PARTNER
            </p>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <p className="text-base text-black font-medium font-['Plus_Jakarta_Sans'] ml-2">
                © Tufan. All rights reserved.
              </p>


            </div>
          </div>

          {/* Documentation or Extra Links */}
          <div>
            <h2 className="text-lg font-bold text-[#f04f18] font-['Plus_Jakarta_Sans']">
              Documentation
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/branch-extension" className="text-base text-black font-medium hover:underline">
                  Branch Extension
                </a>
              </li>
              <li>
                <a href="/terms" className="text-base text-black font-medium hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-base text-black font-medium hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
