(function() {
  function buildFrame(container) {
    const img = container.querySelector('img');
    if (!img) return;

    const pre = document.createElement('pre');
    container.insertBefore(pre, img);

    // Measure a single character
    const span = document.createElement('span');
    span.textContent = 'X';
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    document.body.appendChild(span);
    const charW = span.getBoundingClientRect().width;
    const charH = span.getBoundingClientRect().height;
    document.body.removeChild(span);

    function redraw() {
      // cols = how many characters fit in the container (minus 2 for the | borders)
      const availableWidth = container.getBoundingClientRect().width;
      const cols = Math.floor(availableWidth / charW) - 2;

      // rows = maintain the image's natural aspect ratio
      const aspect = img.naturalWidth / img.naturalHeight;
      const imagePixelWidth = cols * charW;
      const imagePixelHeight = imagePixelWidth / aspect;
      const rows = Math.round(imagePixelHeight / charH);

      const top    = '+' + '-'.repeat(cols) + '+';
      const middle = '|' + ' '.repeat(cols) + '|';
      const bottom = '+' + '-'.repeat(cols) + '+';
      pre.textContent = [top, ...Array(rows).fill(middle), bottom].join('\n');

      img.style.position = 'absolute';
      img.style.left     = charW + 'px';
      img.style.top      = charH + 'px';
      img.style.width    = (charW * cols) + 'px';
      img.style.height   = (charH * rows) + 'px';
    }

    function init() {
      if (img.naturalWidth) {
        redraw();
      } else {
        img.addEventListener('load', redraw);
      }
      window.addEventListener('resize', redraw);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(init);
    } else {
      window.addEventListener('load', init);
    }
  }

  document.querySelectorAll('.ascii-frame').forEach(buildFrame);
})();