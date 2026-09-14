# The Living Axis — Mockup 1

**Editorial Therapeutic Luxury** — the warm, editorial, practitioner-led direction.
Cormorant Garamond (display) + Work Sans (body). Asymmetric layouts, deep teal and
warm ivory, practitioner voice.

This is a **prototype**. It takes no payments, sends no messages, and schedules no
appointments. Every screen that could imply otherwise carries a permanent notice.

```bash
npm install
npm run dev            # placeholder photo mode by default
npm run build
npm run typecheck
npm run format:check   # verify formatting without rewriting
```

---

## Outstanding client inputs

Nothing below is invented anywhere in the build. Each item renders as a visibly
labelled pending placeholder until the client supplies it.

| # | Input | Blocks |
| --- | --- | --- |
| 1 | **Domain name + hosting decision** | `<link rel="canonical">`, `og:url`, `LocalBusiness.url`, and the business email address (which usually follows the domain). All four are **omitted, not faked**, until `VITE_SITE_URL` is set — see below. |
| 2 | **Business email address** | Footer and Contact page both show `Business Email — to be provided`. |
| 3 | **Professional credentials / licensing** | Footer and About. The word "licensed" appears nowhere in the build pending confirmation. |
| 4 | **Insurance details** | Footer and About. |
| 5 | **Space requirement** | FAQ pending row — *How much space do you need?* |
| 6 | **Setup duration** | FAQ pending row — *How long does setup take?* |
| 7 | **Equipment and supplies brought** | FAQ pending row. |
| 8 | **Travel pricing outside Brooklyn** | FAQ pending row. |
| 9 | **Booking lead time** | FAQ pending row — *How far in advance should I book?* |
| 10 | **Cancellation & rescheduling terms** | Policies block, marked pending. |
| 11 | **Refund terms** | Policies block, marked pending. |
| 12 | **Booking / payment platform** | Payment step is a labelled integration placeholder. |
| 13 | **Photography shoot** | All 13 image slots. See `credits.md`. |

Items 5–11 each exist because a fabricated claim was **removed** from the original
build. They are deliberately visible rows rather than silent holes, so nothing
quietly drops off the launch checklist.

---

## Environment variables

Copy `.env.example` to `.env`.

### `VITE_PHOTO_MODE`

| Value | Renders |
| --- | --- |
| `placeholder` (default) | Every slot is a labelled **empty frame** carrying the shot brief. The honest version. |
| `preview` | Treated stand-in photography. The dressed version, for presenting layouts. |

Both come from the same build, so either can be shown during a walkthrough. The two
**practitioner portrait slots stay empty in both modes** — a stock face there would
stand in for a specific real person. They render as a brand-textured frame with the
shot brief set inside.

### `VITE_SITE_URL`

Leave **empty** until a domain is confirmed. While empty, the build omits
`<link rel="canonical">` and `og:url` entirely rather than emitting a placeholder —
a canonical pointing at a domain that does not exist is acted on by crawlers and
link-preview services, so nothing is better than something. Setting it activates
canonical URLs, `og:url` and `LocalBusiness.url` with **no code change**.

---

## Replacing the photography

Edit **one file**: `src/data/imagePlaceholders.ts`. Components never hardcode a src,
alt, ratio or label — they render `<SiteImage slot="…" />`. Every slot has a fixed
`aspect-ratio`, so the swap causes **zero layout shift**.

To remove the placeholder grade, empty the single `.photo-grade` rule in
`src/index.css`. Nothing else in the codebase filters imagery.

Licences and attribution for every image: `credits.md`.

---

## Formatting (Prettier)

Prettier is pinned to an **exact version** (no caret) so the two mockup repos cannot
format differently. `npm run format:check` verifies without rewriting.

> **Note for reviewers:** a correction pass touched 13 files with formatting-only
> changes. That diff is **mechanical and non-functional** — no behaviour changed with
> it. The same `.prettierrc` must be applied to Mockup 2 *before* its parity
> corrections are run, otherwise whitespace noise will drown the real diff.

---

## Parity with Mockup 2

The two mockups are different visual directions for the **same business**. They must
never contradict each other on facts, flow logic, or what is collected from a visitor.

### Content parity — diff three files

Copy, prices, policies, notices, FAQ answers and image specs all live in:

- `src/data/content.ts`
- `src/data/imagePlaceholders.ts`
- `src/data/schema.ts`

A diff of those three catches every **content** divergence.

### Flow parity — run this checklist by hand

Those three files **cannot see flow parity**: which step collects which field, where a
disclosure is rendered, whether a control exists at all. Those decisions live in
components, so a divergence there returns a clean diff. Walk both builds side by side:

- [ ] Which booking step collects which fields — and specifically, does **neither**
      mockup request a full street address or apartment number before the deposit step?
- [ ] Which services are standalone-bookable versus add-on-only. Scalp Therapy,
      Reflexology and Body Scrub must be **both**, in both builds.
- [ ] Where the 50% deposit line appears — Services page, FAQ, and the pre-payment
      booking step, in both.
- [ ] Whether the brief intake block sits immediately before review, in both.
- [ ] Whether the payment module is a labelled placeholder with **no card form and no
      spinner**, in both.
- [ ] Whether the confirmation screen carries the prototype notice and **does not
      produce a real calendar event**, in both.
- [ ] Whether children/adolescent content appears **only** in FAQ and Policies, in both.
- [ ] Both builds load Cormorant Garamond + Work Sans, at the same weights.

---

## Guardrails that must stay intact

- No fabricated email, phone, licence number, insurance claim, credential,
  certification, school, years of practice, hygiene procedure, setup duration, space
  requirement, travel radius, cancellation term, refund term, response time,
  testimonial, rating or review count — anywhere in the codebase or rendered output.
- No AI-generated imagery. No minors, ever. No stock face for the practitioner.
- Brooklyn is unambiguously primary. No permanent public address appears anywhere.
- The personal phone number appears nowhere, including in comments and mock data.
- The word "licensed" is not used pending client confirmation.
- The children & adolescents policy appears **only** in the FAQ and Policies sections.
