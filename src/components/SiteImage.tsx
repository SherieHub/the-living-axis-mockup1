import { cn } from '../lib/utils';
import {
  imageSlots,
  PHOTO_MODE,
  PLACEHOLDER_CHIP,
  type AspectRatio,
  type ImageSlot,
  type ImageSlotId,
} from '../data/imagePlaceholders';

/**
 * Renders one image slot from src/data/imagePlaceholders.ts.
 *
 * Components never pass a src, alt, ratio or label — they pass a slot id, and
 * every detail is read from the registry. Replacing the entire photo set when
 * the real shoot lands means editing that one file.
 *
 * Two render modes, driven by VITE_PHOTO_MODE:
 *   placeholder (default) — labelled empty frame carrying the shot brief
 *   preview               — the treated stand-in photography
 *
 * Practitioner slots stay empty in BOTH modes: a stock person's face there
 * would stand in for a specific real individual.
 */

const aspectClasses: Record<AspectRatio, string> = {
  '16:9': 'aspect-[16/9]',
  '3:2': 'aspect-[3/2]',
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
};

interface SiteImageProps {
  slot: ImageSlotId;
  className?: string;
  /** Sits on a dark ground (deep teal / espresso) — flips the chip colours. */
  dark?: boolean;
  /** Hints the browser to fetch this one immediately (above-the-fold heroes). */
  priority?: boolean;
}

export function SiteImage({ slot, className, dark = false, priority = false }: SiteImageProps) {
  const spec: ImageSlot = imageSlots[slot];
  const ratioClass = aspectClasses[spec.aspectRatio];

  // Practitioner slots ignore photo mode entirely and always stay empty.
  const showPhoto = PHOTO_MODE === 'preview' && !!spec.src && !spec.practitionerSlot;

  const chipSpec = `${spec.label} · ${spec.aspectRatio}`;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm isolate',
        ratioClass,
        /* An empty frame paints its own OPAQUE ground rather than a translucent
           tint. A tint borrows whatever section sits behind it, which left the
           shot brief unreadable wherever a slot lands on the deep-teal or
           espresso sections — and makes the placeholder set look inconsistent
           from page to page. Photo slots keep the tint as a loading ground. */
        showPhoto ? (dark ? 'bg-brand-teal/20' : 'bg-brand-eucalyptus/20') : 'bg-[#E6DFD0]',
        className
      )}
    >
      {showPhoto ? (
        <>
          <img
            src={spec.src}
            alt={spec.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            /* photo-grade is the single brand treatment utility — empty that one
               rule in index.css to strip the grade from every image at once. */
            className="photo-grade absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="photo-grade-wash pointer-events-none absolute inset-0" />
        </>
      ) : (
        /* Empty frame: the honest version. Carries the shot brief so the
           client's photographer can shoot straight from the mockup. */
        <div
          role="img"
          aria-label={`Image placeholder. ${spec.label}, ${spec.aspectRatio}. Shot brief: ${spec.shotBrief}`}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
        >
          <p
            aria-hidden="true"
            className="max-w-md text-center font-display italic leading-relaxed text-base text-brand-espresso/75 md:text-lg"
          >
            {spec.shotBrief}
          </p>
        </div>
      )}

      {/* Hairline frame so the slot reads as a deliberate, reserved box. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-sm border',
          !showPhoto || !dark ? 'border-brand-teal/15' : 'border-brand-ivory/15'
        )}
      />

      {/* PERMANENT placeholder chip. Do not remove while this build is a
          mockup — it is what keeps the stand-in photography visibly
          replaceable rather than quietly becoming the brand.
          Top-left, not bottom: several layouts overlap the lower edge of an
          image slot with an offset text block, which would cover it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 m-2 max-w-[calc(100%-1rem)] rounded-sm bg-brand-ivory px-2 py-1 text-[12px] leading-tight text-brand-espresso shadow-sm"
      >
        <span className="block font-semibold">{PLACEHOLDER_CHIP}</span>
        <span className="block opacity-70">{chipSpec}</span>
      </div>
    </div>
  );
}
