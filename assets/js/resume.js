(function () {
  'use strict';

  var STORAGE_KEY = 'resume-layout';
  var layout = document.getElementById('layout');
  var main = document.getElementById('col-main');
  var side = document.getElementById('col-side');
  var toggle = document.getElementById('layout-toggle');
  var label = document.getElementById('layout-toggle-label');

  var layoutIcon = document.getElementById('layout-icon');
  var TWO_COL_ICON = 'fa-table-columns';
  var ONE_COL_ICON = 'fa-align-left';

  function apply(twoColumn) {
    main.className = twoColumn ? 'col-md-8' : 'col-12';
    side.className = (twoColumn ? 'col-md-4' : 'col-12') + ' sidebar';
    layout.classList.toggle('layout-single', !twoColumn);
    toggle.setAttribute('aria-pressed', String(twoColumn));
    // Each control shows the state it will switch TO, not the current one.
    layoutIcon.classList.toggle(ONE_COL_ICON, twoColumn);
    layoutIcon.classList.toggle(TWO_COL_ICON, !twoColumn);
    label.textContent = twoColumn ? 'Switch to single column' : 'Switch to two columns';
  }

  var stored = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    // Storage can be unavailable in private browsing. Fall back to the default.
  }

  var twoColumn = stored !== 'single';
  apply(twoColumn);

  toggle.addEventListener('click', function () {
    twoColumn = !twoColumn;
    apply(twoColumn);
    try {
      window.localStorage.setItem(STORAGE_KEY, twoColumn ? 'two' : 'single');
    } catch (e) {
      // Ignore storage failures; the toggle still works for this visit.
    }
  });

  // Theme: auto follows the OS via prefers-color-scheme and needs no attribute;
  // light and dark pin the choice. A pre-paint script in the document head
  // applies a stored value before first render.
  var THEMES = ['auto', 'light', 'dark'];
  var THEME_ICONS = { auto: 'fa-circle-half-stroke', light: 'fa-sun', dark: 'fa-moon' };
  var THEME_LABELS = {
    auto: 'Theme: follow the system',
    light: 'Theme: light',
    dark: 'Theme: dark',
  };
  var THEME_KEY = 'resume-theme';
  var themeBtn = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');
  var themeLabel = document.getElementById('theme-label');
  var theme = 'auto';

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Bootstrap's own components read data-bs-theme, and it needs the resolved
  // theme rather than 'auto', so it is tracked separately and updated when the
  // OS preference changes.
  function syncBootstrapTheme() {
    var resolved = theme === 'auto' ? (darkQuery.matches ? 'dark' : 'light') : theme;
    document.documentElement.setAttribute('data-bs-theme', resolved);
  }

  darkQuery.addEventListener('change', syncBootstrapTheme);

  function applyTheme(next) {
    theme = next;
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    syncBootstrapTheme();
    THEMES.forEach(function (name) {
      themeIcon.classList.toggle(THEME_ICONS[name], name === theme);
    });
    themeLabel.textContent = THEME_LABELS[theme];
    themeBtn.setAttribute('title', THEME_LABELS[theme]);
  }

  try {
    var storedTheme = window.localStorage.getItem(THEME_KEY);
    if (THEMES.indexOf(storedTheme) !== -1) theme = storedTheme;
  } catch (e) {
    // Storage can be unavailable in private browsing.
  }

  applyTheme(theme);

  themeBtn.addEventListener('click', function () {
    applyTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]);
    try {
      if (theme === 'auto') window.localStorage.removeItem(THEME_KEY);
      else window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Ignore storage failures.
    }
  });

  // Landscape mode: let the sheet fill the window instead of sitting at
  // printed-page width.
  var resume = document.querySelector('.resume');
  var widthBtn = document.getElementById('width-toggle');
  var widthIcon = document.getElementById('width-icon');
  var widthLabel = document.getElementById('width-toggle-label');
  var WIDTH_KEY = 'resume-width';
  var EXPAND_ICON = 'fa-up-right-and-down-left-from-center';
  var SHRINK_ICON = 'fa-down-left-and-up-right-to-center';

  function applyWidth(wide) {
    resume.classList.toggle('is-wide', wide);
    widthBtn.setAttribute('aria-pressed', String(wide));
    widthIcon.classList.toggle(EXPAND_ICON, !wide);
    widthIcon.classList.toggle(SHRINK_ICON, wide);
    widthLabel.textContent = wide ? 'Shrink to page width' : 'Expand to full window width';
  }

  var widthStored = null;
  try {
    widthStored = window.localStorage.getItem(WIDTH_KEY);
  } catch (e) {
    // Storage can be unavailable in private browsing.
  }

  var isWide = widthStored === 'wide';
  applyWidth(isWide);

  widthBtn.addEventListener('click', function () {
    isWide = !isWide;
    applyWidth(isWide);
    try {
      window.localStorage.setItem(WIDTH_KEY, isWide ? 'wide' : 'page');
    } catch (e) {
      // Ignore storage failures.
    }
  });

  // Text size. Steps a custom property so the print rule stays in charge
  // of the PDF.
  var FONT_STEPS = [12, 15, 18, 21];
  var FONT_DEFAULT = 15;
  var FONT_KEY = 'resume-font';
  var fontIndex = FONT_STEPS.indexOf(FONT_DEFAULT);

  function applyFont() {
    document.documentElement.style.setProperty('--screen-font-size', FONT_STEPS[fontIndex] + 'px');
    document.getElementById('font-down').disabled = fontIndex === 0;
    document.getElementById('font-up').disabled = fontIndex === FONT_STEPS.length - 1;
  }

  // Stored as the pixel size rather than an index, so adding steps later
  // cannot silently remap what a returning visitor had chosen.
  try {
    var storedFont = parseInt(window.localStorage.getItem(FONT_KEY), 10);
    if (FONT_STEPS.indexOf(storedFont) !== -1) {
      fontIndex = FONT_STEPS.indexOf(storedFont);
    }
  } catch (e) {
    // Storage can be unavailable in private browsing.
  }

  applyFont();

  function stepFont(delta) {
    var next = fontIndex + delta;
    if (next < 0 || next >= FONT_STEPS.length) return;
    fontIndex = next;
    applyFont();
    try {
      window.localStorage.setItem(FONT_KEY, String(FONT_STEPS[fontIndex]));
    } catch (e) {
      // Ignore storage failures.
    }
  }

  document.getElementById('font-up').addEventListener('click', function () {
    stepFont(1);
  });
  document.getElementById('font-down').addEventListener('click', function () {
    stepFont(-1);
  });

  // Middle-click or triple-tap anywhere on the toolbar restores every
  // display option to its default: two columns, page width, default zoom.
  // Function declarations hoist, so the applyX helpers below are already
  // bound by the time a gesture can fire.
  function resetAll() {
    applyTheme('auto');
    twoColumn = true;
    apply(twoColumn);
    isWide = false;
    applyWidth(isWide);
    fontIndex = FONT_STEPS.indexOf(FONT_DEFAULT);
    applyFont();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(WIDTH_KEY);
      window.localStorage.removeItem(FONT_KEY);
      window.localStorage.removeItem(THEME_KEY);
    } catch (e) {
      // Ignore storage failures.
    }
  }

  var toolbar = document.querySelector('.toolbar');

  // Chrome starts autoscroll on middle mousedown, so suppress that before
  // acting on the auxclick that follows. Middle-click is safe anywhere on
  // the bar, buttons included, since they only respond to the primary
  // button.
  toolbar.addEventListener('mousedown', function (ev) {
    if (ev.button === 1) ev.preventDefault();
  });

  toolbar.addEventListener('auxclick', function (ev) {
    if (ev.button !== 1) return;
    ev.preventDefault();
    resetAll();
  });

  // Triple-tap: three taps in quick succession without wandering. Taps that
  // land on a button are ignored, so tapping zoom three times zooms three
  // times rather than undoing itself.
  var TAP_WINDOW = 500;
  var TAP_SLOP = 24;
  var tapCount = 0;
  var lastTapAt = 0;
  var lastTapX = 0;
  var lastTapY = 0;

  toolbar.addEventListener('touchend', function (ev) {
    if (ev.touches.length > 0) return;
    if (ev.target.closest && ev.target.closest('button')) return;
    var touch = ev.changedTouches[0];
    if (!touch) return;
    var near =
      Math.abs(touch.clientX - lastTapX) < TAP_SLOP &&
      Math.abs(touch.clientY - lastTapY) < TAP_SLOP;
    tapCount = ev.timeStamp - lastTapAt < TAP_WINDOW && near ? tapCount + 1 : 1;
    lastTapAt = ev.timeStamp;
    lastTapX = touch.clientX;
    lastTapY = touch.clientY;
    if (tapCount >= 3) {
      tapCount = 0;
      ev.preventDefault();
      resetAll();
    }
  });

  // Text size from the keyboard, taking over the browser's own zoom keys on
  // this page so the two cannot drift apart. These are preventable in
  // Chrome, Firefox, and Safari, unlike most browser chrome shortcuts.
  function resetFont() {
    var target = FONT_STEPS.indexOf(FONT_DEFAULT);
    if (fontIndex === target) return;
    fontIndex = target;
    applyFont();
    try {
      window.localStorage.removeItem(FONT_KEY);
    } catch (e) {
      // Ignore storage failures.
    }
  }

  document.addEventListener('keydown', function (ev) {
    if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return;
    var key = ev.key;
    var code = ev.code;
    if (key === '0' || code === 'Digit0' || code === 'Numpad0') {
      ev.preventDefault();
      resetFont();
    } else if (key === '+' || key === '=' || code === 'Equal' || code === 'NumpadAdd') {
      ev.preventDefault();
      stepFont(1);
    } else if (key === '-' || key === '_' || code === 'Minus' || code === 'NumpadSubtract') {
      ev.preventDefault();
      stepFont(-1);
    }
  });

  // Help overlay. A native dialog handles Escape and focus for us.
  var helpDialog = document.getElementById('help-dialog');

  function openHelp() {
    if (helpDialog.open) return;
    if (helpDialog.showModal) helpDialog.showModal();
    else helpDialog.setAttribute('open', '');
  }

  document.getElementById('help-btn').addEventListener('click', openHelp);
  document.getElementById('help-close').addEventListener('click', function () {
    helpDialog.close();
  });

  // Click the backdrop to dismiss: the dialog's own box is inset, so a
  // click reported outside its rectangle came from the backdrop.
  helpDialog.addEventListener('click', function (ev) {
    var r = helpDialog.getBoundingClientRect();
    if (
      ev.clientX < r.left ||
      ev.clientX > r.right ||
      ev.clientY < r.top ||
      ev.clientY > r.bottom
    ) {
      helpDialog.close();
    }
  });

  // Ctrl+/ opens the help. Shift is optional: on most layouts ? is the
  // shifted slash, so both readings land on the same physical key, and the
  // code check covers layouts that report neither character.
  document.addEventListener('keydown', function (ev) {
    if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return;
    if (ev.key !== '/' && ev.key !== '?' && ev.code !== 'Slash' && ev.code !== 'NumpadDivide') {
      return;
    }
    ev.preventDefault();
    openHelp();
  });

  // Escape restores every display option. Skipped while the help dialog is
  // open, because Escape is how a native dialog is dismissed and closing it
  // should not also wipe the reader's layout.
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape' || helpDialog.open) return;
    resetAll();
  });

  // Earlier roles: collapsed to a compact list, or expanded into full
  // entries that read as a continuation of Experience.
  var earlier = document.getElementById('earlier');
  var earlierBtn = document.getElementById('earlier-toggle');
  var earlierSign = document.getElementById('earlier-toggle-sign');
  var earlierLabel = document.getElementById('earlier-toggle-label');
  var earlierCompact = document.getElementById('earlier-compact-wrap');
  var earlierFull = document.getElementById('earlier-full-wrap');
  var EARLIER_KEY = 'resume-earlier';

  function applyEarlier(expanded) {
    earlier.classList.toggle('is-expanded', expanded);
    earlierCompact.classList.toggle('is-open', !expanded);
    earlierFull.classList.toggle('is-open', expanded);
    earlierBtn.setAttribute('aria-expanded', String(expanded));
    earlierSign.textContent = expanded ? '-' : '+';
    earlierLabel.textContent = expanded
      ? 'Collapse earlier roles'
      : 'Expand earlier roles into full entries';
  }

  var earlierStored = null;
  try {
    earlierStored = window.localStorage.getItem(EARLIER_KEY);
  } catch (e) {
    // Storage can be unavailable in private browsing.
  }

  var earlierExpanded = earlierStored === 'expanded';
  applyEarlier(earlierExpanded);

  earlierBtn.addEventListener('click', function () {
    earlierExpanded = !earlierExpanded;
    applyEarlier(earlierExpanded);
    try {
      window.localStorage.setItem(EARLIER_KEY, earlierExpanded ? 'expanded' : 'collapsed');
    } catch (e) {
      // Ignore storage failures; the toggle still works for this visit.
    }
  });

  document.getElementById('print-btn').addEventListener('click', function () {
    // Printing before the web fonts settle would lay the sheet out with
    // fallback metrics, which is exactly what pushes it onto a second page.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        window.print();
      });
    } else {
      window.print();
    }
  });
})();
