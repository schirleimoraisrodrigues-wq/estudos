import { CalendarGrid } from "../components/CalendarGrid";
import { useStudyData } from "../hooks/useStudyData.jsx";
export function Calendar() {
  const { data } = useStudyData();
  return (
    <CalendarGrid
      activities={[
        ...data.tasks,
        ...data.exams.map((exam) => ({ ...exam, type: "prova" })),
      ]}
    />
  );
}
