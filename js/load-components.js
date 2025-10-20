// ==================== COMPONENT LOADER ====================

// Global variables to track loaded components
let headerLoaded = false;
let footerLoaded = false;

// Load header component
function loadHeader() {
  if (headerLoaded) {
    console.log("Header already loaded");
    return Promise.resolve();
  }

  return fetch("components/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      // Insert header before the first element in body
      const body = document.body;
      const firstChild = body.firstElementChild;

      // Create a temporary div to hold the header HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data;
      const headerElement = tempDiv.firstElementChild;

      // Insert header at the beginning of body
      body.insertBefore(headerElement, firstChild);

      headerLoaded = true;
      console.log("Header loaded successfully");

      // Initialize header functionality after loading
      initializeHeaderFunctions();
    })
    .catch((error) => {
      console.error("Error loading header:", error);
      // Show fallback message
      showComponentError("Header component could not be loaded");
    });
}

// Load footer component
function loadFooter() {
  if (footerLoaded) {
    console.log("Footer already loaded");
    return Promise.resolve();
  }

  return fetch("components/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      // Insert footer at the end of body
      document.body.insertAdjacentHTML("beforeend", data);

      footerLoaded = true;
      console.log("Footer loaded successfully");
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
      // Show fallback message
      showComponentError("Footer component could not be loaded");
    });
}

// Initialize header functions after component is loaded
function initializeHeaderFunctions() {
  // Wait a bit for DOM to be ready
  setTimeout(() => {
    try {
      // Initialize cart count
      if (typeof updateCartCount === "function") {
        updateCartCount();
      }

      // Initialize search suggestions
      if (typeof initializeSearchSuggestions === "function") {
        initializeSearchSuggestions();
      }

      // Initialize location reminder
      if (typeof initializeLocationReminder === "function") {
        initializeLocationReminder();
      }

      // Initialize dropdown menus
      if (typeof initializeDropdownMenus === "function") {
        initializeDropdownMenus();
      }

      console.log("Header functions initialized");
    } catch (error) {
      console.error("Error initializing header functions:", error);
    }
  }, 100);
}

// Show component error message
function showComponentError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #ff4444;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    max-width: 300px;
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

// Load all components
function loadAllComponents() {
  console.log("Loading all components...");

  // Load header and footer in parallel
  Promise.all([loadHeader(), loadFooter()])
    .then(() => {
      console.log("All components loaded successfully");
    })
    .catch((error) => {
      console.error("Error loading components:", error);
    });
}

// Load specific components based on page needs
function loadPageComponents(components = ["header", "footer"]) {
  const loadPromises = [];

  if (components.includes("header")) {
    loadPromises.push(loadHeader());
  }

  if (components.includes("footer")) {
    loadPromises.push(loadFooter());
  }

  return Promise.all(loadPromises);
}

// Check if components are loaded
function isComponentLoaded(component) {
  switch (component) {
    case "header":
      return headerLoaded;
    case "footer":
      return footerLoaded;
    default:
      return false;
  }
}

// Reload a specific component
function reloadComponent(component) {
  switch (component) {
    case "header":
      headerLoaded = false;
      const existingHeader = document.querySelector("header");
      if (existingHeader) {
        existingHeader.remove();
      }
      return loadHeader();
    case "footer":
      footerLoaded = false;
      const existingFooter = document.querySelector("footer");
      if (existingFooter) {
        existingFooter.remove();
      }
      return loadFooter();
    default:
      console.error("Unknown component:", component);
      return Promise.reject("Unknown component");
  }
}

// Auto-load components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're in a browser environment
  if (typeof window !== "undefined" && typeof fetch !== "undefined") {
    loadAllComponents();
  } else {
    console.warn(
      "Component loader requires a modern browser with fetch support"
    );
  }
});

// Export functions for manual use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadHeader,
    loadFooter,
    loadAllComponents,
    loadPageComponents,
    isComponentLoaded,
    reloadComponent,
  };
}
