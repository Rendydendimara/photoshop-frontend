export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = (key: string) => {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : false;
};
