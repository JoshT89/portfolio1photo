"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Aperture,
  ArrowUpRight,
  Check,
  Clock3,
  Globe2,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { startTransition, useEffect, useEffectEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "32", label: "signature stories shaped" },
  { value: "11", label: "countries booked from word of mouth" },
  { value: "72h", label: "first-select turnaround" },
];

const featuredLogos = [
  "Vogue Weddings",
  "Kinfolk",
  "Airbnb",
  "Soho House",
  "Monocle",
  "Aesop",
];

const collections = [
  {
    title: "Afterglow Ceremony",
    category: "Destination wedding",
    description:
      "Warm air, long fabric, and a sequence that starts soft before it lands hard.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    alt: "Couple walking together at an outdoor celebration during sunset.",
    panelClass: "xl:col-span-7 min-h-[31rem] xl:translate-y-8",
    sticker: "Collector's cut",
    stickerClass: "bg-[#d8ff62] text-[#0f1118]",
  },
  {
    title: "Night Issue",
    category: "Fashion editorial",
    description:
      "Tailored silhouettes, sharper shadows, and a mood that feels expensive without trying too hard.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    alt: "Fashion subject posing in a dramatic editorial setting.",
    panelClass: "xl:col-span-5 min-h-[25rem] xl:-translate-y-6",
    sticker: "New brief",
    stickerClass: "bg-white/85 text-[#0f1118]",
  },
  {
    title: "Salt Hotel",
    category: "Brand campaign",
    description:
      "Campaign imagery built for launches, menus, room drops, and a sharper digital presence.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    alt: "Open landscape used for a luxury brand campaign mood.",
    panelClass: "xl:col-span-4 min-h-[21rem]",
    sticker: "Campaign build",
    stickerClass: "bg-[#ff8f7d] text-white",
  },
  {
    title: "Soft Riot",
    category: "Portrait direction",
    description:
      "Close portraits with enough restraint to feel polished and enough attitude to stick.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    alt: "Close portrait of a woman with soft light and direct expression.",
    panelClass: "xl:col-span-4 min-h-[24rem] xl:-translate-y-10",
    sticker: "Identity refresh",
    stickerClass: "bg-[#6ad0d5] text-[#0f1118]",
  },
  {
    title: "Open Horizon",
    category: "Travel story",
    description:
      "Wide frames, breathing room, and the landscape cuts that make a gallery feel cinematic.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Coastline and cliffs in warm natural light.",
    panelClass: "xl:col-span-4 min-h-[21rem] xl:translate-y-4",
    sticker: "Location scout",
    stickerClass: "bg-white/85 text-[#0f1118]",
  },
];

const storyPoints = [
  "Full-bleed landing visuals instead of a polite centered hero.",
  "Offset cards and layered copy blocks so the page feels art-directed.",
  "Brighter accents and bolder type without losing premium clarity.",
  "A background system that keeps the page alive between sections.",
];

const services = [
  {
    title: "Destination Weddings",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wedding couple sharing a moment outdoors.",
    description:
      "Three-day coverage with editorial direction, documentary instinct, and a guest experience that still feels calm.",
    points: [
      "Timeline shaping and location scouting",
      "Hybrid candid and fashion-forward coverage",
      "Album design, prints, and launch-ready selects",
    ],
    accentClass: "bg-[#d8ff62] text-[#0f1118]",
    offsetClass: "xl:-translate-y-6",
  },
  {
    title: "Editorial Portraits",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    alt: "Woman smiling in a close portrait session.",
    description:
      "Portrait sessions for founders, artists, and public voices who need softness with authority.",
    points: [
      "Moodboards, wardrobe notes, and location casting",
      "Natural-light or studio direction",
      "Polished galleries built for press and social",
    ],
    accentClass: "bg-[#ff8f7d] text-white",
    offsetClass: "xl:translate-y-8",
  },
  {
    title: "Brand Campaigns",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    alt: "Editorial portrait used as a fashion campaign image.",
    description:
      "Campaign stills and launch visuals designed to travel cleanly across web, social, print, and decks.",
    points: [
      "Creative concepts and shot-list shaping",
      "Fast set coordination with a small team",
      "Web, press, and print-ready crops",
    ],
    accentClass: "bg-[#6ad0d5] text-[#0f1118]",
    offsetClass: "xl:-translate-y-2",
  },
];

const processSteps = [
  {
    title: "Mood first",
    copy:
      "The visual world gets built before the camera comes up: references, texture, palette, and pacing.",
  },
  {
    title: "Plan tightly",
    copy:
      "Timelines, location logic, and production details stay clean so the day never feels frantic.",
  },
  {
    title: "Direct lightly",
    copy:
      "Clients get just enough direction for shape and confidence, then room to stay recognizably themselves.",
  },
  {
    title: "Edit with discipline",
    copy:
      "The final gallery keeps believable skin, rich contrast, and a sequence that feels curated instead of dumped.",
  },
];

const testimonials = [
  {
    quote:
      "The gallery felt like a feature spread, not an event recap. Sharp taste, real emotion, zero stiffness.",
    name: "Camila & Jonas",
    role: "Destination wedding, Marrakech",
  },
  {
    quote:
      "Aurelia made our campaign feel more expensive than the actual production budget. That is the job.",
    name: "Elena Hart",
    role: "Founder, Atelier Nove",
  },
  {
    quote:
      "The portraits gave me a full visual identity I could use everywhere from keynote slides to press coverage.",
    name: "Dr. Naomi Wells",
    role: "Author and speaker",
  },
];

const journalEntries = [
  {
    title: "How to make a hero section feel cinematic instead of generic",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1400&q=80",
    alt: "Couple photographed in warm sunrise light.",
  },
  {
    title: "Why asymmetry makes portfolio sites feel more expensive",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative lifestyle scene photographed in daylight.",
  },
  {
    title: "The stock-image trick: choose frames with texture, distance, and motion",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    alt: "Bride and groom smiling together during a wedding moment.",
  },
];

function ActionLink({ href, variant = "ink", className, children }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
        variant === "neon" &&
          "bg-[#d8ff62] text-[#0f1118] shadow-[0_20px_40px_-24px_rgba(216,255,98,0.95)] hover:-translate-y-0.5 hover:bg-white",
        variant === "ghost" &&
          "border border-white/18 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/18",
        variant === "ink" &&
          "bg-[#0f1118] text-white shadow-[0_22px_44px_-28px_rgba(12,13,18,0.7)] hover:-translate-y-0.5 hover:bg-[#1c1f29]",
        variant === "paper" &&
          "border border-stone-900/10 bg-white/65 text-stone-900 backdrop-blur-md hover:-translate-y-0.5 hover:bg-white",
        className
      )}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  className,
}) {
  const isLight = tone === "light";

  return (
    <div className={cn("max-w-3xl", className)}>
      <Badge
        variant="outline"
        className={cn(
          "h-auto rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.35em]",
          isLight
            ? "border-white/14 bg-white/10 text-white/78"
            : "border-stone-900/10 bg-white/60 text-stone-700 backdrop-blur-md"
        )}
      >
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          "mt-5 font-display text-[clamp(2.9rem,6vw,5.3rem)] leading-[0.9] tracking-[-0.07em]",
          isLight ? "text-white" : "text-stone-950"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 max-w-2xl text-base leading-8 sm:text-lg",
          isLight ? "text-white/72" : "text-stone-700"
        )}
      >
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useEffectEvent(() => {
    const nextScrolled = window.scrollY > 36;

    startTransition(() => {
      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled
      );
    });
  });

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(242,108,92,0.14),transparent_24%),radial-gradient(circle_at_82%_10%,rgba(216,255,98,0.12),transparent_20%),radial-gradient(circle_at_74%_72%,rgba(106,208,213,0.14),transparent_26%)]" />
        <div className="absolute left-[-6rem] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[#ff8f7d]/18 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-[26rem] w-[26rem] rounded-full bg-[#6ad0d5]/18 blur-[140px]" />
      <div
          className="absolute inset-y-0 right-[-14rem] hidden w-[58rem] bg-contain bg-right-top bg-no-repeat opacity-35 mix-blend-multiply lg:block"
          style={{ backgroundImage: "url('/editorial-ribbons.svg')" }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "pt-3" : "pt-5"
        )}
      >
        <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "rounded-full border px-5 py-3 shadow-[0_26px_70px_-48px_rgba(12,13,18,0.75)] backdrop-blur-xl transition-all duration-300",
              isScrolled
                ? "border-stone-900/10 bg-[rgba(249,245,236,0.84)]"
                : "border-white/12 bg-[rgba(12,13,18,0.22)]"
            )}
          >
            <div className="flex items-center justify-between gap-6">
              <a href="#" className="flex items-end gap-3">
                <span
                  className={cn(
                    "font-display text-[1.9rem] leading-none tracking-[-0.04em] transition-colors duration-300",
                    isScrolled ? "text-stone-950" : "text-white"
                  )}
                >
                  Aurelia Vale
                </span>
                <span
                  className={cn(
                    "pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.35em] transition-colors duration-300",
                    isScrolled ? "text-stone-500" : "text-white/58"
                  )}
                >
                  photography
                </span>
              </a>

              <nav
                className={cn(
                  "hidden items-center gap-7 text-sm font-medium md:flex",
                  isScrolled ? "text-stone-700" : "text-white/78"
                )}
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors duration-300",
                      isScrolled ? "hover:text-stone-950" : "hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <ActionLink
                href="#contact"
                variant={isScrolled ? "ink" : "ghost"}
                className="hidden md:inline-flex"
              >
                Book a session
                <ArrowUpRight className="size-4" />
              </ActionLink>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap backdrop-blur-md transition-colors duration-300",
                    isScrolled
                      ? "border-stone-900/10 bg-white/72 text-stone-700"
                      : "border-white/14 bg-white/10 text-white/80"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-18">
        <section className="mx-auto max-w-[95rem] px-4 pt-4 sm:px-6 lg:px-8">
          <div className="hero-shell relative isolate overflow-hidden rounded-[2.9rem] border border-white/14 shadow-[0_56px_140px_-60px_rgba(12,13,18,0.85)]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=80"
                alt="A cinematic outdoor celebration used as the full landing-page background."
                className="h-full w-full object-cover object-center scale-[1.05]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(12,13,18,0.9)_0%,rgba(12,13,18,0.46)_44%,rgba(12,13,18,0.88)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,143,125,0.32),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(216,255,98,0.22),transparent_18%),radial-gradient(circle_at_70%_78%,rgba(106,208,213,0.22),transparent_24%)]" />
            </div>

            <div className="pointer-events-none absolute -left-20 top-24 hidden h-72 w-72 rounded-full border border-white/10 lg:block" />
            <div className="pointer-events-none absolute bottom-10 right-12 hidden h-56 w-56 rounded-full border border-white/10 lg:block" />

            <div className="relative grid min-h-[calc(100svh-1.5rem)] gap-14 px-6 pb-12 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-16 lg:pt-32">
              <div className="reveal flex flex-col justify-between">
                <div>
                  <Badge className="h-auto border border-white/14 bg-white/10 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.35em] text-white/84 backdrop-blur-md">
                    Editorial portfolio concept
                  </Badge>

                  <h1 className="mt-7 max-w-4xl font-display text-[clamp(4rem,10vw,8.75rem)] leading-[0.84] tracking-[-0.08em] text-white">
                    A portfolio that lands like a cover story.
                  </h1>

                  <p className="mt-7 max-w-xl text-lg leading-8 text-white/74 sm:text-xl">
                    Cinematic photographs for weddings, campaigns, and
                    portraits that want elegance, tension, and personality in
                    the same frame.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <ActionLink href="#work" variant="neon">
                      See the featured cuts
                      <ArrowUpRight className="size-4" />
                    </ActionLink>
                    <ActionLink href="#services" variant="ghost">
                      Browse signature services
                    </ActionLink>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/68">
                    {[
                      "editorial energy",
                      "luxury polish",
                      "human warmth",
                      "travel ready",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/12 bg-white/8 px-3 py-2 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                  <div className="section-panel max-w-xs rotate-[-3deg] rounded-[1.9rem] px-5 py-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                      Current rhythm
                    </p>
                    <p className="mt-3 font-display text-3xl leading-none text-stone-950">
                      London-based, Europe twice a month, last-minute travel
                      friendly.
                    </p>
                  </div>

                  <div className="ink-panel max-w-xs translate-y-2 rotate-[4deg] rounded-[1.9rem] px-5 py-5 text-white">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/54">
                      Recent brief
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/74">
                      Boutique hotel launch with stills for web, press kits,
                      menus, and a twelve-day social rollout.
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-delay-1 relative min-h-[32rem] lg:min-h-[42rem]">
                <Card className="photo-stack floating-card absolute right-0 top-0 w-[72%] overflow-hidden rounded-[2.5rem] border-none py-0">
                  <div className="relative h-[22rem] sm:h-[24rem] lg:h-[27rem]">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
                      alt="Close portrait used as part of the landing-page collage."
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/76 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/64">
                        Portrait direction
                      </p>
                      <p className="mt-3 font-display text-3xl leading-none">
                        Soft light, sharp presence.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="section-panel drift-card absolute left-0 top-[15%] z-20 w-[54%] -rotate-[8deg] rounded-[2rem] border-none py-6">
                  <CardContent className="px-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                      Field note
                    </p>
                    <p className="mt-3 font-display text-3xl leading-[0.95] text-stone-950">
                      Styled to feel alive, never overmanaged.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stone-700">
                      The goal is polish with a pulse. Strong enough for luxury
                      clients, loose enough to still feel human.
                    </p>
                  </CardContent>
                </Card>

                <Card className="photo-stack absolute left-[18%] bottom-[6%] z-10 w-[62%] -rotate-[5deg] overflow-hidden rounded-[2.3rem] border-none py-0">
                  <div className="relative h-[19rem] sm:h-[22rem] lg:h-[24rem]">
                    <img
                      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                      alt="Landscape photograph used to add atmosphere to the landing-page collage."
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/84 via-[#0f1118]/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/64">
                        Next routes
                      </p>
                      <p className="mt-3 font-display text-3xl leading-none">
                        Lisbon, Paris, Marrakech.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="ink-panel absolute bottom-0 right-0 z-30 w-[44%] rotate-[5deg] rounded-[1.9rem] border-none py-5 text-white">
                  <CardContent className="px-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/54">
                      Client note
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight">
                      &ldquo;It felt expensive, intimate, and a little rebellious.&rdquo;
                    </p>
                    <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/54">
                      Elena Hart / Atelier Nove
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
          <div className="section-panel -mt-12 rounded-[2.3rem] px-6 py-6 lg:-mt-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <Card
                    key={stat.label}
                    className={cn(
                      "border-none bg-white/66 py-5 shadow-[0_26px_64px_-52px_rgba(12,13,18,0.55)]",
                      index === 1 && "sm:translate-y-4"
                    )}
                  >
                    <CardContent className="px-5">
                      <p className="font-display text-4xl leading-none text-stone-950">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-4 border-t border-stone-900/10 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                  Published, commissioned, or quietly recommended by
                </p>
                <div className="flex flex-wrap gap-3">
                  {featuredLogos.map((logo) => (
                    <span
                      key={logo}
                      className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-stone-700"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="mx-auto max-w-[92rem] px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28"
        >
          <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr]">
            <div className="xl:sticky xl:top-28 h-fit">
              <SectionHeading
                eyebrow="Selected Work"
                title="Sequenced with more swagger than a standard grid."
                description="The portfolio now reads like a styled issue: louder first impression, bigger tonal shifts, and enough overlap to feel deliberate instead of modular."
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="#contact" variant="ink">
                  Start a commission
                  <ArrowUpRight className="size-4" />
                </ActionLink>
                <ActionLink href="#story" variant="paper">
                  Read the approach
                </ActionLink>
              </div>
            </div>

            <div className="grid auto-rows-[minmax(18rem,1fr)] gap-6 xl:grid-cols-12">
              {collections.map((collection) => (
                <Card
                  key={collection.title}
                  className={cn(
                    "photo-stack group relative overflow-hidden rounded-[2.3rem] border-none py-0",
                    collection.panelClass
                  )}
                >
                  <div className="absolute inset-0">
                    <img
                      src={collection.image}
                      alt={collection.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,13,18,0.04)_10%,rgba(12,13,18,0.86)_100%)]" />
                  </div>

                  <div className="absolute left-5 top-5 z-10">
                    <Badge
                      className={cn(
                        "h-auto rounded-full px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.32em]",
                        collection.stickerClass
                      )}
                    >
                      {collection.sticker}
                    </Badge>
                  </div>

                  <CardHeader className="relative z-10 mt-auto pt-48 text-white lg:pt-56">
                    <Badge className="h-auto w-fit border border-white/14 bg-white/10 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.32em] text-white/80 backdrop-blur-md">
                      {collection.category}
                    </Badge>
                    <CardTitle className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.04em] sm:text-5xl">
                      {collection.title}
                    </CardTitle>
                    <CardDescription className="max-w-md text-base leading-7 text-white/74">
                      {collection.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="relative z-10 border-t border-white/10 bg-transparent px-5 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                    View gallery sequence
                    <ArrowUpRight className="ml-2 size-4" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="story"
          className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
        >
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="ink-panel relative overflow-hidden rounded-[2.8rem] px-6 py-8 text-white lg:px-8 lg:py-10">
              <div className="pointer-events-none absolute -right-20 top-0 h-52 w-52 rounded-full bg-[#d8ff62]/18 blur-[110px]" />
              <div className="pointer-events-none absolute bottom-[-4rem] left-[-4rem] h-56 w-56 rounded-full bg-[#ff8f7d]/18 blur-[120px]" />

              <SectionHeading
                eyebrow="The Story"
                title="Elegant enough for luxury. Strange enough to be remembered."
                description="This version leans into editorial collage, sharper type, and a more alive background system while keeping the service language clear enough to sell."
                tone="light"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {storyPoints.map((point) => (
                  <Card
                    key={point}
                    className="border-none bg-white/7 py-5 text-white backdrop-blur-xl"
                  >
                    <CardContent className="flex items-start gap-3 px-5">
                      <span className="mt-1 rounded-full bg-[#d8ff62] p-2 text-[#0f1118]">
                        <Check className="size-4" />
                      </span>
                      <p className="text-sm leading-7 text-white/72">{point}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-8 bg-white/10" />

              <div className="flex flex-wrap gap-5 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[#d8ff62]" />
                  London / Paris / Worldwide
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4 text-[#d8ff62]" />
                  Replies within 24 hours
                </span>
                <span className="inline-flex items-center gap-2">
                  <Globe2 className="size-4 text-[#d8ff62]" />
                  Editorial, wedding, and campaign coverage
                </span>
              </div>
            </div>

            <div className="relative min-h-[36rem] lg:min-h-[40rem]">
              <Card className="photo-stack absolute left-0 top-0 w-[66%] -rotate-[5deg] overflow-hidden rounded-[2.5rem] border-none py-0">
                <div className="relative h-[22rem] lg:h-[30rem]">
                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
                    alt="Photographer portrait in soft fashion styling."
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/76 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/62">
                      Studio profile
                    </p>
                    <p className="mt-3 font-display text-3xl leading-none">
                      Aurelia Vale
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="section-panel absolute right-0 top-[14%] z-20 w-[46%] rotate-[6deg] rounded-[2rem] border-none py-6">
                <CardContent className="px-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                    Positioning line
                  </p>
                  <p className="mt-3 font-display text-3xl leading-[0.95] text-stone-950">
                    High taste. Clear systems. Zero template energy.
                  </p>
                </CardContent>
              </Card>

              <Card className="ink-panel absolute bottom-0 right-[8%] z-10 w-[60%] -rotate-[4deg] overflow-hidden rounded-[2.2rem] border-none py-0">
                <div className="relative h-[18rem]">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                    alt="Fashion model in the city wearing a coat."
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/84 via-[#0f1118]/22 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/60">
                      Visual temperature
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/74">
                      The page keeps one foot in luxury and one foot in
                      something more playful, which is what makes it stick.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
        >
          <SectionHeading
            eyebrow="Services"
            title="Offers with their own visual temperature."
            description="Each offer now sits inside a more characterful card system, so the page still feels cohesive even while each service has its own mood."
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={cn(
                  "section-panel relative overflow-hidden rounded-[2.4rem] border-none py-0",
                  service.offsetClass
                )}
              >
                <div className="absolute right-5 top-5 font-display text-7xl leading-none text-stone-900/8">
                  0{index + 1}
                </div>

                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/82 via-[#0f1118]/18 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <Badge
                      className={cn(
                        "h-auto rounded-full px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.32em]",
                        service.accentClass
                      )}
                    >
                      Signature offer
                    </Badge>
                  </div>
                </div>

                <CardHeader className="px-5 pt-5">
                  <CardTitle className="font-display text-4xl leading-[0.95] tracking-[-0.04em] text-stone-950">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-stone-700">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 px-5 pb-7">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full bg-stone-950 p-2 text-white">
                        <Sparkles className="size-4" />
                      </span>
                      <p className="text-sm leading-7 text-stone-700">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="ink-panel relative overflow-hidden rounded-[3rem] px-6 py-8 text-white lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute left-[-5rem] top-[-5rem] h-48 w-48 rounded-full bg-[#ff8f7d]/18 blur-[110px]" />
            <div className="pointer-events-none absolute right-[-3rem] top-1/3 h-52 w-52 rounded-full bg-[#6ad0d5]/18 blur-[120px]" />

            <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Process"
                title="The systems stay calm even when the visuals get loud."
                description="This section makes the page sell, not just decorate. The art direction may be bolder now, but the production logic is still easy to trust."
                tone="light"
              />

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {processSteps.map((step, index) => (
                  <Card
                    key={step.title}
                    className={cn(
                      "border-none bg-white/7 py-5 text-white backdrop-blur-xl",
                      index % 2 === 1 && "xl:translate-y-10"
                    )}
                  >
                    <CardHeader className="px-5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/50">
                        0{index + 1}
                      </span>
                      <CardTitle className="mt-3 font-display text-3xl leading-none text-white">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5">
                      <p className="text-sm leading-7 text-white/72">
                        {step.copy}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <SectionHeading
            eyebrow="Praise"
            title="Proof that the style still converts."
            description="The testimonial area now reads like pinned review cards instead of a row of identical boxes, which keeps the personality consistent all the way down the page."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={cn(
                  "section-panel relative rounded-[2.2rem] border-none py-6 shadow-[0_30px_80px_-58px_rgba(12,13,18,0.48)]",
                  index === 0 && "lg:rotate-[-2.5deg]",
                  index === 1 && "lg:-translate-y-6",
                  index === 2 && "lg:rotate-[2.5deg]"
                )}
              >
                <div
                  className={cn(
                    "absolute right-4 top-4 h-12 w-12 rounded-full blur-[2px]",
                    index === 0 && "bg-[#d8ff62]/55",
                    index === 1 && "bg-[#ff8f7d]/55",
                    index === 2 && "bg-[#6ad0d5]/55"
                  )}
                />

                <CardHeader className="px-5">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={`${testimonial.name}-${starIndex}`}
                        className="size-4 fill-current"
                      />
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="px-5">
                  <p className="font-display text-4xl leading-[0.98] tracking-[-0.04em] text-stone-950">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                    {testimonial.name}
                  </p>
                  <p className="mt-2 text-sm text-stone-600">
                    {testimonial.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="journal"
          className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
        >
          <SectionHeading
            eyebrow="Journal"
            title="A portfolio should keep moving after the scroll."
            description="The journal block now feels more like an editorial feature stack, which gives the homepage a stronger ending than three identical article cards."
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="section-panel group overflow-hidden rounded-[2.7rem] border-none py-0">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[23rem] overflow-hidden">
                  <img
                    src={journalEntries[0].image}
                    alt={journalEntries[0].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118]/74 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f1118]/10" />
                </div>

                <div className="flex flex-col justify-between px-6 py-6 lg:px-8 lg:py-8">
                  <div>
                    <Badge
                      variant="outline"
                      className="h-auto rounded-full border-stone-900/10 bg-white/70 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.32em]"
                    >
                      Featured note
                    </Badge>
                    <CardTitle className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.05em] text-stone-950">
                      {journalEntries[0].title}
                    </CardTitle>
                    <CardDescription className="mt-4 max-w-md text-base leading-7 text-stone-700">
                      A quick breakdown of what makes a homepage feel composed,
                      cinematic, and unmistakably intentional.
                    </CardDescription>
                  </div>

                  <CardFooter className="mt-8 border-stone-900/10 bg-transparent px-0 pb-0 pt-5 text-sm font-semibold uppercase tracking-[0.24em] text-stone-700">
                    Read the article
                    <ArrowUpRight className="ml-2 size-4" />
                  </CardFooter>
                </div>
              </div>
            </Card>

            <div className="grid gap-6">
              {journalEntries.slice(1).map((entry, index) => (
                <Card
                  key={entry.title}
                  className={cn(
                    "section-panel group overflow-hidden rounded-[2.2rem] border-none py-0",
                    index === 0 && "xl:translate-y-6"
                  )}
                >
                  <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="overflow-hidden">
                      <img
                        src={entry.image}
                        alt={entry.alt}
                        className="h-full min-h-[16rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col justify-between px-5 py-5">
                      <div>
                        <Badge
                          variant="outline"
                          className="h-auto rounded-full border-stone-900/10 bg-white/70 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.32em]"
                        >
                          Journal
                        </Badge>
                        <CardTitle className="mt-4 font-display text-4xl leading-[0.96] tracking-[-0.04em] text-stone-950">
                          {entry.title}
                        </CardTitle>
                      </div>

                      <CardFooter className="mt-6 border-stone-900/10 bg-transparent px-0 pb-0 pt-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-700">
                        Read the article
                        <ArrowUpRight className="ml-2 size-4" />
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-[92rem] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
        >
          <div className="relative isolate overflow-hidden rounded-[3rem] border border-white/14 shadow-[0_56px_130px_-62px_rgba(12,13,18,0.85)]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1800&q=80"
                alt="Creative portrait used for the contact section background."
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,13,18,0.92)_0%,rgba(12,13,18,0.52)_48%,rgba(12,13,18,0.86)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,143,125,0.24),transparent_22%),radial-gradient(circle_at_76%_24%,rgba(216,255,98,0.18),transparent_18%),radial-gradient(circle_at_82%_74%,rgba(106,208,213,0.2),transparent_24%)]" />
            </div>

            <div className="relative grid gap-8 px-6 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-10">
              <div className="flex flex-col justify-between">
                <div>
                  <Badge className="h-auto border border-white/14 bg-white/10 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.35em] text-white/84 backdrop-blur-md">
                    Contact
                  </Badge>
                  <h2 className="mt-6 max-w-xl font-display text-[clamp(3.1rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.07em] text-white">
                    Tell me the moodboard, the city, and the date.
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-8 text-white/74 sm:text-lg">
                    The layout is bolder now, but the contact flow stays simple:
                    mood, timeline, location, and enough context to shape the
                    next conversation properly.
                  </p>
                </div>

                <div className="mt-10 max-w-sm">
                  <div className="section-panel rotate-[-3deg] rounded-[2rem] px-5 py-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
                      Availability
                    </p>
                    <p className="mt-3 font-display text-3xl leading-[0.95] text-stone-950">
                      Summer and autumn 2026 commissions are open.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-3 text-sm text-white/76">
                  <p className="inline-flex items-center gap-3">
                    <Mail className="size-4 text-[#d8ff62]" />
                    hello@aureliavale.com
                  </p>
                  <p className="inline-flex items-center gap-3">
                    <Instagram className="size-4 text-[#d8ff62]" />
                    @aureliavalephoto
                  </p>
                  <p className="inline-flex items-center gap-3">
                    <Aperture className="size-4 text-[#d8ff62]" />
                    Available for destination, portrait, and campaign work
                  </p>
                </div>
              </div>

              <Card className="border-none bg-white/78 py-6 shadow-[0_30px_90px_-58px_rgba(12,13,18,0.62)] backdrop-blur-xl">
                <CardHeader className="px-6">
                  <Badge
                    variant="outline"
                    className="h-auto w-fit rounded-full border-stone-900/10 bg-white/72 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.32em]"
                  >
                    Inquiry form
                  </Badge>
                  <CardTitle className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.05em] text-stone-950">
                    Start with the mood, the date, and the location.
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-stone-700">
                    Keep the first contact short and useful. Enough details to
                    move fast, not so many fields that the form becomes work.
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6">
                  <form
                    action="mailto:hello@aureliavale.com"
                    method="post"
                    encType="text/plain"
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="h-12 rounded-[1.15rem] border-stone-900/10 bg-white/82 px-4 shadow-inner shadow-white/30"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="h-12 rounded-[1.15rem] border-stone-900/10 bg-white/82 px-4 shadow-inner shadow-white/30"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="text"
                        name="date"
                        placeholder="Event or launch date"
                        className="h-12 rounded-[1.15rem] border-stone-900/10 bg-white/82 px-4 shadow-inner shadow-white/30"
                      />
                      <Input
                        type="text"
                        name="location"
                        placeholder="City or destination"
                        className="h-12 rounded-[1.15rem] border-stone-900/10 bg-white/82 px-4 shadow-inner shadow-white/30"
                      />
                    </div>

                    <Textarea
                      name="brief"
                      placeholder="Tell me about the atmosphere, wardrobe, venue, or campaign direction you have in mind."
                      className="min-h-36 rounded-[1.6rem] border-stone-900/10 bg-white/82 px-4 py-3 shadow-inner shadow-white/30"
                    />

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#0f1118] px-6 text-white hover:bg-[#1c1f29]"
                      >
                        Send project brief
                      </Button>
                      <p className="text-sm text-stone-600">
                        Or email directly at hello@aureliavale.com
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
