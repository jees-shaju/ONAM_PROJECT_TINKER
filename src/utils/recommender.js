import { EXPERIENCES } from '../data/experiences';

export function getNextMemoryRecommendation({
  userInterests = [],
  completedExperienceIds = [],
  excludedIds = [],
  currentLocation = 'Thrissur',
  timeRemainingMins = 1440
}) {
  // First filter out completed memories and explicitly excluded ones
  let unvisited = EXPERIENCES.filter(
    exp => !completedExperienceIds.includes(exp.id) && !excludedIds.includes(exp.id)
  );

  // If all are excluded, reset exclusion and use all unvisited
  if (unvisited.length === 0) {
    unvisited = EXPERIENCES.filter(exp => !completedExperienceIds.includes(exp.id));
  }
  if (unvisited.length === 0) return EXPERIENCES[0];

  // Count recent category occurrences to enforce category diversity
  const completedExps = EXPERIENCES.filter(exp => completedExperienceIds.includes(exp.id));
  const recentCategories = completedExps.map(exp => exp.categories).flat();

  // Score each experience
  const scored = unvisited.map(exp => {
    let score = 0;

    // 1. Interest match (+15 points per match)
    const categoryMatches = exp.categories.filter(cat => userInterests.includes(cat));
    score += categoryMatches.length * 15;

    // 2. Proximity bonus (+25 points if in current location or nearby)
    if (exp.district === currentLocation) score += 30;
    else if (exp.distanceKm <= 10) score += 20;
    else if (exp.distanceKm <= 35) score += 10;

    // 3. Duration fit (fits within remaining time)
    if (exp.duration <= timeRemainingMins) score += 20;
    else score -= 30;

    // 4. Category diversity bonus (+15 for fresh categories not recently visited)
    const matchesRecent = exp.categories.some(cat => recentCategories.slice(-2).includes(cat));
    if (!matchesRecent) score += 15;
    else score -= 5;

    // 5. Verification bonus
    if (exp.verified) score += 10;

    // 6. Happening now bonus
    if (exp.happeningNow) score += 15;

    // Add slight deterministic variation based on title to break ties pleasantly
    score += (exp.title.charCodeAt(0) % 5);

    return { exp, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const bestExp = scored[0].exp;
  const maxScore = scored[0].score;

  // Calculate human-friendly rationale
  const matchReason = bestExp.categories.some(cat => userInterests.includes(cat))
    ? `Matches your interest in ${bestExp.categories.join(' & ')}.`
    : 'Offers a fresh cultural experience across Kerala.';

  return {
    ...bestExp,
    recommendationScore: maxScore,
    recommendationReason: `${matchReason} Located in ${bestExp.district} (${bestExp.location}).`
  };
}
