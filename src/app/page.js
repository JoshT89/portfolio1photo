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
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
  { value: "28", label: "countries photographed" },
  { value: "240+", label: "editorials, brands, and celebrations" },
  { value: "72h", label: "first-look preview delivery" },
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
    title: "Desert Afterglow",
    category: "Destination wedding",
    description:
      "A dusk-lit celebration in warm wind, layered linens, and candlelit stillness.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    alt: "Couple walking together during a warm outdoor celebration.",
    panelClass: "xl:col-span-7 xl:row-span-2 min-h-[34rem]",
  },
  {
    title: "Quiet Portraits",
    category: "Editorial portraiture",
    description:
      "Minimal styling, natural shadow, and close framing built for magazine pacing.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    alt: "Close portrait of a woman with soft window light.",
    panelClass: "xl:col-span-5 min-h-[22rem]",
  },
  {
    title: "City Lines",
    category: "Brand campaign",
    description:
      "Movement-first frames for fashion brands that want atmosphere, not catalog energy.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    alt: "Fashion model in the city wearing a tan coat.",
    panelClass: "xl:col-span-5 min-h-[24rem]",
  },
  {
    title: "Oceanside Notes",
    category: "Travel story",
    description:
      "Salt air, long shadows, and expansive landscapes that breathe between portraits.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Ocean and cliffs captured in warm light.",
    panelClass: "xl:col-span-4 min-h-[22rem]",
  },
  {
    title: "The Wedding Morning",
    category: "Documentary detail",
    description:
      "Hands, silk, florals, and the kind of anticipation that only exists before vows.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    alt: "Bride and groom smiling together during a wedding moment.",
    panelClass: "xl:col-span-4 min-h-[22rem]",
  },
  {
    title: "Night Issue",
    category: "Fashion editorial",
    description:
      "Cinematic styling and sculpted light for campaigns that need high-fashion direction.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    alt: "Fashion subject in a dramatic studio setup.",
    panelClass: "xl:col-span-4 min-h-[22rem]",
  },
];

const services = [
  {
    title: "Destination Weddings",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wedding couple sharing a moment outdoors.",
    description:
      "Three-day story coverage with refined direction, documentary instinct, and a polished guest experience.",
    points: [
      "Timeline shaping and location scouting",
      "Hybrid editorial and candid coverage",
      "Luxury album design and print curation",
    ],
  },
  {
    title: "Editorial Portraits",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    alt: "Woman smiling in a close portrait session.",
    description:
      "Portrait sessions for founders, artists, and public voices who need photographs with authority and softness.",
    points: [
      "Moodboards and wardrobe guidance",
      "Studio or natural-light direction",
      "Art-directed gallery selects",
    ],
  },
  {
    title: "Brand Campaigns",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    alt: "Person standing near an open landscape during golden hour.",
    description:
      "Campaign imagery and launch visuals built to travel across web, social, print, and press kits.",
    points: [
      "Creative concept and shot list design",
      "Fast team coordination on set",
      "Web, social, and print-ready crops",
    ],
  },
];
const processSteps = [
  {
    title: "Creative direction",
    copy:
      "We shape a visual world first: references, textures, color cues, and how the final gallery should feel in motion.",
  },
  {
    title: "Calm production",
    copy:
      "Every shoot runs with a quiet rhythm. Timelines stay tight, and the atmosphere stays human and unhurried.",
  },
  {
    title: "Precise editing",
    copy:
      "Skin remains believable, tones stay rich, and every frame is graded for consistency across the full story.",
  },
  {
    title: "Refined delivery",
    copy:
      "Your photographs arrive in curated sequences built for web launches, print pieces, albums, and long-term archives.",
  },
];

const testimonials = [
  {
    quote:
      "The gallery felt like a feature story, not a wedding recap. Every image had shape, emotion, and restraint.",
    name: "Camila & Jonas",
    role: "Destination wedding, Marrakech",
  },
  {
    quote:
      "Aurelia understood our campaign instantly. The photos made the brand feel expensive, intimate, and alive.",
    name: "Elena Hart",
    role: "Founder, Atelier Nove",
  },
  {
    quote:
      "The portraits gave me a signature visual identity I could use everywhere, from press releases to keynote decks.",
    name: "Dr. Naomi Wells",
    role: "Author and speaker",
  },
];

const journalEntries = [
  {
    title: "How to build a sunrise session that feels cinematic, not staged",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple photographed in golden sunrise light.",
  },
  {
    title: "What luxury brands need from campaign photography in 2026",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    alt: "Editorial portrait with warm tones and natural styling.",
  },
  {
    title: "My framework for blending documentary coverage with editorial polish",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    alt: "Photographer-style lifestyle image in bright daylight.",
  },
];

function ActionLink({ href, variant = "default", className, children }) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "h-12 rounded-full px-5 text-sm font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5",
        variant === "default" &&
          "bg-stone-950 text-stone-50 hover:bg-stone-800",
        variant === "outline" &&
          "border-stone-300/70 bg-white/60 text-stone-900 backdrop-blur-sm hover:bg-white",
        className
      )}
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <Badge
        variant="outline"
        className="border-stone-300/70 bg-white/60 px-3 py-1 tracking-[0.28em] uppercase"
      >
        {eyebrow}
      </Badge>
      <h2 className="mt-5 font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const scrollTimeoutRef = useRef(null);
  const [{ isScrolled, isScrolling }, setHeaderState] = useState({
    isScrolled: false,
    isScrolling: false,
  });

  const handleScroll = useEffectEvent(() => {
    const nextScrolled = window.scrollY > 24;

    window.clearTimeout(scrollTimeoutRef.current);

    startTransition(() => {
      setHeaderState({
        isScrolled: nextScrolled,
        isScrolling: true,
      });
    });

    scrollTimeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        setHeaderState({
          isScrolled: window.scrollY > 24,
          isScrolling: false,
        });
      });
    }, 180);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-rose-200/20 blur-3xl" />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,opacity,box-shadow,backdrop-filter] duration-300 ease-out will-change-transform",
          isScrolling &&
            "border-b border-white/15 bg-[rgba(247,241,233,0.28)] opacity-80 shadow-none backdrop-blur-sm",
          !isScrolling && isScrolled &&
            "border-b border-white/45 bg-[rgba(247,241,233,0.74)] opacity-100 shadow-[0_18px_60px_-38px_rgba(57,42,28,0.48)] backdrop-blur-xl",
          !isScrolling && !isScrolled &&
            "border-b border-transparent bg-[rgba(247,241,233,0.82)] opacity-100 backdrop-blur-lg"
        )}
        style={{ transform: `translateY(${isScrolling ? 26 : isScrolled ? 12 : 0}px)` }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <a href="#" className="flex items-end gap-3">
            <span className="font-display text-3xl leading-none tracking-tight text-stone-950">
              Aurelia Vale
            </span>
            <span className="pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-stone-500">
              Photography
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-700 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-stone-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ActionLink href="#contact" className="hidden md:inline-flex">
            Book a session
            <ArrowUpRight className="size-4" />
          </ActionLink>
        </div>

        <div
          className={cn(
            "border-t transition-[border-color,opacity] duration-300 md:hidden",
            isScrolling ? "border-white/15 opacity-75" : "border-white/50 opacity-100"
          )}
        >
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 lg:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-stone-300/70 bg-white/65 px-4 py-2 text-sm font-medium whitespace-nowrap text-stone-700 backdrop-blur-sm transition-colors hover:text-stone-950"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 lg:pt-6">
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-20">
          <div className="reveal">
            <Badge className="bg-stone-950 px-3 py-1 tracking-[0.25em] uppercase text-stone-50">
              Photography Portfolio Concept
            </Badge>

            <h1 className="mt-6 max-w-5xl font-display text-[clamp(4.25rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.045em] text-stone-950">
              Cinematic photographs with human warmth and editorial precision.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
              Destination weddings, luxury brand stories, and portraits shaped
              with restrained direction, rich tone, and magazine-level detail.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="#work">
                Explore the work
                <ArrowUpRight className="size-4" />
              </ActionLink>
              <ActionLink href="#services" variant="outline">
                View signature services
              </ActionLink>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className={cn(
                    "section-panel border-none py-6 shadow-[0_24px_70px_-45px_rgba(50,38,29,0.45)]",
                    index === 0 && "reveal reveal-delay-1",
                    index === 1 && "reveal reveal-delay-2",
                    index === 2 && "reveal reveal-delay-3"
                  )}
                >
                  <CardContent className="px-5">
                    <p className="font-display text-4xl text-stone-950">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-stone-500">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative min-h-[34rem] lg:min-h-[46rem]">
            <Card className="image-shadow absolute inset-x-0 left-6 top-0 overflow-hidden rounded-[2.5rem] border-none py-0">
              <div className="relative h-[31rem] lg:h-[42rem]">
                <img
                  src="https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1600&q=80"
                  alt="Couple embracing in warm natural light."
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <Badge className="bg-white/90 text-stone-950">
                    Signature frame
                  </Badge>
                  <p className="mt-4 max-w-sm font-display text-3xl leading-tight text-white lg:text-4xl">
                    Light that feels expensive. Direction that feels effortless.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="image-shadow absolute -bottom-2 left-0 hidden w-56 overflow-hidden rounded-[2rem] border-none py-0 sm:block">
              <div className="relative h-72">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                  alt="Close portrait with natural smile."
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-display text-2xl">Portraits</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/75">
                    intimate and editorial
                  </p>
                </div>
              </div>
            </Card>

            <Card className="image-shadow absolute -right-2 top-14 hidden w-64 overflow-hidden rounded-[2rem] border-none py-0 lg:block floating-card">
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80"
                  alt="Fashion editorial portrait."
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-display text-2xl">Editorials</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/75">
                    fashion, beauty, campaigns
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="section-panel px-6 py-5 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
                Trusted by teams and publications shaped like
              </span>
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-700">
                {featuredLogos.map((logo, index) => (
                  <div key={logo} className="flex items-center gap-4">
                    <span>{logo}</span>
                    {index !== featuredLogos.length - 1 && (
                      <span className="text-stone-300">.</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24"
        >
          <SectionHeading
            eyebrow="Signature Work"
            title="A portfolio built like a collector's issue."
            description="Each gallery feels intentionally sequenced: strong openers, breathing room between frames, and an image rhythm designed to hold attention longer than a standard grid."
          />

          <div className="mt-12 grid auto-rows-[minmax(16rem,1fr)] gap-6 xl:grid-cols-12">
            {collections.map((collection, index) => (
              <Card
                key={collection.title}
                className={cn(
                  "group section-panel relative overflow-hidden rounded-[2.2rem] border-none py-0",
                  collection.panelClass,
                  index < 3 && "reveal",
                  index >= 3 && "reveal reveal-delay-1"
                )}
              >
                <div className="absolute inset-0">
                  <img
                    src={collection.image}
                    alt={collection.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent" />
                </div>
                <CardHeader className="relative z-10 mt-auto pt-48 text-white lg:pt-56">
                  <Badge className="w-fit bg-white/18 text-white backdrop-blur-sm">
                    {collection.category}
                  </Badge>
                  <CardTitle className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                    {collection.title}
                  </CardTitle>
                  <CardDescription className="max-w-md text-base leading-7 text-white/78">
                    {collection.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative z-10 border-none bg-transparent pt-0 text-white/72">
                  View gallery sequence
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="story"
          className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24"
        >
          <div className="reveal section-panel relative overflow-hidden rounded-[2.4rem] p-3">
            <div className="relative h-full min-h-[28rem] overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
                alt="Photographer portrait in soft fashion styling."
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white lg:p-8">
                <p className="font-display text-4xl">Aurelia Vale</p>
                <p className="mt-2 max-w-sm text-sm uppercase tracking-[0.28em] text-white/75">
                  Based in London, available wherever the light is right
                </p>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <SectionHeading
              eyebrow="The Story"
              title="Designed for clients who want elegance without stiffness."
              description="This concept positions the photographer as both artist and operator: editorial taste up front, then clear trust signals, calm process notes, and polished service language underneath."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Magazine-inspired sequencing instead of a basic thumbnail wall.",
                "Large-format imagery that gives stock photography a luxury presence.",
                "Trust-first copywriting that works for weddings, portraits, and brand shoots.",
                "A soft, warm visual system that feels premium on desktop and mobile.",
              ].map((point) => (
                <Card
                  key={point}
                  className="section-panel border-none py-5 shadow-[0_24px_70px_-45px_rgba(50,38,29,0.45)]"
                >
                  <CardContent className="flex items-start gap-3 px-5">
                    <span className="mt-1 rounded-full bg-amber-100 p-2 text-stone-900">
                      <Check className="size-4" />
                    </span>
                    <p className="text-sm leading-7 text-stone-700">{point}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="section-panel mt-8 p-6 lg:p-8">
              <p className="font-display text-3xl leading-tight text-stone-950">
                &ldquo;I don&apos;t chase trends. I build photographs that still feel alive
                when you return to them years later.&rdquo;
              </p>
              <Separator className="my-6 bg-stone-300/70" />
              <div className="flex flex-wrap gap-5 text-sm text-stone-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-stone-900" />
                  London / Paris / Worldwide
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4 text-stone-900" />
                  Replies within 24 hours
                </span>
                <span className="inline-flex items-center gap-2">
                  <Globe2 className="size-4 text-stone-900" />
                  Editorial, wedding, and campaign coverage
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24"
        >
          <SectionHeading
            eyebrow="Services"
            title="Three revenue-ready offers, each with a distinct visual mood."
            description="The site is designed to convert across multiple photography verticals without feeling generic, so it can work as a showcase piece for your own web design business."
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={cn(
                  "group section-panel relative overflow-hidden rounded-[2.1rem] border-none py-0",
                  index === 1 && "xl:-translate-y-4"
                )}
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/45 to-stone-950/10" />
                </div>
                <CardHeader className="relative z-10 pt-56 text-white">
                  <Badge className="w-fit bg-white/18 text-white backdrop-blur-sm">
                    Signature offer
                  </Badge>
                  <CardTitle className="mt-4 font-display text-3xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-white/78">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-3 pb-8 text-white/82">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Sparkles className="mt-1 size-4 text-amber-200" />
                      <p className="text-sm leading-7">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="section-panel px-6 py-8 lg:px-8 lg:py-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Process"
                title="Beautiful work usually comes from calm systems."
                description="This part proves professionalism, not just taste. It is useful when you show the site to potential website clients because it demonstrates conversion-focused structure."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <Card
                    key={step.title}
                    className="border-none bg-white/72 py-5 shadow-[0_24px_70px_-48px_rgba(50,38,29,0.35)]"
                  >
                    <CardHeader className="px-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
                        0{index + 1}
                      </span>
                      <CardTitle className="mt-3 font-display text-3xl text-stone-950">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5">
                      <p className="text-sm leading-7 text-stone-700">
                        {step.copy}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
          <SectionHeading
            eyebrow="Praise"
            title="Social proof that feels curated, not cluttered."
            description="Testimonials sit inside soft editorial cards so they feel part of the design language rather than an afterthought."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="section-panel border-none py-6 shadow-[0_24px_70px_-45px_rgba(50,38,29,0.35)]"
              >
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
                  <p className="font-display text-3xl leading-tight text-stone-950">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
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
          className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24"
        >
          <SectionHeading
            eyebrow="Journal"
            title="A final section that makes the site feel alive."
            description="Editorial notes, behind-the-scenes thinking, and educational articles give the portfolio repeat-visit potential and stronger SEO surfaces."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {journalEntries.map((entry) => (
              <Card
                key={entry.title}
                className="group section-panel overflow-hidden rounded-[2rem] border-none py-0"
              >
                <div className="overflow-hidden">
                  <img
                    src={entry.image}
                    alt={entry.alt}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="px-5 pt-5">
                  <Badge
                    variant="outline"
                    className="w-fit border-stone-300/70 bg-white/60 uppercase tracking-[0.28em]"
                  >
                    Journal
                  </Badge>
                  <CardTitle className="mt-3 font-display text-3xl leading-tight text-stone-950">
                    {entry.title}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="border-stone-200/70 bg-transparent px-5 py-5 text-sm font-semibold uppercase tracking-[0.22em] text-stone-600">
                  Read the article
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 pb-18 lg:px-8 lg:pb-28"
        >
          <div className="section-panel overflow-hidden rounded-[2.6rem] p-4 lg:p-5">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1400&q=80"
                  alt="Creative portrait used for the contact call to action."
                  className="h-full min-h-[24rem] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                  <Badge className="bg-white/18 text-white backdrop-blur-sm">
                    Let&apos;s make something lasting
                  </Badge>
                  <h2 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">
                    A site like this turns &ldquo;nice portfolio&rdquo; into &ldquo;I want this
                    for my brand.&rdquo;
                  </h2>
                  <div className="mt-8 space-y-3 text-sm text-white/78">
                    <p className="inline-flex items-center gap-3">
                      <Mail className="size-4" />
                      hello@aureliavale.com
                    </p>
                    <p className="inline-flex items-center gap-3">
                      <Instagram className="size-4" />
                      @aureliavalephoto
                    </p>
                    <p className="inline-flex items-center gap-3">
                      <Aperture className="size-4" />
                      Available for 2026 commissions
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-none bg-white/78 py-6 shadow-[0_24px_80px_-50px_rgba(50,38,29,0.35)]">
                <CardHeader className="px-6">
                  <Badge
                    variant="outline"
                    className="w-fit border-stone-300/70 bg-white/65 uppercase tracking-[0.28em]"
                  >
                    Inquiry form
                  </Badge>
                  <CardTitle className="mt-4 font-display text-4xl leading-tight text-stone-950">
                    Start with the mood, the date, and the location.
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-stone-700">
                    This form is intentionally simple and premium. It keeps the
                    barrier to inquiry low while still collecting useful
                    project context.
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
                        className="h-12 rounded-2xl border-stone-300/70 bg-white/80 px-4"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="h-12 rounded-2xl border-stone-300/70 bg-white/80 px-4"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="text"
                        name="date"
                        placeholder="Event or launch date"
                        className="h-12 rounded-2xl border-stone-300/70 bg-white/80 px-4"
                      />
                      <Input
                        type="text"
                        name="location"
                        placeholder="City or destination"
                        className="h-12 rounded-2xl border-stone-300/70 bg-white/80 px-4"
                      />
                    </div>
                    <Textarea
                      name="brief"
                      placeholder="Tell me about the atmosphere, wardrobe, venue, or campaign direction you have in mind."
                      className="min-h-36 rounded-[1.6rem] border-stone-300/70 bg-white/80 px-4 py-3"
                    />
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-stone-950 px-6 text-stone-50 hover:bg-stone-800"
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





