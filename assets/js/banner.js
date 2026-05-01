export async function loadBanner() {
  try {
    const response = await fetch("./assets/json-data/banner.json");

    if (!response.ok) {
      throw new Error("Failed to load banner.json");
    }

    const data = await response.json();

    document.querySelector("#banner-name").textContent = data.name;
    document.querySelector("#banner-job-title").textContent = data.jobTitle;
    document.querySelector("#banner-summary-title").textContent = data.summaryTitle;
    document.querySelector("#banner-description").textContent = data.profileDescription;

    const statsContainer = document.querySelector("#banner-stats");

    statsContainer.innerHTML = data.stats
      .map((stat) => {
        return `
          <li class="d-flex align-items-center justify-content-lg-center gap-2">
            <img src="../../assets/imgs/plus-vector.png" alt="plus" style="width: 15%;">

            <span class="fw-bold secondary-color" style="font-size: 4rem;">
              ${stat.value}
            </span>

            <span class="secondary-color">
              ${stat.label.join("<br>")}
            </span>
          </li>
        `;
      })
      .join("");

  } catch (error) {
    console.error("Banner Error:", error);
  }
}