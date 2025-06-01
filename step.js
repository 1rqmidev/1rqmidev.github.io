const maxSteps = 6;
const elementsState = new Map();
let isEnabled = window.innerWidth > 1000;

function getVisibleRatio(el) {
  const rect = el.getBoundingClientRect();
  const height = rect.height;
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return 0;

  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, window.innerHeight);
  const visibleHeight = visibleBottom - visibleTop;

  return Math.max(0, Math.min(1, visibleHeight / height));
}

function isFullyPast(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom < 0;
}

function isFullyBefore(el) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

function updateElementState(el) {
  if (!isEnabled) return;

  if (!elementsState.has(el)) {
    elementsState.set(el, { steps: 0 });
    el.classList.add(`step-0`);
  }

  const state = elementsState.get(el);

  if (isFullyPast(el)) {
    if (state.steps !== 0) {
      state.steps = 0;
      updateElementClasses(el, 0);
    }
  } else if (isFullyBefore(el)) {
    if (state.steps !== maxSteps) {
      state.steps = maxSteps;
      updateElementClasses(el, maxSteps);
    }
  } else {
    const ratio = getVisibleRatio(el);
    const newStep = Math.round(ratio * maxSteps);
    if (state.steps !== newStep) {
      state.steps = newStep;
      updateElementClasses(el, newStep);
    }
  }
}

function updateElementClasses(el, step) {
  for (let i = 0; i <= maxSteps; i++) {
    el.classList.remove(`step-${i}`);
  }
  el.classList.add(`step-${step}`);
  console.log(`Element updated to step ${step}`);
}

function handleScroll() {
  if (!isEnabled) return;
  document.querySelectorAll(".step-element").forEach((el) => {
    updateElementState(el);
  });
}

function handleResize() {
  const newEnabledState = window.innerWidth > 1000;
  if (newEnabledState !== isEnabled) {
    isEnabled = newEnabledState;
    if (!isEnabled) {
      // Reset all elements to step-0 when disabled
      document.querySelectorAll(".step-element").forEach((el) => {
        updateElementClasses(el, 0);
      });
    } else {
      // Reinitialize when enabled
      document.querySelectorAll(".step-element").forEach((el) => {
        updateElementState(el);
      });
    }
  }
}

// Initialize
document.querySelectorAll(".step-element").forEach((el) => {
  elementsState.set(el, { steps: 0 });
  el.classList.add("step-0");
});

// Efficient scroll handling
let isTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!isEnabled) return;
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  },
  { passive: true }
);

// Handle resize events
window.addEventListener(
  "resize",
  () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleResize();
        isTicking = false;
      });
      isTicking = true;
    }
  },
  { passive: true }
);

// Initial check
handleResize();
