import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: '💡',
    title: 'Innovative Ideas',
    description: 'We\'re cooking up features that solve real problems creatively.',
  },
  {
    icon: '🎨',
    title: 'Beautiful UI',
    description: 'Pixel-perfect designs with a seamless user experience.',
  },
  {
    icon: '⚙️',
    title: 'Powerful Features',
    description: 'Packed with tools to make your workflow smoother and smarter.',
  },
  {
    icon: '🔒',
    title: 'Top Security',
    description: 'Your data and privacy are our top priorities.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description: 'Works beautifully across all devices—desktop to mobile.',
  },
  {
    icon: '🚀',
    title: 'Fast Performance',
    description: 'Blazing-fast experience optimized for performance.',
  },
];

const UnderDevelopment = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-5xl font-bold" data-aos="fade-down">🚧 Under Development</h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We're working hard to build something amazing. Stay tuned!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass p-6 text-center shadow-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      <footer className="mt-20 text-gray-400 text-sm" data-aos="fade-up" data-aos-delay="700">
        &copy; 2025 Tufan. All rights reserved.
      </footer>
    </div>
  );
};

export default UnderDevelopment;
