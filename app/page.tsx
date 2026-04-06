import { HandHeart, Pin, Gift, Users } from "lucide-react";

export default function Page() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <HeroSection />
      <HowItWorksSection />
      <ImpactSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="flex scroll-mt-20" id="mission">
      <div className="lg:w-1/2 z-10 text-left">
        <span className="inline-block text-tertiary font-label text-xs tracking-[0.2em] mb-4">
          ESTABLISHING THE STEWARDSHIP
        </span>
        <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tight mb-8">
          Turn <span className="text-primary italic">Pollution</span> <br />{" "}
          into <br /> Participation.
        </h1>
        <p className="text-lg lg:text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
          Empowering local communities to reclaim their landscapes through
          collective action, digital mapping, and meaningful rewards.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold editorial-shadow flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Start Pinning
          </button>
          <button className="bg-neutral-300 text-on-surface px-8 py-4 rounded-xl font-semibold transition-all hover:bg-surface-container-high hover:scale-105 hover:shadow-lg">
            View Live Map
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 relative mt-12 lg:mt-0">
        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square">
          {/* Main Image with Bleed */}
          <div className="absolute inset-0 bg-surface-container-low rounded-4xl overflow-hidden rotate-3 scale-105"></div>
          <img
            alt="Community clean up"
            className="absolute inset-0 w-full h-full object-cover rounded-4xl editorial-shadow -rotate-2 transition-transform hover:rotate-0 duration-700"
            data-alt="Close-up of diverse community volunteers hands together holding soil and a small green plant sapling in a sunlit garden"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKx-0xa78bUf65_AfJsx1P-Elqy4ijxQw4lVYAzJDWWw3xivr3kWQZRQn0I_n6f2b4ZgUr3t8SQteWQA9kcXhrSl4yk5TG5RraeElBw7jbxmgx3ahikil6Sxu3hBSq4fQ-GC7sf6AFUnbg98btoXSE94pGD4f86Gp-6pH_cI5B-bYYj4pSuEF-UqiA65ScRBkLypDHh-HVCkmqKdC21wMdd0QbWdR1--kIvneDSKpbiJhevBdCzpJkNfDz2j-_Mv7GU6B2_4LOY3A"
          />
          {/* Floating Card */}
          <div className="bg-white absolute -bottom-10 -left-6 lg:-left-20 p-6 rounded-xl editorial-shadow max-w-xs animate-float border border-primary/5">
            <div className="flex items-center gap-4 mb-3">
              <HandHeart className="text-white bg-primary rounded-full w-10 h-10 p-2" />
              <div>
                <div className="text-sm font-bold font-headline">New Event</div>
                <div className="text-xs text-on-surface-variant">
                  Paljor Stadium Cleanup • 2h ago
                </div>
              </div>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-zinc-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-zinc-300"></div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-zinc-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary text-[10px] text-white flex items-center justify-center">
                +24
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const iconStyle =
    "material-symbols-outlined text-3xl text-primary group-hover:text-on-primary group-hover:text-white transition-colors";
  return (
    <section className="bg-surface-container-low py-24 mt-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-4">
            The Stewardship Journey
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Three simple steps to transform your neighborhood from a waste site
            to a community pride point.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl editorial-shadow hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Pin className={iconStyle} />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">1. Pin</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Found an illegal dump or overflowing bin? Tag waste hotspots on
              our interactive map with a photo and location.
            </p>
            <div className="h-40 w-full rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img
                className="w-full h-full object-cover"
                data-alt="A digital map display on a smartphone held by a hand in an urban outdoor setting with soft bokeh background"
                data-location="Mumbai"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFKYslz0oLKLqW-awFq_TYO-leBlcVZZsV0BPyz388AEnD_gTuwcUmwButcUh9CJJr4PZ8U37REEaQwff7MOq7bPZD_c6GlbsG7JXVxg38sKsUc3h9-5sQx6ibp7Mi6OqA1n47Ani52lhfou0j9gtr_Izs9HpmkdW3VQ2YvaOVOpfYQfT47qpqAQgXsjx3kS3UXYwxDvdZQ_C0ERv33fQUOQAfawGD3AWcXM6SduqbC0OGIwQE3pGjyUsYuA1sRMJR_SJcsnKkAvA"
              />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl editorial-shadow hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Users className={iconStyle} />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">2. Clean</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Organize or join local cleanup events. We provide the digital
              toolkit and connect you with local waste management units.
            </p>
            <div className="h-40 w-full rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img
                className="w-full h-full object-cover"
                data-alt="Group of diverse volunteers wearing green vests picking up plastic waste on a scenic beach at sunrise"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWGHGs7YCH1Q43JhEJDyYsyfwW7ceXzOIMHuaeI8yq68oLh5gBmutMB4GqM0X0Bg2HgjC8aTJbNdExTumtENTzwXjgc19hLzukMMQ27Sy446MhsxWDnz14rFpvXmHyshTpJkAN5vnDV4FpoeOzzouzhQhwYtsVt8Z98b_gGybfdoQPmjw7px7CeWinaKwhKyOS6aUvCxXd6_4O3hR53W3cUQRLbRXFZZD3Egvx7qIY5N9VK09t_pTmjAUxhEEZWunPKcenHO5Un1Y"
              />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl editorial-shadow hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Gift className={iconStyle} />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">3. Reward</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Earn points for every action. Redeem them for local eco-rewards,
              sustainable products, or donate them to green NGOs.
            </p>
            <div className="h-40 w-full rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img
                className="w-full h-full object-cover"
                data-alt="Close-up of high-quality sustainable products like bamboo toothbrushes and organic cotton bags on a clean white background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXkNw2ovTunD6zA06MeTMvfvSOXUxBvsk2LSqjbE8KGNrQQmOvjYqndmT1wRyM4p1-1jmPpyRqFle0bzBNuuLAvkbgUrGRcA1-F35MFIUAeoj5ZE05VZ4lImfRaZBmw4ic1ae6q1peDQ3JcGgeNMwxisP1cmyDBFG0RWn5tdWuzjn1tWPDUCm4cSvWzEI6dQXR0dguMcGKPTTKT0533bckqiKwuGsYG0Krggn45ec1xhb5FCbpte15Kn6A7I-z0Dadnt9KS9iiJ-U"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="impact">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-headline font-extrabold mb-6 leading-tight">
            Quantifying our <br />
            <span className="text-tertiary">Collective Impact</span>
          </h2>
          <p className="text-on-surface-variant mb-8">
            Numbers only tell half the story. The rest is found in cleaner
            streets, healthier oceans, and stronger community bonds.
          </p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          <div className="p-10 bg-surface-container rounded-4xl text-center">
            <div className="text-5xl font-headline font-extrabold text-primary mb-2">
              12,450+
            </div>
            <div className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
              Pinned Locations
            </div>
          </div>
          <div className="p-10 bg-primary text-on-primary rounded-4xl text-center transform scale-105 editorial-shadow">
            <div className="text-5xl font-headline font-extrabold mb-2">
              3,200+
            </div>
            <div className="text-sm font-label uppercase tracking-widest opacity-80">
              Completed Cleanups
            </div>
          </div>
          <div className="p-10 bg-surface-container rounded-4xl text-center">
            <div className="text-5xl font-headline font-extrabold text-primary mb-2">
              85,000+
            </div>
            <div className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
              Active Volunteers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20" id="call-to-action">
      <div className="relative bg-primary-container rounded-[2.5rem] overflow-hidden p-12 lg:p-24 text-center">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #0f5238 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-on-primary-fixed mb-8 max-w-2xl mx-auto">
            Ready to steward your surroundings?
          </h2>
          <p className="text-on-primary-fixed-variant mb-12 max-w-xl mx-auto text-lg">
            Join thousands of citizens across the nation making sustainability a
            daily ritual.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/login"
              className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold editorial-shadow hover:scale-105 transition-transform"
            >
              Join The Movement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 w-full py-12 px-6 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between items-start max-w-7xl mx-auto gap-12 lg:gap-0">
        <div className="space-y-4">
          <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100 font-headline">
            CleanUpSikkim
          </div>
          <p className="font-['Be_Vietnam_Pro'] text-sm leading-relaxed text-zinc-500 max-w-xs">
            © 2026 CleanUpSikkim.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 lg:gap-16">
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-emerald-800 dark:text-emerald-400 text-sm uppercase tracking-widest">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-['Be_Vietnam_Pro'] text-sm hover:translate-x-1 transition-transform inline-block"
                  href="#"
                >
                  Map Explorer
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-['Be_Vietnam_Pro'] text-sm hover:translate-x-1 transition-transform inline-block"
                  href="#"
                >
                  Reward Shop
                </a>
              </li>
              <li>
                <a
                  className="text-emerald-700 dark:text-emerald-300 underline font-['Be_Vietnam_Pro'] text-sm"
                  href="#"
                >
                  Impact Report
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-emerald-800 dark:text-emerald-400 text-sm uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-['Be_Vietnam_Pro'] text-sm hover:translate-x-1 transition-transform inline-block"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-['Be_Vietnam_Pro'] text-sm hover:translate-x-1 transition-transform inline-block"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-['Be_Vietnam_Pro'] text-sm hover:translate-x-1 transition-transform inline-block"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
