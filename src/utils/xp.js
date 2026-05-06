export function calculateLevel(xp) {
  return Math.max(1, Math.floor(xp / 500) + 1);
}

export function xpForAction(action, payload = {}) {
  const values = {
    completeTask: 40,
    answerQuestion: 10,
    correctQuestion: 20,
    reviewContent: 25,
    dailyGoal: 60,
  };
  return (values[action] || 0) + (payload.bonus || 0);
}

export function nextLevelProgress(xp) {
  const current = xp % 500;
  return {
    current,
    needed: 500,
    percentage: Math.round((current / 500) * 100),
  };
}
