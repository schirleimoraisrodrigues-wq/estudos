const priorityScoreLabel = (score) =>
  score >= 75 ? "alta" : score >= 45 ? "média" : "baixa";
const daysUntil = (date) =>
  Math.ceil((new Date(`${date}T00:00:00`) - new Date()) / 86400000);

export function priorityFromAttempt(isCorrect, confidence) {
  if (isCorrect && confidence === "Chutei") return "alta";
  if (isCorrect && confidence === "Estava muito incerta") return "alta";
  if (isCorrect && confidence === "Estava em dúvida entre alternativas")
    return "média";
  if (isCorrect && confidence === "Estava confiante") return "baixa";
  if (isCorrect && confidence === "Sabia com certeza") return "baixa";
  if (!isCorrect && confidence === "Estava confiante") return "alta";
  if (!isCorrect && confidence === "Chutei") return "alta";
  return isCorrect ? "média" : "alta";
}

export function calculateSubjectPriority(subject, data) {
  let score = 0;
  if (subject.performance < 60) score += 30;
  if (subject.performance < 75) score += 15;
  subject.contents.forEach((content) => {
    if (content.difficulty === "alta") score += 10;
    if (daysUntil(content.lastReviewed) < -14) score += 12;
  });
  data.exams
    .filter((exam) => exam.subjectId === subject.id)
    .forEach((exam) => {
      const days = daysUntil(exam.date);
      if (days >= 0 && days <= 7) score += 30;
      else if (days <= 14) score += 18;
    });
  data.tasks
    .filter(
      (task) => task.subjectId === subject.id && task.status !== "concluída",
    )
    .forEach((task) => {
      if (daysUntil(task.date) < 0) score += 24;
      if (task.priority === "alta") score += 12;
    });
  data.questions
    .filter((question) => question.subjectId === subject.id)
    .forEach((question) => {
      const last = question.attempts.at(-1);
      if (last)
        score +=
          priorityFromAttempt(last.isCorrect, last.confidence) === "alta"
            ? 20
            : 4;
    });
  return priorityScoreLabel(score);
}

export function calculateDailyPriorities(data) {
  return data.subjects
    .map((subject) => ({
      ...subject,
      priority: calculateSubjectPriority(subject, data),
    }))
    .sort(
      (a, b) =>
        ({ alta: 3, média: 2, baixa: 1 })[b.priority] -
        { alta: 3, média: 2, baixa: 1 }[a.priority],
    )
    .slice(0, 4);
}
