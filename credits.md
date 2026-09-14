# Photography credits & licences — Mockup 1

Every image in this build is **placeholder photography**. None of it is the brand's own,
none of it is AI-generated, and all of it is intended to be replaced by the client's own
shoot.

## Rules this set follows

- **Free-licence photography only.** Every image below is published under the
  [Unsplash Licence](https://unsplash.com/license) — free to use commercially, no permission
  needed, no attribution required (attribution is recorded here anyway so the provenance of
  every file is traceable).
- **No AI-generated imagery.** The client rejected AI imagery by name. Nothing in this set
  was generated.
- **No stock face stands in for the practitioner.** The two practitioner portrait slots
  (`home-practitioner`, `about-portrait`) are deliberately left as empty labelled frames in
  *both* photo modes. A stock person there would stand in for a specific real individual.
- **No minors appear in any image**, and none may be added.
- **Excluded subjects:** candles, orchids, flower arrangements, folded-towel stacks,
  stacked stones.
- **At least one image of a male client mid-session** — `services-sports` is the priority
  image for the brief's gender-inclusivity goal, supported by `home-hero` and
  `find-treatment`.

## Where this lives in the code

| Concern | File |
| --- | --- |
| Every slot's src, alt, ratio, label, shot brief | `src/data/imagePlaceholders.ts` |
| The component that renders them | `src/components/SiteImage.tsx` |
| The single brand grade utility | `.photo-grade` in `src/index.css` |
| Placeholder / preview toggle | `VITE_PHOTO_MODE` (see `.env.example`) |

Replacing the entire photo set means editing **one file**: `src/data/imagePlaceholders.ts`.
Every slot has a fixed `aspect-ratio`, so the swap causes zero layout shift.

## Aspect ratios (shared with Mockup 2)

| Use | Ratio |
| --- | --- |
| Practitioner portrait | 4:5 |
| Treatment / detail imagery | 3:2 |
| Mobile setup | 16:9 |
| Small detail / texture | 1:1 |

## The images

| Slot | Photographer | Source | Licence |
| --- | --- | --- | --- |
| `home-hero` | yury kirillov | https://unsplash.com/photos/a-man-getting-a-back-massage-from-a-woman-UNRW1dD2xjI | Unsplash Licence |
| `home-setup` | Kimiya Sabbaghan | https://unsplash.com/photos/a-white-room-with-a-bed-and-a-desk-o4OJfrmMC0o | Unsplash Licence |
| `home-practitioner` | — | *Intentionally empty — practitioner identity slot* | — |
| `about-portrait` | — | *Intentionally empty — practitioner identity slot* | — |
| `about-hands` | Edward Muntinga | https://unsplash.com/photos/hands-pressing-back-in-massage-8qwYA4INVCk | Unsplash Licence |
| `about-setup` | Stuart Poulton | https://unsplash.com/photos/red-leather-padded-massage-bed-inside-building-Cyw1t03KMGk | Unsplash Licence |
| `services-neck-shoulder` | Toa Heftiba | https://unsplash.com/photos/person-massaging-the-back-of-a-woman-hBLf2nvp-Yc | Unsplash Licence |
| `services-prenatal` | Alicia Petresc | https://unsplash.com/photos/person-touching-stomach-c3KZP4azG6g | Unsplash Licence |
| `services-sports` | Performance Medicine | https://unsplash.com/photos/woman-giving-a-man-a-massage-on-a-table-OgzbUs-IntQ | Unsplash Licence |
| `services-reflexology` | Oswald Elsaboath | https://unsplash.com/photos/foot-massage-with-oil-nhEIkQVj0iI | Unsplash Licence |
| `find-treatment` | Alora Griffiths | https://unsplash.com/photos/man-in-white-sleeveless-top-WX7FSaiYxK8 | Unsplash Licence |
| `service-areas` | Zoshua Colah | https://unsplash.com/photos/colorful-townhouses-line-a-street-with-parked-cars-kMrhCnrbIFQ | Unsplash Licence |
| `what-to-expect-setup` | Ale Romo | https://unsplash.com/photos/person-receiving-back-massage-therapy-CLiwQXx7kT8 | Unsplash Licence |

Images are served from the Unsplash CDN (`images.unsplash.com`) with sizing parameters. No
image files are vendored into the repository.

## Open Graph image

`public/og-default.svg` is brand typography and geometry only — no photograph of a person.
An OG image travels further from the site than anything else on it, so it must not carry a
stand-in face.
