/* Shared storage helpers - keeps the existing localStorage contract. */
window.Storage = {
  getUser() {
    try { return JSON.parse(localStorage.getItem("currentUser") || "null"); }
    catch (_) { return null; }
  },
  setUser(user) { localStorage.setItem("currentUser", JSON.stringify(user)); },
  clearUser() { localStorage.removeItem("currentUser"); },
  get(key, fallback=null) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch (_) { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(key); }
};
