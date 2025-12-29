export default {
  get: (key: string) => {
    return localStorage.getItem(key);
  },
  set: <T extends string>(key: string, value: T) => {
    return localStorage.setItem(key, value);
  },
  remove: (key: string) => {
    return localStorage.removeItem(key);
  },
  clear: () => {
    return localStorage.clear();
  },
};
