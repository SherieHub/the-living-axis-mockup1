const fs = require('fs');

// 1. Footer.tsx
let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footer = footer.replace(
  /<Link to="\/".*?>[\s\S]*?<img[\s\S]*?\/>[\s\S]*?<\/Link>/,
  `<Link to="/" className="inline-flex items-center gap-3 rounded-sm mb-6" aria-label="The Living Axis">
              <img 
                src={lightLogo} 
                alt="" 
                className="h-10 w-auto object-contain" 
              />
              <span className="font-display font-medium text-[28px] tracking-wide uppercase text-brand-ivory">
                The Living Axis
              </span>
            </Link>`
);
fs.writeFileSync('src/components/Footer.tsx', footer);

// 2. Header.tsx
let header = fs.readFileSync('src/components/Header.tsx', 'utf8');
header = header.replace(
  /<Link to="\/".*?>[\s\S]*?<img[\s\S]*?\/>[\s\S]*?<span[\s\S]*?>[\s\S]*?<\/span>[\s\S]*?<\/Link>/,
  `<Link to="/" className="z-50 relative rounded-sm flex flex-col justify-center" aria-label="The Living Axis">
          <div className="flex items-center gap-3">
            <img 
              src={useTransparentHeader ? lightLogo : darkLogo} 
              alt="" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
            <span className="font-display font-medium text-2xl tracking-wide uppercase block">The Living Axis</span>
          </div>
          {/* Positioning line — Build Note: belongs in the header, meta
              description, and About, wherever the brand is explained to
              someone new. Desktop only; the mobile header stays uncluttered. */}
          <span
            className={cn(
              'hidden md:block text-[11px] tracking-[0.08em] font-light mt-1.5',
              useTransparentHeader ? 'text-brand-ivory/70' : 'text-brand-espresso/55'
            )}
          >
            {BRAND_LINE_POSITIONING}
          </span>
        </Link>`
);
fs.writeFileSync('src/components/Header.tsx', header);

// 3. Book.tsx
let book = fs.readFileSync('src/pages/Book.tsx', 'utf8');
book = book.replace(
  /<header className="absolute top-0 left-0 right-0 p-6 flex justify-center">\s*<Link to="\/">[\s\S]*?<\/Link>\s*<\/header>/,
  `<header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
          <Link to="/" className="flex items-center gap-3" aria-label="The Living Axis">
            <img 
              src={darkLogo} 
              alt="" 
              className="h-8 w-auto object-contain" 
            />
            <span className="font-display font-medium text-xl tracking-wide uppercase text-brand-espresso">
              The Living Axis
            </span>
          </Link>
        </header>`
);
book = book.replace(
  /<div className="absolute left-1\/2 -translate-x-1\/2">\s*<Link to="\/">[\s\S]*?<\/Link>\s*<\/div>/,
  `<div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="flex items-center gap-2" aria-label="The Living Axis">
              <img 
                src={darkLogo} 
                alt="" 
                className="h-6 sm:h-8 w-auto object-contain" 
              />
              <span className="font-display font-medium text-lg sm:text-xl tracking-wide uppercase text-brand-espresso rounded-sm">
                The Living Axis
              </span>
            </Link>
        </div>`
);
fs.writeFileSync('src/pages/Book.tsx', book);
