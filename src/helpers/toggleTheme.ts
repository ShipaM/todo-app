export const toggleTheme = (
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | string>>
): void => {
  setTheme((prevTheme) => {
    const newTheme = prevTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
};
