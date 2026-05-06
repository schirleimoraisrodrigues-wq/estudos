const USERS_KEY = "studyquest:users";
const SESSION_KEY = "studyquest:session";

const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const writeUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

export function register({ name, email, password }) {
  const users = readUsers();
  if (users.some((user) => user.email === email))
    throw new Error("E-mail já cadastrado.");
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  writeUsers([...users, user]);
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function login({ email, password }) {
  const user = readUsers().find(
    (item) => item.email === email && item.password === password,
  );
  if (!user) throw new Error("Credenciais inválidas.");
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
