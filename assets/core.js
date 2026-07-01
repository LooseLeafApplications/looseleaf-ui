/**
 * LooseLeaf UI - Core Behaviors
 * Agnostic component logic based on data-attributes.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global Click Listener for Event Delegation
  document.addEventListener("click", (event) => {
    // ==========================================================================
    // [T3-04] THE ACCORDION LOGIC
    // ==========================================================================
    const accordionBtn = event.target.closest(".c-accordion__trigger");

    if (accordionBtn) {
      const accordion = accordionBtn.closest("[data-ll-accordion]");
      if (!accordion) return;

      const targetId = accordionBtn.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);
      const isExpanded = accordionBtn.getAttribute("aria-expanded") === "true";

      if (targetPanel) {
        if (isExpanded) {
          targetPanel.classList.remove("is-open");
          accordionBtn.setAttribute("aria-expanded", "false");
        } else {
          targetPanel.classList.add("is-open");
          accordionBtn.setAttribute("aria-expanded", "true");
        }
      }
    }

    // ==========================================================================
    // [T3-05] THE DROPDOWN LOGIC
    // ==========================================================================
    const toggleBtn = event.target.closest('[data-ll-toggle="dropdown"]');

    if (toggleBtn) {
      const wrapper = toggleBtn.closest(".c-dropdown-wrapper");
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

      document
        .querySelectorAll(".c-dropdown-wrapper.is-open")
        .forEach((openWrapper) => {
          if (openWrapper !== wrapper) {
            openWrapper.classList.remove("is-open");
            openWrapper
              .querySelector('[data-ll-toggle="dropdown"]')
              .setAttribute("aria-expanded", "false");
          }
        });

      if (isExpanded) {
        wrapper.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        wrapper.classList.add("is-open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    } else {
      if (!event.target.closest(".c-dropdown-wrapper")) {
        document
          .querySelectorAll(".c-dropdown-wrapper.is-open")
          .forEach((wrapper) => {
            wrapper.classList.remove("is-open");
            wrapper
              .querySelector('[data-ll-toggle="dropdown"]')
              .setAttribute("aria-expanded", "false");
          });
      }
    }

    // ==========================================================================
    // [T4-03] THE NAVBAR COLLAPSE LOGIC
    // ==========================================================================
    const collapseBtn = event.target.closest('[data-ll-toggle="collapse"]');

    if (collapseBtn) {
      const targetId = collapseBtn.getAttribute("aria-controls");
      const targetElement = document.getElementById(targetId);
      const isExpanded = collapseBtn.getAttribute("aria-expanded") === "true";

      if (targetElement) {
        if (isExpanded) {
          targetElement.classList.remove("is-open");
          collapseBtn.setAttribute("aria-expanded", "false");
        } else {
          targetElement.classList.add("is-open");
          collapseBtn.setAttribute("aria-expanded", "true");
        }
      }
    }
  });
});
