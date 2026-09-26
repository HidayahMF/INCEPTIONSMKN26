export const figmaAssets = {
  branding: {
    schoolLogo: "/assets/figma/branding/smkn26-logo.png",
  },
  hero: {
    schoolBuilding: "/assets/figma/hero/hero-school-building.png",
    heroBackground: "/assets/figma/hero/hero-background.png",
    studentMale: "/assets/figma/hero/student-male.png",
    studentFemale: "/assets/figma/hero/student-female.png",
    headline: "/assets/figma/hero/hero-headline.svg",
  },
  icons: {
    search: "/assets/figma/icons/icon-search.svg",
    playVideo: "/assets/figma/icons/icon-play-video.svg",
    arrowRight: "/assets/figma/icons/icon-arrow-right.svg",
    chevronDown: "/assets/figma/icons/icon-chevron-down.svg",
  },
  shortcuts: {
    spmb: "/assets/figma/shortcuts/shortcut-spmb.png",
    library: "/assets/figma/shortcuts/shortcut-library.png",
    kjpPip: "/assets/figma/shortcuts/shortcut-kjp-pip.png",
    aiChat: "/assets/figma/shortcuts/shortcut-ai-chat.png",
  },
  school: {
    overviewPhoto: "/assets/figma/school/school-overview-photo.png",
  },
  advantages: {
    education: "/assets/figma/advantages/advantage-education.png",
    secondaryEducationIcon: "/assets/figma/advantages/icon-book-education-secondary.svg",
    industry: "/assets/figma/advantages/advantage-industry.png",
    blud: "/assets/figma/advantages/advantage-blud.png",
    lsp: "/assets/figma/advantages/advantage-lsp.png",
    interest: "/assets/figma/advantages/advantage-interest.png",
    inclusive: "/assets/figma/advantages/advantage-inclusive.png",
    arrow: "/assets/figma/advantages/advantage-arrow.svg",
    carouselLeft: "/assets/figma/advantages/advantage-carousel-left.svg",
    carouselRight: "/assets/figma/advantages/advantage-carousel-right.svg",
  },
  partners: [
    ...Array.from({ length: 5 }, (_, index) =>
      `/assets/figma/partners/partner-logo-${String(index + 1).padStart(2, "0")}.png`,
    ),
    "/assets/figma/partners/partner-logo-06.jpeg",
    "/assets/figma/partners/partner-logo-07.jpeg",
    ...Array.from({ length: 11 }, (_, index) =>
      `/assets/figma/partners/partner-logo-${String(index + 8).padStart(2, "0")}.png`,
    ),
    "/assets/figma/partners/partner-logo-19.png",
    "/assets/figma/partners/partner-logo-20.png",
  ],
} as const;
