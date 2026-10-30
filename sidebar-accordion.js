// Smooth open and close for the expandable sidebar sections.
// Mintlify mounts a section's page list when it opens and removes it when it
// closes, so the height is animated here around those two moments.
(() => {
  const DURATION = 220;
  const EASING = 'cubic-bezier(0.2, 0, 0, 1)';
  const TOGGLE = '#sidebar-content button[aria-expanded]';

  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const listOf = (button) => button.parentElement.querySelector(':scope > ul');

  function animateHeight(list, from, to, done) {
    list.style.overflow = 'hidden';
    list.style.height = `${from}px`;
    list.style.opacity = from === 0 ? '0' : '1';
    list.getBoundingClientRect();
    list.style.transition = `height ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`;
    list.style.height = `${to}px`;
    list.style.opacity = to === 0 ? '0' : '1';
    setTimeout(() => {
      if (done) done();
      ['overflow', 'height', 'opacity', 'transition'].forEach((p) => list.style.removeProperty(p));
    }, DURATION);
  }

  let opening = null;
  let closing = false;

  document.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest(TOGGLE);
      if (!button || reducedMotion()) return;

      if (button.getAttribute('aria-expanded') === 'false') {
        opening = { button, at: Date.now() };
        return;
      }

      // Closing: play the animation first, then let Mintlify close the section.
      if (closing) return;
      const list = listOf(button);
      if (!list) return;
      event.preventDefault();
      event.stopPropagation();
      animateHeight(list, list.scrollHeight, 0, () => {
        closing = true;
        button.click();
        closing = false;
      });
    },
    true
  );

  new MutationObserver(() => {
    if (!opening || Date.now() - opening.at > 1000) return;
    const list = listOf(opening.button);
    if (!list) return;
    opening = null;
    animateHeight(list, 0, list.scrollHeight);
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
