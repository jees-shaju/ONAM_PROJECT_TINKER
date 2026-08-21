import { EXPERIENCES } from '../data/experiences';

export function getNextMemoryRecommendation({
  userInterests = [],
  completedExperienceIds = [],
  currentLocation = 'Thrissur',
  timeRemainingMins = 700
}) {
  const unvisited = EXPERIENCES.filter(exp => !completedExperienceIds.includes(exp.id));
  if (unvisited.length === 0) return EXPERIENCES[0];

  // Count recent category occurrences to enforce category diversity
  const completedExps = EXPERIENCES.filter(exp => completedExperienceIds.includes(exp.id));
  const recentCategories = completedExps.map(exp => exp.categories).flat();

  let maxScore = -100;
  let bestExp = unvisited[0];

  unvisited.forEach(exp => {
    let score = 0;

    // 1. Interest match (+15 points per match)
    const categoryMatches = exp.categories.filter(cat => userInterests.includes(cat));
    score += categoryMatches.length * 15;

    // 2. Proximity bonus (+20 points for close distance)
    if (exp.distanceKm <= 5) score += 25;
    else if (exp.distanceKm <= 15) score += 15;
    else if (exp.distanceKm <= 35) score += 5;

    // 3. Duration fit (fits within remaining time)
    if (exp.duration <= timeRemainingMins) score += 20;
    else score -= 50;

    // 4. Category diversity bonus (+15 for fresh categories not recently visited)
    const matchesRecent = exp.categories.some(cat => recentCategories.slice(-2).includes(cat));
    if (!matchesRecent) score += 15;
    else score -= 10;

    // 5. Verification bonus
    if (exp.verified) score += 10;

    // 6. Happening now bonus
    if (exp.happeningNow) score += 15;

    if (score > maxScore) {
      maxScore = score;
      bestExp = exp;
    }
  });

  // Calculate human-friendly rationale
  const matchReason = bestExp.categories.some(cat => userInterests.includes(cat))
    ? `Matches your interest in ${bestExp.categories.join(' & ')}.`
    : 'Offers a fresh cultural experience you haven’t tried today.';

  return {
    ...bestExp,
    recommendationScore: maxScore,
    recommendationReason: `${matchReason} Located only ${bestExp.distanceKm} km away in ${bestExp.district}.`
  };
}
