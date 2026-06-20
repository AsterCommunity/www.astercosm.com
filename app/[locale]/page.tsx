import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowUpRight, FiGithub, FiMenu, FiX } from "@/components/icons";
import {
  PanelCopy,
  ScrollPanel,
  ScrollViewport,
} from "@/components/scroll-panel";
import {
  type Accent,
  type Chapter,
  getContent,
  isLocale,
  type Locale,
  locales,
} from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const accentClasses: Record<
  Accent,
  {
    border: string;
    text: string;
    bg: string;
    line: string;
  }
> = {
  yellow: {
    border: "border-aster-yellow/45",
    text: "text-aster-yellow-strong",
    bg: "bg-aster-yellow/12",
    line: "from-aster-yellow/80",
  },
  rose: {
    border: "border-aster-rose/45",
    text: "text-aster-rose-strong",
    bg: "bg-aster-rose/10",
    line: "from-aster-rose/80",
  },
  blue: {
    border: "border-aster-blue/45",
    text: "text-aster-blue-strong",
    bg: "bg-aster-blue/10",
    line: "from-aster-blue/80",
  },
  green: {
    border: "border-aster-green/45",
    text: "text-aster-green-strong",
    bg: "bg-aster-green/10",
    line: "from-aster-green/80",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const content = getContent(rawLocale);
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/${content.locale}`,
      languages: {
        en: "/en",
        "zh-CN": "/zh-CN",
      },
    },
  };
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const content = getContent(rawLocale);

  return (
    <main className="min-h-screen bg-aster-paper text-aster-ink md:h-screen md:overflow-hidden">
      <Header locale={rawLocale} content={content} />
      <ScrollViewport>
        <HeroPanel content={content} />
        {content.chapters.map((chapter, index) => {
          return (
            <ScrollPanel
              key={chapter.id}
              id={chapter.id}
              backdrop={<ChapterBackdrop chapter={chapter} />}
              tone={
                chapter.id === "systems" || chapter.id === "archive"
                  ? "dark"
                  : index % 2 === 0
                    ? "muted"
                    : "plain"
              }
            >
              <div
                className={`grid h-full items-center gap-12 py-10 lg:grid-cols-[0.92fr_1.08fr] ${
                  chapter.id === "systems" || chapter.id === "archive"
                    ? "text-white"
                    : ""
                }`}
              >
                <PanelCopy>
                  <p
                    className={`font-mono text-xs uppercase tracking-[0.26em] ${
                      chapter.id === "systems" || chapter.id === "archive"
                        ? "text-white/72 [text-shadow:0_2px_18px_rgba(0,0,0,0.72)]"
                        : "text-aster-subtle"
                    }`}
                  >
                    {chapter.kicker}
                  </p>
                  <h2
                    className={`mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl ${
                      chapter.id === "systems" || chapter.id === "archive"
                        ? "text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.82)]"
                        : "text-aster-ink"
                    }`}
                  >
                    {chapter.title}
                  </h2>
                  <p
                    className={`mt-7 max-w-2xl text-base leading-8 sm:text-lg ${
                      chapter.id === "systems" || chapter.id === "archive"
                        ? "text-white/78 [text-shadow:0_2px_18px_rgba(0,0,0,0.78)]"
                        : "text-aster-muted"
                    }`}
                  >
                    {chapter.description}
                  </p>
                </PanelCopy>

                <ChapterVisual chapter={chapter} locale={rawLocale} />
              </div>
            </ScrollPanel>
          );
        })}
        <PrinciplesPanel content={content} />
        <FooterPanel content={content} />
      </ScrollViewport>
    </main>
  );
}

function ChapterVisual({
  chapter,
  locale,
}: {
  chapter: Chapter;
  locale: Locale;
}) {
  const accent = accentClasses[chapter.accent];
  const Icon = chapter.icon;
  const isDark = chapter.id === "systems" || chapter.id === "archive";

  if (chapter.id === "infrastructure") {
    return (
      <div className="relative">
        <div className="grid gap-5 md:grid-cols-3">
          {chapter.points.map((point, pointIndex) => (
            <div key={point} className="relative pt-5">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-aster-green/40 bg-white font-mono text-xs text-aster-green-strong shadow-sm">
                0{pointIndex + 1}
              </span>
              <p className="mt-10 text-lg font-semibold leading-7 text-aster-ink">
                {point}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-aster-subtle">
                {locale === "zh-CN" ? "运行路径" : "runtime path"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chapter.id === "archive") {
    return (
      <div className="relative max-w-2xl border-y border-white/28 py-8 text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.84)] lg:ml-auto">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border-t-2 border-aster-rose pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/68">
              ESAP
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {locale === "zh-CN" ? "创作档案" : "Creative archive"}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {locale === "zh-CN"
                ? "角色、时间线、世界构建。"
                : "Characters, timelines, worldbuilding."}
            </p>
          </div>
          <div className="border-t-2 border-aster-blue pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/68">
              AsterCosmos
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {locale === "zh-CN" ? "工程入口" : "Engineering entry"}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {locale === "zh-CN"
                ? "工程项目、运行系统、技术入口。"
                : "Projects, running systems, technical entries."}
            </p>
          </div>
        </div>
        <div className="mt-10 space-y-4 border-t border-white/20 pt-6">
          {chapter.points.map((point, pointIndex) => (
            <div
              key={point}
              className="flex items-center gap-4 border-l border-white/24 pl-5"
            >
              <span className="font-mono text-xs text-white/54">
                0{pointIndex + 1}
              </span>
              <span className="text-sm font-medium text-white sm:text-base">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg border p-5 md:p-7 ${
        isDark
          ? "border-white/18 bg-black/18 text-white shadow-[0_34px_120px_rgba(0,0,0,0.26)] backdrop-blur-md"
          : "border-aster-border bg-white/70 shadow-[0_24px_80px_rgba(22,22,18,0.06)]"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent.line} via-transparent to-transparent`}
      />
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-md ${accent.bg} ${accent.text}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-aster-subtle">
            {locale === "zh-CN" ? "系统预览" : "system preview"}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {chapter.points.map((point, pointIndex) => (
          <div
            key={point}
            className="grid grid-cols-[4rem_1fr] items-center gap-5"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-aster-subtle">
              sys 0{pointIndex + 1}
            </span>
            <div
              className={`border-l-2 px-5 py-4 ${
                isDark
                  ? `${accent.border} bg-white/8`
                  : `${accent.border} bg-aster-muted-bg/60`
              }`}
            >
              <p
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-aster-ink"
                }`}
              >
                {point}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterBackdrop({ chapter }: { chapter: Chapter }) {
  if (chapter.id === "systems") {
    return (
      <>
        <Image
          src="/illustrations/systems-background-dark.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-82"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#05070d]/38" />
        <div className="absolute inset-0 bg-linear-to-r from-[#05070d]/90 via-[#05070d]/58 to-[#05070d]/24" />
        <div className="absolute inset-0 bg-linear-to-t from-[#05070d]/58 via-transparent to-[#05070d]/30" />
      </>
    );
  }

  if (chapter.id === "archive") {
    return (
      <>
        <Image
          src="/illustrations/esap-bing-search.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#05070d]/58" />
        <div className="absolute inset-0 bg-linear-to-r from-[#05070d]/88 via-[#05070d]/54 to-[#05070d]/34" />
        <div className="absolute inset-0 bg-linear-to-t from-[#05070d]/70 via-transparent to-[#05070d]/42" />
        <div className="absolute left-0 top-0 h-full w-[42%] bg-linear-to-r from-[#05070d]/84 to-transparent" />
      </>
    );
  }

  if (chapter.id === "infrastructure") {
    return (
      <>
        <Image
          src="/illustrations/infrastructure-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-58"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-aster-paper via-aster-paper/82 to-aster-paper/24" />
        <div className="absolute inset-0 bg-linear-to-t from-aster-paper via-transparent to-aster-paper/38" />
      </>
    );
  }

  return (
    <>
      <div className="absolute left-[7%] top-28 hidden w-80 font-mono text-[10px] leading-6 text-aster-blue-strong/28 lg:block">
        {[
          "const system = await boot();",
          "watch(runtime.health);",
          "route('/systems', registry);",
          "deploy({ target: 'public-node' });",
        ].map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="absolute right-[9%] top-[18%] hidden h-80 w-80 rounded-full border border-aster-blue/18 lg:block" />
      <div className="absolute right-[13%] top-[34%] hidden h-px w-[28rem] bg-linear-to-r from-aster-yellow/35 via-aster-rose/25 to-transparent lg:block" />
    </>
  );
}

function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: ReturnType<typeof getContent>;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-aster-border bg-aster-paper/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href={`/${locale}#signal`}
          className="group flex items-center gap-3 font-semibold tracking-tight text-aster-ink"
        >
          <span className="grid h-9 w-9 place-items-center">
            <Image
              src="/favicon.ico"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              aria-hidden="true"
              priority
            />
          </span>
          <span>{content.nav.brand}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {content.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-aster-muted transition-colors hover:bg-aster-muted-bg hover:text-aster-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={content.nav.localeSwitch.href}
            className="inline-flex h-10 items-center rounded-md border border-aster-border bg-white px-3 text-sm font-medium text-aster-muted shadow-sm transition-colors hover:border-aster-blue/50 hover:text-aster-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
          >
            {content.nav.localeSwitch.label}
          </a>
          <a
            href="https://github.com/AsterCommunity"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-aster-border bg-white px-3 text-sm font-medium text-aster-ink shadow-sm transition-colors hover:border-aster-blue/50 hover:text-aster-blue-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub className="h-4 w-4" aria-hidden="true" />
            {content.nav.github}
          </a>
        </div>

        <details className="group relative md:hidden">
          <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-aster-border bg-white text-aster-ink shadow-sm marker:hidden">
            <FiMenu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
            <FiX
              className="hidden h-5 w-5 group-open:block"
              aria-hidden="true"
            />
            <span className="sr-only">{content.nav.openNavigation}</span>
          </summary>
          <div className="absolute right-0 mt-3 w-60 rounded-lg border border-aster-border bg-white p-2 shadow-2xl">
            {content.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-aster-muted hover:bg-aster-muted-bg hover:text-aster-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={content.nav.localeSwitch.href}
              className="mt-1 block rounded-md border-t border-aster-border px-3 py-2 text-sm font-medium text-aster-muted hover:bg-aster-muted-bg hover:text-aster-ink"
            >
              {content.nav.localeSwitch.label}
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}

function HeroPanel({ content }: { content: ReturnType<typeof getContent> }) {
  return (
    <ScrollPanel id="signal">
      <div className="grid h-full items-center gap-12 py-10">
        <PanelCopy distance={28}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-aster-subtle">
            {content.hero.kicker}
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-aster-ink sm:text-7xl lg:text-8xl">
            {content.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-aster-muted sm:text-2xl">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-aster-muted">
            {content.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#systems"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-aster-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-aster-code focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
            >
              {content.hero.primaryCta}
              <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/AsterCommunity"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-aster-border bg-white px-5 text-sm font-semibold text-aster-ink shadow-sm transition-colors hover:border-aster-blue/50 hover:text-aster-blue-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className="h-4 w-4" aria-hidden="true" />
              {content.hero.secondaryCta}
            </a>
          </div>
        </PanelCopy>
      </div>
    </ScrollPanel>
  );
}

function PrinciplesPanel({
  content,
}: {
  content: ReturnType<typeof getContent>;
}) {
  return (
    <ScrollPanel id="principles" tone="muted">
      <div className="grid h-full items-center gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <PanelCopy>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-aster-subtle">
            {content.principles.kicker}
          </p>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-aster-ink sm:text-5xl lg:text-6xl">
            {content.principles.title}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-aster-muted sm:text-lg">
            {content.principles.description}
          </p>
        </PanelCopy>

        <div className="space-y-1 border-y border-aster-border">
          {content.principles.items.map((principle) => {
            const Icon = principle.icon;
            const accent = accentClasses[principle.accent];

            return (
              <article
                key={principle.title}
                className="grid gap-5 border-t border-aster-border py-7 first:border-t-0 sm:grid-cols-[3rem_1fr]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md ${accent.bg} ${accent.text}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-aster-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-aster-muted">
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </ScrollPanel>
  );
}

function FooterPanel({ content }: { content: ReturnType<typeof getContent> }) {
  return (
    <ScrollPanel id="entry" mode="static">
      <div className="flex h-full flex-col justify-between gap-12 py-10">
        <PanelCopy distance={0}>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-aster-subtle">
            {content.footer.kicker}
          </p>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-aster-ink sm:text-5xl lg:text-6xl">
            {content.footer.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-aster-muted sm:text-lg">
            {content.footer.description}
          </p>
        </PanelCopy>

        <footer className="border-t border-aster-border">
          <div className="h-px bg-linear-to-r from-aster-yellow via-aster-rose to-aster-blue" />
          <div className="grid gap-10 py-10 md:grid-cols-[1.25fr_1fr_1fr]">
            <div>
              <p className="text-lg font-semibold tracking-tight text-aster-ink">
                AsterCosmos
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-aster-muted">
                {content.footer.note}
              </p>
              <p className="mt-6 text-xs leading-6 text-aster-subtle">
                {content.footer.copyright}
              </p>
              <p className="mt-2 text-xs leading-6 text-aster-subtle/80">
                {content.footer.license}
              </p>
            </div>

            {content.footer.groups.map((group) => (
              <div key={group.title}>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-aster-subtle">
                  {group.title}
                </p>
                <div className="space-y-3">
                  {group.links.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-4 text-sm font-medium text-aster-muted transition-colors hover:text-aster-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aster-blue"
                      >
                        <span>{link.label}</span>
                        <Icon
                          className="h-4 w-4 text-aster-subtle transition-colors group-hover:text-aster-blue-strong"
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-aster-border py-6 text-xs text-aster-subtle sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-aster-yellow" />
              <span className="h-1.5 w-1.5 rounded-full bg-aster-rose" />
              <span className="h-1.5 w-1.5 rounded-full bg-aster-blue" />
            </div>
            <div className="flex flex-col gap-2 font-mono uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:gap-6">
              <span>{content.footer.status}</span>
              <span>{content.footer.badge}</span>
            </div>
          </div>
        </footer>
      </div>
    </ScrollPanel>
  );
}
