const fs = require('fs');

let content = fs.readFileSync('src/pages/Services.tsx', 'utf8');

// 1. Add hook import
content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");

// 2. Add hook for active section
const hookCode = `  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );
    const sections = document.querySelectorAll('.service-section');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
`;
content = content.replace('  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});', hookCode);

// 3. Update the layout
const layoutStart = `      {/* Core Services Section */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Sticky Nav */}
          <div className="lg:w-1/4 shrink-0 hidden lg:block">
            <div className="sticky top-32">
              <nav className="flex flex-col text-sm uppercase tracking-widest font-semibold">
                {[...services, ...specialtyServices].map((s) => (
                  <a
                    key={s.id}
                    href={\`#\${s.id}\`}
                    className={\`block py-4 border-b border-brand-teal/10 transition-colors \${
                      activeSection === s.id ? 'text-brand-teal' : 'text-brand-espresso/40 hover:text-brand-espresso/70'
                    }\`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4 flex flex-col gap-24 md:gap-32">
`;
content = content.replace('      {/* Core Services Section */}\n      <section className="px-6 lg:px-12 max-w-[1200px] mx-auto mb-24 md:mb-32">\n        <div className="flex flex-col gap-24 md:gap-32">', layoutStart);

// 4. Update core service font for price and add class
content = content.replace(/className="scroll-mt-32"/g, 'className="scroll-mt-32 service-section"');
content = content.replace(/<span className="nums font-display text-2xl md:text-3xl text-brand-teal">/g, '<span className="nums font-body font-medium text-2xl md:text-3xl text-brand-teal">');

// 5. Update specialty services layout to match
const specialtyStart = `      {/* Specialty Services Section */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-1/4 shrink-0 hidden lg:block">
              {/* Keeps alignment with above */}
            </div>
            <div className="lg:w-3/4">
              <motion.div
`;
content = content.replace('      {/* Specialty Services Section */}\n      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">\n          <div className="max-w-[1200px] mx-auto">\n            <motion.div', specialtyStart);

content = content.replace('      {/* Specialty Services Section */}\n      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">\n        <div className="max-w-[1200px] mx-auto">\n          <motion.div', specialtyStart);


// Add a missing closing div for the layout
content = content.replace('        </div>\n      </section>\n\n      {/* Specialty Services Section */}', '          </div>\n        </div>\n      </section>\n\n      {/* Specialty Services Section */}');
content = content.replace('              </div>\n            </div>\n          </div>\n        </section>\n\n        {/* Important Information Before Booking */}', '              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      {/* Important Information Before Booking */}');

fs.writeFileSync('src/pages/Services.tsx', content);
