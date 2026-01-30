(() => {
  const storageKey = "minigames-theme";
  const themes = [
    { id: "sunset", label: "Sunset" },
    { id: "ocean", label: "Ocean" },
    { id: "forest", label: "Forest" },
  ];

  const root = document.documentElement;
  let saved = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (error) {
    saved = null;
  }
  const initialTheme = themes.some((theme) => theme.id === saved) ? saved : "sunset";
  root.dataset.theme = initialTheme;

  const buildSwitcher = () => {
    if (document.querySelector(".theme-switcher")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "theme-switcher";

    const label = document.createElement("span");
    label.className = "theme-label";
    label.textContent = "Motiv";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Motiv");

    themes.forEach((theme) => {
      const option = document.createElement("option");
      option.value = theme.id;
      option.textContent = theme.label;
      select.appendChild(option);
    });

    select.value = initialTheme;
    select.addEventListener("change", () => {
      root.dataset.theme = select.value;
      try {
        localStorage.setItem(storageKey, select.value);
      } catch (error) {
        // Ignore storage errors (private mode, blocked storage).
      }
    });

    wrapper.append(label, select);
    document.body.appendChild(wrapper);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSwitcher);
  } else {
    buildSwitcher();
  }
})();
