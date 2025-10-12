document.addEventListener('DOMContentLoaded', function () {
  function wireNavToggles(root){
    root.querySelectorAll('.nav-toggle').forEach(function(btn){
      btn.addEventListener('click', function(e){
        var li = btn.closest('.nav-item');
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        li.classList.toggle('open', !expanded);
      });
    });
  }

  // If our include produced nav markup, wire it up. Otherwise, attempt to inject into theme header.
  var existingNav = document.querySelector('.site-nav');
  if (existingNav) {
    wireNavToggles(existingNav);
  } else if (window.SITE_NAV && document.querySelector('#header_wrap')) {
    // build minimal nav and inject under header_wrap
    var nav = document.createElement('nav');
    nav.className = 'site-nav main-navigation';
    var ul = document.createElement('ul'); ul.className = 'nav-list menu';
    window.SITE_NAV.forEach(function(item){
      var li = document.createElement('li'); li.className = 'nav-item';
      if(item.children){
        li.classList.add('has-children');
        var btn = document.createElement('button'); btn.className = 'nav-toggle'; btn.setAttribute('aria-expanded','false'); btn.innerHTML = item.title + ' <span class="caret">▾</span>';
        li.appendChild(btn);
        var childUl = document.createElement('ul'); childUl.className = 'dropdown';
        item.children.forEach(function(c){
          var childLi = document.createElement('li'); childLi.className = 'dropdown-item';
          var a = document.createElement('a'); a.className='nav-link'; a.href = c.url; a.textContent = c.title;
          childLi.appendChild(a); childUl.appendChild(childLi);
        });
        li.appendChild(childUl);
      } else {
        var a = document.createElement('a'); a.className='nav-link'; a.href = item.url; a.textContent = item.title; li.appendChild(a);
      }
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    var headerWrap = document.querySelector('#header_wrap .inner') || document.querySelector('#header_wrap');
    if(headerWrap) headerWrap.appendChild(nav);
    wireNavToggles(nav);
  }

  // close dropdowns when clicking outside
  document.addEventListener('click', function(e){
    if (!e.target.closest('.site-nav')) {
      document.querySelectorAll('.nav-item.has-children.open').forEach(function(li){
        li.classList.remove('open');
        var toggle = li.querySelector('.nav-toggle');
        if(toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
