export async function loadProject() {
  try {
    const response = await fetch("./assets/json-data/project.json");

    if (!response.ok) {
      throw new Error("Failed to load project.json");
    }

    const data = await response.json();
    const projectList = document.querySelector("#project-list");

    if (!projectList) return;

    projectList.innerHTML = `
  <div class="row g-4">
    ${data.projects
      .map((project) => {
        return `
          <div class="col-12 col-md-6">
            <div class="card h-100 border-5 rounded-3 overflow-hidden">
              <img 
                src="${project.image}" 
                class="card-img-top project-img" 
                alt="${project.name}"
              >

              <div class="card-body d-flex flex-column">
                <h4 class="card-title primary-color fw-bold">
                  ${project.name}
                </h4>

                <p class="project-description card-text secondary-color">
                  ${project.description}
                </p>

                <div class="project-tech-list d-flex gap-2 flex-wrap mb-3">
                  ${project.technologies
                    .map((tech) => {
                      return `
                        <span class="project-tech-box bg-primary-color text-white d-inline-flex align-items-center justify-content-center rounded-2">
                          ${
                            tech.iconType === "image"
                              ? `<img src="${tech.icon}" alt="technology icon" class="project-tech-icon">`
                              : tech.icon || `<i class="fa-solid fa-code"></i>`
                          }
                        </span>
                      `;
                    })
                    .join("")}
                </div>

                <div class="mt-auto d-flex gap-2 flex-wrap">
                  ${project.links
                    .map((link) => {
                      return `
                        <a 
                          href="${link.href}" 
                          target="_blank"
                          class="btn bg-primary-color text-white project-btn"
                        >
                          <i class="${link.icon} me-1"></i>
                          ${link.label}
                        </a>
                      `;
                    })
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("")}
  </div>
`;
  } catch (error) {
    console.error("Project Error:", error);
  }
}
