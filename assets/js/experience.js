export async function loadExperience() {
  try {
    const response = await fetch("./assets/json-data/experience.json");

    if (!response.ok) {
      throw new Error("Failed to load experience.json");
    }

    const data = await response.json();

    const experienceList = document.querySelector("#experience-list");

    if (!experienceList) return;

    experienceList.innerHTML = data.experiences
      .map((experience) => {
        return `
          <div class="experience-item">
            <div class="experience-card bg-light p-4 mb-3 rounded shadow-sm primary-color">
              <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
                <div>
                  <h3 class="experience-title">
                    ${experience.jobTitle}
                  </h3>

                  <h6 class="experience-company">
                    ${experience.company}
                  </h6>
                </div>

                <span class="experience-period">
                  ${experience.period}
                </span>
              </div>

              <ul class="experience-responsibilities">
                ${experience.responsibilities
                  .map((responsibility) => {
                    return `<li>${responsibility}</li>`;
                  })
                  .join("")}
              </ul>

              <p class="experience-tools">
                <strong>Tools:</strong>
                ${experience.tools.join(" - ")}
              </p>
            </div>
          </div>
        `;
      })
      .join("");

  } catch (error) {
    console.error("Experience Error:", error);
  }
}