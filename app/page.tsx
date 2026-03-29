import { HandHeart } from "lucide-react";

export default function Page() {
  return (
    <main className="">
      <HeroSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="flex">
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
