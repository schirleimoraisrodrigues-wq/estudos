import { seedData } from "../data/seedData";

const DATA_KEY = "studyquest:data";

export function loadData() {
  const stored = localStorage.getItem(DATA_KEY);
  if (!stored) {
    saveData(seedData);
    return seedData;
  }
  return JSON.parse(stored);
}

export function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function resetData() {
  saveData(seedData);
  return seedData;
}
