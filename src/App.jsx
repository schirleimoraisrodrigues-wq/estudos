import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { StudyDataProvider } from "./hooks/useStudyData.jsx";
import { useTheme } from "./hooks/useTheme";
import { getCurrentUser } from "./services/authService";
import { Login, Register } from "./pages/AuthPages";
import { Dashboard } from "./pages/Dashboard";
import { Calendar } from "./pages/Calendar";
import { Subjects } from "./pages/Subjects";
import { SubjectDetails } from "./pages/SubjectDetails";
import { Exams } from "./pages/Exams";
import { Tasks } from "./pages/Tasks";
import { Questions } from "./pages/Questions";
import { Flashcards, Profile, Settings } from "./pages/SimplePages";

function ProtectedApp() {
  const user = getCurrentUser();
  const { theme, toggleTheme } = useTheme();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <StudyDataProvider>
      <Routes>
        <Route
          element={
            <Layout user={user} theme={theme} toggleTheme={toggleTheme} />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="materias" element={<Subjects />} />
          <Route path="materias/:id" element={<SubjectDetails />} />
          <Route path="provas" element={<Exams />} />
          <Route path="tarefas" element={<Tasks />} />
          <Route path="questoes" element={<Questions />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="perfil" element={<Profile />} />
          <Route
            path="configuracoes"
            element={<Settings theme={theme} toggleTheme={toggleTheme} />}
          />
        </Route>
      </Routes>
    </StudyDataProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/*" element={<ProtectedApp />} />
    </Routes>
  );
}
