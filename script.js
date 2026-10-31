(function () {
  var screen = document.getElementById('screen');
  var pill = document.getElementById('pill');
  var button = document.getElementById('step');
  var label = document.getElementById('step-label');
  var caption = document.getElementById('caption');

  // terminal text for each step
  var list = '<span class="p">$</span> snapper list\n' +
    '<span class="d"> #  | Type   | Date             | Description</span>\n' +
    ' 0  | single |                  | current\n' +
    ' 41 | single | Oct 31 09:14     | before update\n';

  var broken = list + '\n<span class="p">$</span> sudo pacman -Syu\n' +
    '<span class="d">...</span>\n' +
    '<span class="e">error: the graphics driver failed to load</span>\n' +
    '<span class="e">desktop session did not start</span>\n';

  var rolled = broken + '\n<span class="p">$</span> sudo snapper rollback 41\n' +
    'Creating read-only snapshot of current system. (Snapshot 42.)\n' +
    'Creating read-write snapshot of snapshot 41. (Snapshot 43.)\n' +
    'Setting default subvolume to snapshot 43.\n' +
    '<span class="p">$</span> sudo reboot\n';

  // what each click shows
  var steps = [
    { html: list, pill: 'System working', bad: false, button: 'Break something', caption: "Everything works, and there's a snapshot from this morning." },
    { html: broken, pill: "Desktop won't start", bad: true, button: 'Roll over', caption: 'An update went wrong. Normally this is where the afternoon disappears.' },
    { html: rolled, pill: 'System working', bad: false, button: 'Start again', caption: "Back on this morning's snapshot after one command and a reboot." }
  ];

  var current = 0;
  function render() {
    var s = steps[current];
    screen.innerHTML = s.html;
    pill.textContent = s.pill;
    pill.classList.toggle('bad', s.bad);
    label.textContent = s.button;
    caption.textContent = s.caption;
  }
  button.addEventListener('click', function () {
    current = (current + 1) % steps.length;
    if (current === 2) button.classList.toggle('rolled');
    render();
  });
  render();
})();
