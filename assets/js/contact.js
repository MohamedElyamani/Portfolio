export async function loadContact() {
  try {
    const response = await fetch("./assets/json-data/contact.json");

    if (!response.ok) {
      throw new Error("Failed to load contact.json");
    }

    const data = await response.json();

    const contactList = document.querySelector("#contact-list");

    if (!contactList) return;

    contactList.innerHTML = data.contacts
      .map((contact) => {
        const tagName = contact.href ? "a" : "div";
        const href = contact.href ? `href="${contact.href}"` : "";
        const target = contact.href && contact.type !== "email" ? `target="_blank"` : "";

        return `
          <${tagName}
            ${href}
            ${target}
            class="d-flex align-items-center bg-primary-color text-white text-decoration-none contact-item">
            <div class="bg-secondary-color d-flex align-items-center justify-content-center fs-3 p-3">
              <i class="${contact.icon}"></i>
            </div>

            <div class="mx-auto text-center px-3 py-3">
              ${contact.value}
            </div>
          </${tagName}>
        `;
      })
      .join("");

  } catch (error) {
    console.error("Contact Error:", error);
  }
}