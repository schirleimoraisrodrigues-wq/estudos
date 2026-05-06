import { createContext, useContext, useMemo, useState } from "react";
import { loadData, saveData } from "../services/storageService";
import { xpForAction } from "../utils/xp";

const StudyDataContext = createContext(null);

export function StudyDataProvider({ children }) {
  const [data, setData] = useState(loadData);
  const updateData = (updater) => {
    setData((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      saveData(next);
      return next;
    });
  };
  const actions = useMemo(
    () => ({
      upsertSubject(subject) {
        updateData((current) => ({
          ...current,
          subjects: subject.id
            ? current.subjects.map((item) =>
                item.id === subject.id ? subject : item,
              )
            : [
                ...current.subjects,
                {
                  ...subject,
                  id: crypto.randomUUID(),
                  performance: 0,
                  progress: 0,
                  contents: [],
                },
              ],
        }));
      },
      deleteSubject(id) {
        updateData((current) => ({
          ...current,
          subjects: current.subjects.filter((item) => item.id !== id),
        }));
      },
      upsertExam(exam) {
        updateData((current) => ({
          ...current,
          exams: exam.id
            ? current.exams.map((item) => (item.id === exam.id ? exam : item))
            : [...current.exams, { ...exam, id: crypto.randomUUID() }],
        }));
      },
      deleteExam(id) {
        updateData((current) => ({
          ...current,
          exams: current.exams.filter((item) => item.id !== id),
        }));
      },
      upsertTask(task) {
        updateData((current) => ({
          ...current,
          tasks: task.id
            ? current.tasks.map((item) => (item.id === task.id ? task : item))
            : [...current.tasks, { ...task, id: crypto.randomUUID() }],
        }));
      },
      deleteTask(id) {
        updateData((current) => ({
          ...current,
          tasks: current.tasks.filter((item) => item.id !== id),
        }));
      },
      completeTask(id) {
        updateData((current) => ({
          ...current,
          profile: {
            ...current.profile,
            xp: current.profile.xp + xpForAction("completeTask"),
          },
          tasks: current.tasks.map((task) =>
            task.id === id ? { ...task, status: "concluída" } : task,
          ),
        }));
      },
      addQuestion(question) {
        updateData((current) => ({
          ...current,
          questions: [
            ...current.questions,
            { ...question, id: crypto.randomUUID(), attempts: [] },
          ],
        }));
      },
      answerQuestion(questionId, answer, confidence) {
        updateData((current) => ({
          ...current,
          profile: {
            ...current.profile,
            xp:
              current.profile.xp +
              xpForAction("answerQuestion") +
              (current.questions.find((q) => q.id === questionId)
                ?.correctAnswer === answer
                ? xpForAction("correctQuestion")
                : 0),
          },
          questions: current.questions.map((question) =>
            question.id === questionId
              ? {
                  ...question,
                  attempts: [
                    ...question.attempts,
                    {
                      answer,
                      confidence,
                      isCorrect: answer === question.correctAnswer,
                      answeredAt: new Date().toISOString(),
                    },
                  ],
                }
              : question,
          ),
        }));
      },
    }),
    [],
  );
  return (
    <StudyDataContext.Provider value={{ data, updateData, actions }}>
      {children}
    </StudyDataContext.Provider>
  );
}

export function useStudyData() {
  const context = useContext(StudyDataContext);
  if (!context)
    throw new Error("useStudyData deve ser usado dentro de StudyDataProvider");
  return context;
}
