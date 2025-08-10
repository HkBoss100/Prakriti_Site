// On test.html: calculate and store dosha
const form = document.getElementById('dosha-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    // Only count quiz answers, skip mode dropdown
    for (let [name, val] of data.entries()) {
      if (name !== 'mode') {
        scores[val]++;
      }
    }

    // Sort doshas by score (highest first)
    const sorted = Object.keys(scores)
      .sort((a, b) => scores[b] - scores[a]);

    // Build result string (include ties if scores match)
    let result = sorted[0][0].toUpperCase() + sorted[0].slice(1);
    if (scores[sorted[1]] === scores[sorted[0]]) {
      result += "–" + (sorted[1][0].toUpperCase() + sorted[1].slice(1));
    }

    // Store in localStorage
    localStorage.setItem('dosha', result);

    // Redirect to result page
    location.href = 'result.html';
  });
}

// On result.html: display dosha
const out = document.getElementById('result');
if (out) {
  const d = localStorage.getItem('dosha') || 'unknown';
  out.textContent = `Your dominant dosha is ${d}.`;
}
