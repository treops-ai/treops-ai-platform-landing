"use client";

import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@treops/core/i18n";
import { HeroBoardMockup } from "@/components/landing-hero-board";
import {
  LandingNavbar,
  LandingHero,
  LandingSocialProof,
  LandingSpine,
  LandingStructure,
  LandingCapabilities,
  LandingFaq,
  LandingCta,
  LandingFooter,
} from "@treops/ui/components/treops";
import type { SpineNode, Stat, FaqItem, FooterColumn } from "@treops/ui/components/treops";

// The app lives on a separate origin, so login CTAs must be absolute URLs.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.treops.ai";

export default function LandingPage() {
  const t = useTranslations('landing');

  const NAV_LINKS = [
    { label: t('navbar.links.howItWorks'), href: "#how" },
    { label: t('navbar.links.platform'), href: "#structure" },
    { label: t('navbar.links.capabilities'), href: "#capabilities" },
    { label: t('navbar.links.docs'), href: "/docs" },
  ];

  const SPINE_NODES: SpineNode[] = [
    {
      number: t('spine.nodes.planning.number'),
      icon: "▣",
      title: t('spine.nodes.planning.title'),
      description: t('spine.nodes.planning.description'),
      asideKicker: t('spine.nodes.planning.asideKicker'),
      asideText: t('spine.nodes.planning.asideText'),
      mockup: "planning",
    },
    {
      number: t('spine.nodes.execution.number'),
      icon: "●",
      title: t('spine.nodes.execution.title'),
      description: t('spine.nodes.execution.description'),
      asideKicker: t('spine.nodes.execution.asideKicker'),
      asideText: t('spine.nodes.execution.asideText'),
      mockup: "execution",
    },
    {
      number: t('spine.nodes.assistant.number'),
      icon: "◎",
      title: t('spine.nodes.assistant.title'),
      description: t('spine.nodes.assistant.description'),
      asideKicker: t('spine.nodes.assistant.asideKicker'),
      asideText: t('spine.nodes.assistant.asideText'),
      mockup: "assistant",
    },
    {
      number: t('spine.nodes.ai.number'),
      icon: "✶",
      title: t('spine.nodes.ai.title'),
      description: t('spine.nodes.ai.description'),
      asideKicker: t('spine.nodes.ai.asideKicker'),
      asideText: t('spine.nodes.ai.asideText'),
      mockup: "ai",
    },
  ];

  const CAPABILITIES_STATS: Stat[] = [
    { value: t('capabilities.stats.fasterPlanning.value'), label: t('capabilities.stats.fasterPlanning.label') },
    { value: t('capabilities.stats.storiesShipped.value'), label: t('capabilities.stats.storiesShipped.label') },
    { value: t('capabilities.stats.agentSkills.value'), label: t('capabilities.stats.agentSkills.label') },
    { value: t('capabilities.stats.openSource.value'), label: t('capabilities.stats.openSource.label') },
  ];

  const FAQ_ITEMS: FaqItem[] = [
    {
      question: t('faq.items.0.question'),
      answer: t('faq.items.0.answer'),
    },
    {
      question: t('faq.items.1.question'),
      answer: t('faq.items.1.answer'),
    },
    {
      question: t('faq.items.2.question'),
      answer: t('faq.items.2.answer'),
    },
    {
      question: t('faq.items.3.question'),
      answer: t('faq.items.3.answer'),
    },
    {
      question: t('faq.items.4.question'),
      answer: t('faq.items.4.answer'),
    },
    {
      question: t('faq.items.5.question'),
      answer: t('faq.items.5.answer'),
    },
  ];

  const FOOTER_COLUMNS: FooterColumn[] = [
    {
      heading: t('footer.columns.product.heading'),
      links: [
        { label: t('footer.columns.product.links.planning'), href: "#" },
        { label: t('footer.columns.product.links.liveExecution'), href: "#" },
        { label: t('footer.columns.product.links.assistant'), href: "#" },
        { label: t('footer.columns.product.links.agents'), href: "#" },
      ],
    },
    {
      heading: t('footer.columns.resources.heading'),
      links: [
        { label: t('footer.columns.resources.links.docs'), href: "#" },
        { label: t('footer.columns.resources.links.github'), href: "https://github.com/Ngxba/treops" },
        { label: t('footer.columns.resources.links.changelog'), href: "#" },
        { label: t('footer.columns.resources.links.community'), href: "#" },
      ],
    },
    {
      heading: t('footer.columns.company.heading'),
      links: [
        { label: t('footer.columns.company.links.about'), href: "#" },
        { label: t('footer.columns.company.links.blog'), href: "#" },
        { label: t('footer.columns.company.links.careers'), href: "#" },
        { label: t('footer.columns.company.links.contact'), href: "#" },
      ],
    },
  ];

  const TRUST_CHIPS = [
    { label: t('hero.trustChips.noCard'), variant: "success" as const },
    { label: t('hero.trustChips.selfHost'), variant: "neutral" as const },
    { label: t('hero.trustChips.openSource'), variant: "primary" as const },
  ];

  const CTA_TRUST_CHIPS = [
    { label: t('cta.trustChips.noCard'), variant: "success" as const },
    { label: t('cta.trustChips.selfHost'), variant: "neutral" as const },
    { label: t('cta.trustChips.mitLicensed'), variant: "primary" as const },
  ];

  return (
    <div className="h-full overflow-y-auto" id="scroll-root">
      <LandingNavbar
        navLinks={NAV_LINKS}
        githubStars="4.2k"
        githubHref="https://github.com/Ngxba/treops"
        ctaLabel={t('navbar.cta')}
        ctaHref={`${APP_URL}/login`}
        localeSwitcher={<LocaleSwitcher />}
      />

      <main>
        <LandingHero
          pill={t('hero.pill')}
          title={t('hero.title')}
          titleGradientWord={t('hero.titleGradientWord')}
          lead={t('hero.lead')}
          primaryCta={{ label: t('hero.primaryCta'), href: "#" }}
          ghostCta={{ label: t('hero.ghostCta'), href: "https://github.com/Ngxba/treops" }}
          trustChips={TRUST_CHIPS}
          boardMockup={<HeroBoardMockup />}
        />

        <LandingSocialProof label={t('socialProof.label')} />

        <hr className="h-px bg-border border-0 m-0" />

        <LandingSpine
          eyebrow={t('spine.eyebrow')}
          title={t('spine.title')}
          lead={t('spine.lead')}
          nodes={SPINE_NODES}
        />

        <LandingStructure
          eyebrow={t('structure.eyebrow')}
          title={t('structure.title')}
          lead={t('structure.lead')}
        />

        <LandingCapabilities stats={CAPABILITIES_STATS} />

        <LandingFaq
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          leadBefore={t('faq.leadBefore')}
          docsLink={t('faq.docsLink')}
          items={FAQ_ITEMS}
          docsHref="#"
        />

        <LandingCta
          pill={t('cta.pill')}
          title={t('cta.title')}
          lead={t('cta.lead')}
          primaryCta={{ label: t('cta.primaryCta'), href: `${APP_URL}/login` }}
          ghostCta={{ label: t('cta.ghostCta'), href: "https://github.com/Ngxba/treops" }}
          trustChips={CTA_TRUST_CHIPS}
        />
      </main>

      <LandingFooter
        tagline={t('footer.tagline')}
        columns={FOOTER_COLUMNS}
        copyright={t('footer.copyright', { year: 2026 })}
        motto={t('footer.motto')}
      />
    </div>
  );
}
