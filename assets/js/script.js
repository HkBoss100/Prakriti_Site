// On test.html: calculate and store dosha
const form = document.getElementById('dosha-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const scores = { vata:0, pitta:0, kapha:0 };
    for (let val of data.values()) scores[val]++;
    const dominant = Object.keys(scores)
      .reduce((a,b) => scores[a] > scores[b] ? a : b);
    localStorage.setItem('dosha', dominant);
    location.href = 'result.html';
  });
}
// On result.html: display dosha
const out = document.getElementById('result');
if (out) {
  const d = localStorage.getItem('dosha') || 'unknown';
  out.textContent = `Your dominant dosha is ${d[0].toUpperCase() + d.slice(1)}.`;
}
