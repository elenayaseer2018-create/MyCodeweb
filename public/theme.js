try {
  const saved = localStorage.getItem("codecrab-theme");
  if (saved === "light" || saved === "dark")
    document.documentElement.dataset.theme = saved;
} catch {}
