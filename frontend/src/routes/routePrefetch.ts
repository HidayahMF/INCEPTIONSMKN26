type RouteLoader = () => Promise<unknown>;

const loaders: Array<[string, RouteLoader]> = [
  ['/dashboard', () => import('../pages/DashboardPage')],
  ['/dashboard/portfolio', () => import('../pages/StudentPortfolioPage')],
  ['/dashboard/pkl', () => import('../pages/StudentPklPage')],
  ['/dashboard/lost-found', () => import('../pages/StudentLostFoundPage')],
  ['/dashboard/aspirations', () => import('../pages/StudentAspirationsPage')],
  ['/dashboard/canteen', () => import('../pages/StudentCanteenPage')],
  ['/dashboard/learning', () => import('../features/learning/pages/LearningRecommendationPage')],
  ['/dashboard/grades', () => import('../features/learning/pages/TeacherGradesPage')],
  ['/dashboard/teacher/classes', () => import('../pages/TeacherClassesPage')],
  ['/dashboard/teacher/competencies', () => import('../pages/TeacherCompetenciesPage')],
  ['/dashboard/teacher/portfolio-review', () => import('../pages/TeacherPortfolioReviewPage')],
  ['/dashboard/teacher/pkl', () => import('../pages/TeacherPklReviewPage')],
  ['/dashboard/teacher/lost-found', () => import('../pages/TeacherLostFoundReviewPage')],
  ['/dashboard/teacher/aspirations', () => import('../pages/TeacherAspirationsPage')],
  ['/dashboard/teacher/canteen', () => import('../pages/TeacherCanteenPage')],
  ['/admin/management', () => import('../pages/AdminManagementPage')],
  ['/admin/knowledge', () => import('../pages/AdminKnowledgePage')],
];

const warmed = new Set<string>();

export function prefetchRouteChunk(path: string) {
  const loader = [...loaders]
    .sort(([left], [right]) => right.length - left.length)
    .find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1];
  if (!loader || warmed.has(path)) return;
  warmed.add(path);
  void loader().catch(() => warmed.delete(path));
}
