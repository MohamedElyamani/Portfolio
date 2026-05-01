import { loadBanner } from "./banner.js";
import { loadContact } from "./contact.js";
import { loadExperience } from "./experience.js";
import { loadSkills } from "./skills.js";
import { loadProject } from "./project.js";


async function loadComponent(selector, path) {
  const element = document.querySelector(selector);

  if (!element) return;

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }

    const html = await response.text();
    element.innerHTML = html;

  } catch (error) {
    console.error(error);
  }
}

const components = [
  { selector: "#navbar", path: "./components/navbar.html" },
  { selector: "#banner", path: "./components/banner.html" },
  { selector: "#experience", path: "./components/experience.html" },
  { selector: "#skills", path: "./components/skills.html" },
  { selector: "#project", path: "./components/project.html" },
  { selector: "#contact", path: "./components/contact.html" },
  { selector: "#footer", path: "./components/footer.html" },
];

await Promise.all(
  components.map((component) => {
    return loadComponent(component.selector, component.path);
  })
);

loadBanner();
loadExperience();
loadSkills();
loadProject();
loadContact();