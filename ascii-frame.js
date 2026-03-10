(function() {
  const CHAR_COLS = 40;
  const CHAR_ROWS = 18;

  function buildFrame(container) {
    const img = container.querySelector('img');
    if (!img) return;

    const pre = document.createElement('pre');
    container.insertBefore(pre, img);

    const cols = parseInt(container.dataset.cols) || CHAR_COLS;
    const rows = parseInt(container.dataset.rows) || CHAR_ROWS;

    const top    = '+' + '-'.repeat(cols) + '+';
    const middle = '|' + ' '.repeat(cols) + '|';
    const bottom = '+' + '-'.repeat(cols) + '+';
    pre.textContent = [top, ...Array(rows).fill(middle), bottom].join('\n');

    function positionImage() {
      const span = document.createElement('span');
      span.textContent = 'X';
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      pre.appendChild(span);
      const charW = span.getBoundingClientRect().width;
      const charH = span.getBoundingClientRect().height;
      pre.removeChild(span);

      img.style.position = 'absolute';
      img.style.left     = charW + 'px';
      img.style.top      = charH + 'px';
      img.style.width    = (charW * cols) + 'px';
      img.style.height   = (charH * rows) + 'px';
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(positionImage);
    } else {
      window.addEventListener('load', positionImage);
    }
    window.addEventListener('resize', positionImage);
  }

  document.querySelectorAll('.ascii-frame').forEach(buildFrame);
})();