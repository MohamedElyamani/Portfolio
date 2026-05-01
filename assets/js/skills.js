export async function loadSkills() {
  try {
    const response = await fetch("./assets/json-data/skills.json");

    if (!response.ok) {
      throw new Error("Failed to load skills.json");
    }

    const data = await response.json();
    const skillsList = document.querySelector("#skills-list");

    if (!skillsList) return;

    const activeCategory =
      data.skillCategories.find((category) => category.isActive) ||
      data.skillCategories[0];

    renderSkillsSection(data.skillCategories, activeCategory.id);

  } catch (error) {
    console.error("Skills Error:", error);
  }
}

function renderSkillsSection(categories, activeCategoryId) {
  const skillsList = document.querySelector("#skills-list");

  const activeCategory = categories.find((category) => {
    return category.id === activeCategoryId;
  });

  skillsList.innerHTML = `
    <div class="mt-5">
      <div class="row g-3 mb-4">
        ${categories
          .map((category) => {
            const activeClass =
              category.id === activeCategoryId
                ? "bg-primary-color"
                : "bg-secondary-color";

            return `
              <div class="col-6 col-md-4 col-lg-2">
                <button
                  class="skill-tab-btn btn w-100 text-white rounded-2 py-2 px-2 border-0 ${activeClass}"
                  data-category-id="${category.id}"
                >
                  ${category.title}
                </button>
              </div>
            `;
          })
          .join("")}
      </div>

      <div class="row g-4">
        ${activeCategory.skills
          .map((skill) => {
            return `
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="skill-card bg-primary-color text-white rounded-2 d-flex flex-column align-items-center justify-content-center text-center p-4">
                  <div class="skill-icon mb-3">
                    ${
                      skill.iconType === "image"
                        ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-img-icon">`
                        : skill.icon || `<i class="fa-solid fa-code"></i>`
                    }
                  </div>

                  <h4 class="fs-5 fw-medium mb-0">
                    ${skill.name}
                  </h4>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;

  const tabButtons = document.querySelectorAll(".skill-tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const categoryId = Number(this.dataset.categoryId);
      renderSkillsSection(categories, categoryId);
    });
  });
}