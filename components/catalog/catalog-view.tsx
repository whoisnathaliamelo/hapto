"use client";

import { useState, useEffect, useMemo } from "react";
import { Reveal } from "@/components/reveal";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilterChips } from "./mobile-filter-chips";
import { UsageGuide } from "./usage-guide";
import { CatalogSearch, CatalogSearchEmptyState } from "./catalog-search";
import {
  TokensGroup,
  AtomsGroup,
  MoleculesGroup,
  OrganismsGroup,
} from "./groups";
import { SECTIONS, GROUPS, CATEGORY_LABELS, normalizeSearch } from "./constants";
import type { AtomicCategory, ComponentSection } from "./types";

export function CatalogView() {
  const [activeCategory, setActiveCategory] = useState<AtomicCategory>("all");
  const [activeSection, setActiveSection] = useState<ComponentSection>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim().length > 0;

  const visibleSections = useMemo(() => {
    if (!isSearching) return undefined;
    const query = normalizeSearch(searchQuery);

    const matches = SECTIONS.filter((section) => {
      if (normalizeSearch(section.label).includes(query)) return true;
      if (normalizeSearch(section.id).includes(query)) return true;
      if (normalizeSearch(CATEGORY_LABELS[section.category]).includes(query)) return true;
      if (section.description && normalizeSearch(section.description).includes(query)) return true;
      if (section.keywords?.some((kw) => normalizeSearch(kw).includes(query))) return true;
      return false;
    });

    return new Set<ComponentSection>(matches.map((s) => s.id));
  }, [searchQuery, isSearching]);

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) return;

      const clean = rawHash.replace(/^section-/, "");

      const matchedGroup = GROUPS.find((g) => g.id === clean);
      if (matchedGroup) {
        setActiveCategory(matchedGroup.id);
        setActiveSection("all");
        setTimeout(() => {
          const el = document.getElementById(`${matchedGroup.id}-group`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }

      const matchedSection = SECTIONS.find((s) => s.id === clean);
      if (matchedSection) {
        setActiveCategory(matchedSection.category);
        setActiveSection(matchedSection.id);
        setTimeout(() => {
          const el = document.getElementById(matchedSection.id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSelect = (category: AtomicCategory, section: ComponentSection) => {
    setActiveCategory(category);
    setActiveSection(section);

    const hash =
      section !== "all"
        ? `#${section}`
        : category !== "all"
        ? `#${category}`
        : "";

    if (hash) {
      window.history.pushState(null, "", hash);
      setTimeout(() => {
        const targetId = section !== "all" ? section : `${category}-group`;
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const showGroup = (category: Exclude<AtomicCategory, "all">) => {
    if (visibleSections) {
      return SECTIONS.some(
        (s) => s.category === category && visibleSections.has(s.id)
      );
    }
    const matchesCategory = activeCategory === "all" || activeCategory === category;
    const matchesSection =
      activeSection === "all" ||
      SECTIONS.some((s) => s.category === category && s.id === activeSection);
    return matchesCategory && matchesSection;
  };

  const hasNoResults = visibleSections && visibleSections.size === 0;

  return (
    <section className="relative isolate overflow-clip border-b border-line/40">
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 bg-radial from-primary/15 via-transparent to-transparent opacity-60 blur-2xl" />

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-20 lg:pt-10 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-14">
          <FilterSidebar
            activeCategory={activeCategory}
            activeSection={activeSection}
            visibleSections={visibleSections}
            onSelect={handleSelect}
          />

          <div className="min-w-0 flex-1 flex flex-col items-center">
            <div className="w-full max-w-4xl xl:max-w-5xl space-y-10 lg:space-y-14">
              <header className="mx-auto max-w-2xl text-center">
                <Reveal>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-3.5 py-1 text-xs font-semibold text-muted shadow-2xs backdrop-blur-xs">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    <span>Design System Mobile-First</span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                    Catálogo de{" "}
                    <span className="text-primary underline decoration-primary/30 underline-offset-8">
                      Componentes
                    </span>
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    Biblioteca modular guiada por Atomic Design e calibrada para ergonomia móvel.
                  </p>
                </Reveal>
              </header>

              {/* Quick Search Bar */}
              <Reveal delay={0.05} className="w-full">
                <CatalogSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  resultCount={visibleSections ? visibleSections.size : SECTIONS.length}
                  totalCount={SECTIONS.length}
                />
              </Reveal>

              {/* Usage Guide only shown when not actively filtering by search */}
              {activeCategory === "all" && activeSection === "all" && !isSearching && (
                <UsageGuide />
              )}

              <Reveal delay={0.1} className="lg:hidden w-full">
                <MobileFilterChips
                  activeCategory={activeCategory}
                  activeSection={activeSection}
                  visibleSections={visibleSections}
                  onSelect={handleSelect}
                />
              </Reveal>

              {hasNoResults ? (
                <CatalogSearchEmptyState
                  query={searchQuery}
                  onClear={() => setSearchQuery("")}
                />
              ) : (
                <div className="space-y-14 lg:space-y-16">
                  {showGroup("tokens") && (
                    <TokensGroup
                      activeSection={activeSection}
                      visibleSections={visibleSections}
                    />
                  )}
                  {showGroup("atoms") && (
                    <AtomsGroup
                      activeSection={activeSection}
                      visibleSections={visibleSections}
                    />
                  )}
                  {showGroup("molecules") && (
                    <MoleculesGroup
                      activeSection={activeSection}
                      visibleSections={visibleSections}
                    />
                  )}
                  {showGroup("organisms") && (
                    <OrganismsGroup
                      activeSection={activeSection}
                      visibleSections={visibleSections}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
