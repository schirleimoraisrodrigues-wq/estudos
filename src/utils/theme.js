const THEME_KEY = "studyquest:theme";

export function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme(theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  return nextTheme;
}
