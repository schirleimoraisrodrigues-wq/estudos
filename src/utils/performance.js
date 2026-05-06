const confidenceWeight = {
  Chutei: -18,
  "Estava muito incerta": -10,
  "Estava em dúvida entre alternativas": -4,
  "Estava confiante": 8,
  "Sabia com certeza": 14,
};

export function calculatePerformance(questions, subjectId) {
  const attempts = questions.flatMap((question) =>
    question.subjectId === subjectId
      ? question.attempts.map((attempt) => ({ ...attempt, question }))
      : [],
  );
  if (!attempts.length)
    return { score: 0, correct: 0, wrong: 0, total: 0, confidenceAverage: 0 };
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const confidenceAverage =
    attempts.reduce(
      (sum, attempt) => sum + (confidenceWeight[attempt.confidence] || 0),
      0,
    ) / attempts.length;
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round((correct / attempts.length) * 100 + confidenceAverage),
    ),
  );
  return {
    score,
    correct,
    wrong: attempts.length - correct,
    total: attempts.length,
    confidenceAverage,
  };
}
