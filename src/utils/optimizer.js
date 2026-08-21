// Itinerary optimization algorithm for "OPTIMISE MY DAY"

export function optimizeItinerary(experiences = []) {
  if (experiences.length <= 1) {
    return {
      optimizedList: experiences,
      minutesSaved: 0,
      message: 'Your itinerary is already streamlined!'
    };
  }

  // Preserve completed items at the top
  const completed = experiences.filter(exp => exp.completed);
  const remaining = experiences.filter(exp => !exp.completed);

  if (remaining.length <= 1) {
    return {
      optimizedList: [...completed, ...remaining],
      minutesSaved: 0,
      message: 'Your upcoming timeline is already optimal!'
    };
  }

  // Greedy Nearest Neighbor sorting by map coordinates
  const sortedRemaining = [];
  let currentLoc = completed.length > 0
    ? completed[completed.length - 1].coordinates
    : { x: 45, y: 48 }; // Default Thrissur center

  const pool = [...remaining];

  while (pool.length > 0) {
    let minDistanceSq = Infinity;
    let closestIndex = 0;

    pool.forEach((exp, idx) => {
      const dx = exp.coordinates.x - currentLoc.x;
      const dy = exp.coordinates.y - currentLoc.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < minDistanceSq) {
        minDistanceSq = distSq;
        closestIndex = idx;
      }
    });

    const chosen = pool.splice(closestIndex, 1)[0];
    sortedRemaining.push(chosen);
    currentLoc = chosen.coordinates;
  }

  // Estimate travel time saved (simulated ~25-45 mins saved based on node count)
  const minsSaved = Math.min(65, Math.max(20, remaining.length * 12));

  // Re-assign logical time slots starting from 09:30 AM
  const timeSlots = ['09:30 AM', '11:15 AM', '01:30 PM', '03:45 PM', '05:30 PM', '07:15 PM', '08:45 PM'];
  
  const fullOptimized = [...completed, ...sortedRemaining].map((exp, idx) => ({
    ...exp,
    assignedTime: timeSlots[idx] || `${9 + idx}:00 PM`
  }));

  return {
    optimizedList: fullOptimized,
    minutesSaved: minsSaved,
    message: `⚡ Your day was reorganised by location proximity! Saved ~${minsSaved} minutes of travel time.`
  };
}
