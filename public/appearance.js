(() => {
  const saved = localStorage.getItem("Appearance");
  const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!saved || saved === "auto" ? prefereDark : saved === "dark") {
    document.documentElement.classList.add("dark");
  }
})();
