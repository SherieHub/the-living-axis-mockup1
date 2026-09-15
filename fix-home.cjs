const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const replacement = `  return (
    <div className="bg-brand-ivory min-h-screen selection:bg-brand-teal/20 selection:text-brand-espresso">
      {/* 1. HERO */}
      <section className="ground-dark relative bg-brand-teal pt-32 pb-20 md:pt-48 md:pb-32 px-5 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
            {/* Left Column: Typography & CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-brand-eucalyptus uppercase tracking-[0.18em] text-[12px] md:text-[13px] font-semibold mb-6 md:mb-8 block">
                PREMIUM MOBILE MASSAGE THERAPY · BROOKLYN, NY
              </span>

              {/* The emotional line is the headline here. Mockup 1 is the warm,
                  referral-and-Instagram direction, so it leads with feeling and
                  lets the subline below carry the six-second test. The
                  positioning line lives in the meta description and on About —
                  never back in this hero. Mobile is capped at 34px. */}
              <h1 className="font-display text-[34px] sm:text-[48px] lg:text-[64px] leading-[1.05] text-brand-ivory mb-5">
                Healing that feels like coming home.
              </h1>`;

content = content.replace(/return \([\s\S]*?<\/h1>/, replacement);
fs.writeFileSync('src/pages/Home.tsx', content);
