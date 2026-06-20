import {
  FiArrowUpRight,
  FiBookOpen,
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGithub,
  FiLayers,
  FiServer,
  FiTerminal,
  type IconType,
} from "@/components/icons";

export const locales = ["en", "zh-CN"] as const;

export type Locale = (typeof locales)[number];
export type Accent = "yellow" | "rose" | "blue" | "green";

export type NavItem = {
  label: string;
  href: string;
};

export type SignalMetric = {
  label: string;
  value: string;
  detail: string;
};

export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  accent: Accent;
  icon: IconType;
  points: string[];
};

export type Principle = {
  title: string;
  description: string;
  icon: IconType;
  accent: Accent;
};

export type FooterLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export type SiteContent = {
  locale: Locale;
  htmlLang: string;
  title: string;
  description: string;
  nav: {
    brand: string;
    github: string;
    openNavigation: string;
    items: NavItem[];
    localeSwitch: {
      label: string;
      href: string;
    };
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  signalCard: {
    eyebrow: string;
    title: string;
    status: string;
    metrics: SignalMetric[];
  };
  chapters: Chapter[];
  principles: {
    kicker: string;
    title: string;
    description: string;
    items: Principle[];
  };
  footer: {
    kicker: string;
    title: string;
    description: string;
    note: string;
    badge: string;
    copyright: string;
    license: string;
    status: string;
    groups: FooterGroup[];
    links: FooterLink[];
  };
};

const sharedLinks = {
  github: "https://github.com/AsterCommunity",
  esap: "https://weare.esaps.net",
  stories: "https://story.esaps.net",
  source: "https://github.com/AsterCommunity/www.astercosm.com",
} as const;

const navHrefs = {
  signal: "#signal",
  systems: "#systems",
  infrastructure: "#infrastructure",
  archive: "#archive",
} as const;

export const signalIcons = [
  { key: "terminal", icon: FiTerminal },
  { key: "cpu", icon: FiCpu },
  { key: "server", icon: FiServer },
] as const;

export const contentByLocale: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    htmlLang: "en",
    title: "AsterCosmos",
    description: "Systems, infrastructure, and archives for the Aster project.",
    nav: {
      brand: "AsterCosmos",
      github: "GitHub",
      openNavigation: "Open navigation",
      localeSwitch: {
        label: "中文",
        href: "/zh-CN",
      },
      items: [
        { label: "Signal", href: navHrefs.signal },
        { label: "Systems", href: navHrefs.systems },
        { label: "Infrastructure", href: navHrefs.infrastructure },
        { label: "Archive", href: navHrefs.archive },
      ],
    },
    hero: {
      kicker: "01 / Public engineering node",
      title: "AsterCosmos",
      subtitle: "The engineering home of Aster projects.",
      description:
        "Built for systems that need to run, evolve, and be maintained. AsterCosmos is a peer organization to ESAP, sharing membership while keeping engineering work in its own public space.",
      primaryCta: "Explore systems",
      secondaryCta: "View GitHub",
    },
    signalCard: {
      eyebrow: "signal registry",
      title: "White Signal Archive",
      status: "ready",
      metrics: [
        {
          label: "Public node",
          value: "AsterCosmos",
          detail: "engineering entry",
        },
        {
          label: "Membership",
          value: "ESAP",
          detail: "shared by default",
        },
        {
          label: "Mode",
          value: "Build",
          detail: "systems first",
        },
        {
          label: "Surface",
          value: "White",
          detail: "signal archive",
        },
      ],
    },
    chapters: [
      {
        id: "systems",
        kicker: "02 / Systems",
        title: "Products are treated as running systems, not demos.",
        description:
          "AsterCosmos maintains the things that need to stay alive: self-hosted services, engineering foundations, management panels, and the infrastructure that lets them be deployed, observed, and modified again.",
        accent: "blue",
        icon: FiBox,
        points: [
          "self-hosted product systems",
          "developer-facing foundations",
          "small-team operational surfaces",
        ],
      },
      {
        id: "infrastructure",
        kicker: "03 / Infrastructure",
        title: "The path from code to maintenance stays visible.",
        description:
          "AsterCosmos exists so code, services, documentation, deployment, and ownership boundaries can be managed together instead of scattered across personal repositories.",
        accent: "green",
        icon: FiServer,
        points: [
          "runtime and deployment defaults",
          "identity, storage, monitoring, automation",
          "maintainable boundaries between projects",
        ],
      },
      {
        id: "archive",
        kicker: "04 / Archive",
        title: "ESAP remains beside AsterCosmos, not underneath it.",
        description:
          "ESAP keeps characters, timelines, worldbuilding, and creative archives. AsterCosmos keeps engineering projects, running systems, and technical entry points. They share membership while preserving separate public identities.",
        accent: "rose",
        icon: FiBookOpen,
        points: [
          "shared membership and trust boundary",
          "separate public identities",
          "archives and systems cross-reference each other",
        ],
      },
    ],
    principles: {
      kicker: "05 / Operating principles",
      title: "Built to be operated.",
      description:
        "AsterCosmos projects begin with the parts that keep them alive: deployment, ownership, configuration, documentation, and the path back into maintenance.",
      items: [
        {
          title: "Build for deployment",
          description:
            "Every project should have a clear runtime path, configuration boundary, and deployment story.",
          icon: FiCode,
          accent: "blue",
        },
        {
          title: "Keep ownership visible",
          description:
            "The organization should make projects, permissions, and maintainers easier to find, not hide complexity.",
          icon: FiLayers,
          accent: "rose",
        },
        {
          title: "Document the running system",
          description:
            "Documentation is not only for the first install. It is also for the person who returns six months later to repair the system.",
          icon: FiDatabase,
          accent: "yellow",
        },
      ],
    },
    footer: {
      kicker: "06 / Entry points",
      title: "A quiet front door for systems that are still growing.",
      description:
        "AsterCosmos keeps engineering projects in one public place: source, runtime surfaces, maintenance boundaries, and the links back into ESAP.",
      note: "AsterCosmos public node. Built for the Aster project.",
      badge: "ESAP peer organization",
      copyright: "© 2026 AsterCosmos",
      license:
        "Code: Apache 2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
      status: "public engineering node",
      groups: [
        {
          title: "AsterCosmos",
          links: [
            { label: "GitHub", href: sharedLinks.github, icon: FiGithub },
            { label: "Source", href: sharedLinks.source, icon: FiGitBranch },
          ],
        },
        {
          title: "ESAP",
          links: [
            {
              label: "Character archive",
              href: sharedLinks.esap,
              icon: FiArrowUpRight,
            },
            { label: "Stories", href: sharedLinks.stories, icon: FiBookOpen },
          ],
        },
      ],
      links: [
        { label: "GitHub", href: sharedLinks.github, icon: FiGithub },
        { label: "ESAP", href: sharedLinks.esap, icon: FiArrowUpRight },
        { label: "Source", href: sharedLinks.source, icon: FiGitBranch },
      ],
    },
  },
  "zh-CN": {
    locale: "zh-CN",
    htmlLang: "zh-CN",
    title: "AsterCosmos",
    description: "Aster 项目的系统、基础设施与档案入口。",
    nav: {
      brand: "AsterCosmos",
      github: "GitHub",
      openNavigation: "打开导航",
      localeSwitch: {
        label: "EN",
        href: "/en",
      },
      items: [
        { label: "信号", href: navHrefs.signal },
        { label: "系统", href: navHrefs.systems },
        { label: "基础设施", href: navHrefs.infrastructure },
        { label: "档案", href: navHrefs.archive },
      ],
    },
    hero: {
      kicker: "01 / 公开工程节点",
      title: "AsterCosmos",
      subtitle: "Aster 项目的工程归档与运行入口。",
      description:
        "为需要运行、演进和维护的系统而建。AsterCosmos 与 ESAP 同级，共享成员关系，同时把工程项目保留在自己的公开空间里。",
      primaryCta: "查看系统",
      secondaryCta: "访问 GitHub",
    },
    signalCard: {
      eyebrow: "信号注册表",
      title: "白色信号档案",
      status: "ready",
      metrics: [
        {
          label: "公开节点",
          value: "AsterCosmos",
          detail: "工程入口",
        },
        {
          label: "成员关系",
          value: "ESAP",
          detail: "默认共享",
        },
        {
          label: "模式",
          value: "Build",
          detail: "系统优先",
        },
        {
          label: "界面",
          value: "White",
          detail: "信号档案",
        },
      ],
    },
    chapters: [
      {
        id: "systems",
        kicker: "02 / 系统",
        title: "产品首先是正在运行的系统，不是演示样板。",
        description:
          "AsterCosmos 维护那些需要长期运行的东西：自托管服务、工程底座、管理面板，以及让它们能被部署、观察和继续修改的基础设施。",
        accent: "blue",
        icon: FiBox,
        points: ["自托管产品系统", "面向开发者的工程底座", "小团队运维界面"],
      },
      {
        id: "infrastructure",
        kicker: "03 / 基础设施",
        title: "从代码到维护的路径，应该一直可见。",
        description:
          "AsterCosmos 存在的意义，是让代码、服务、文档、部署和责任边界能被统一管理，而不是散落在个人仓库里。",
        accent: "green",
        icon: FiServer,
        points: [
          "运行时与部署默认值",
          "身份、存储、监控、自动化",
          "项目之间可维护的边界",
        ],
      },
      {
        id: "archive",
        kicker: "04 / 档案",
        title: "ESAP 在 AsterCosmos 旁边，不在它下面。",
        description:
          "ESAP 保存角色、时间线、世界构建和创作档案；AsterCosmos 保存工程项目、运行系统和技术入口。它们共享成员关系，但保留各自的公开身份。",
        accent: "rose",
        icon: FiBookOpen,
        points: [
          "共享成员与信任边界",
          "保留各自的公开身份",
          "档案和系统互相引用",
        ],
      },
    ],
    principles: {
      kicker: "05 / 工作原则",
      title: "为运行而构建。",
      description:
        "AsterCosmos 的项目从维持运行的部分开始：部署、责任边界、配置、文档，以及重新回到维护状态的路径。",
      items: [
        {
          title: "为部署而构建",
          description: "每个项目都应该有清晰的运行方式、配置边界和部署路径。",
          icon: FiCode,
          accent: "blue",
        },
        {
          title: "让责任边界可见",
          description:
            "组织不是用来藏复杂度的；它应该让项目、权限和维护者更容易被找到。",
          icon: FiLayers,
          accent: "rose",
        },
        {
          title: "记录正在运行的系统",
          description: "文档不只写给第一次安装，也写给半年后回来修东西的人。",
          icon: FiDatabase,
          accent: "yellow",
        },
      ],
    },
    footer: {
      kicker: "06 / 入口",
      title: "一个安静的入口，给仍在生长的系统。",
      description:
        "AsterCosmos 把工程项目放在一个公开位置：源码、运行界面、维护边界，以及回到 ESAP 的路径。",
      note: "AsterCosmos 公开节点。为 Aster 项目构建。",
      badge: "ESAP 同级组织",
      copyright: "© 2026 AsterCosmos",
      license: "代码：Apache 2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
      status: "公开工程节点",
      groups: [
        {
          title: "AsterCosmos",
          links: [
            { label: "GitHub", href: sharedLinks.github, icon: FiGithub },
            { label: "源码", href: sharedLinks.source, icon: FiGitBranch },
          ],
        },
        {
          title: "ESAP",
          links: [
            { label: "角色档案", href: sharedLinks.esap, icon: FiArrowUpRight },
            { label: "故事站", href: sharedLinks.stories, icon: FiBookOpen },
          ],
        },
      ],
      links: [
        { label: "GitHub", href: sharedLinks.github, icon: FiGithub },
        { label: "ESAP", href: sharedLinks.esap, icon: FiArrowUpRight },
        { label: "Source", href: sharedLinks.source, icon: FiGitBranch },
      ],
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getContent(locale: Locale) {
  return contentByLocale[locale];
}
