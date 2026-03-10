(function() {
  function getTargets(target) {
    if (!target) {
      return Array.from(document.querySelectorAll('.full-width-rule'));
    }

    if (typeof target === 'string') {
      return Array.from(document.querySelectorAll(target));
    }

    if (target instanceof Element) {
      return [target];
    }

    return Array.from(target).filter((element) => element instanceof Element);
  }

  function measureCharacterWidth(element) {
    const probe = document.createElement('span');
    const style = window.getComputedStyle(element);

    probe.textContent = 'X';
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.whiteSpace = 'pre';
    probe.style.font = style.font;
    probe.style.letterSpacing = style.letterSpacing;
    document.body.appendChild(probe);

    const charWidth = probe.getBoundingClientRect().width || 1;
    document.body.removeChild(probe);
    return charWidth;
  }

  function renderRule(element, ruleChar) {
    const charWidth = measureCharacterWidth(element);
    const availableWidth = element.getBoundingClientRect().width;
    const count = Math.max(1, Math.floor(availableWidth / charWidth));
    element.textContent = ruleChar.repeat(count);
  }

  function fillRule(target, options = {}) {
    const elements = getTargets(target);

    elements.forEach((element) => {
      const ruleChar = options.char || element.dataset.ruleChar || '-';
      renderRule(element, ruleChar);
    });
  }

  function initializeRules() {
    fillRule();
  }

  window.fillRule = fillRule;

  window.addEventListener('resize', initializeRules);

  if (document.fonts?.ready) {
    document.fonts.ready.then(initializeRules);
  } else {
    window.addEventListener('load', initializeRules);
  }
})();