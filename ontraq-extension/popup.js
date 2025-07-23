const userId = "demo";

async function loadSummary() {
  const summaryDiv = document.getElementById("summary");

  try {
    const res = await fetch(
      `http://localhost:5001/api/report?userId=${userId}`
    );
    const data = await res.json();
    const { productive = 0, unproductive = 0 } = data.summary || {};

    const total = productive + unproductive;

    summaryDiv.innerHTML = `
      <p><strong>Total time:</strong> ${(total / 60).toFixed(1)} minutes</p>
      <p class="productive">🟢 Productive: ${(productive / 60).toFixed(
        1
      )} min</p>
      <p class="unproductive">🔴 Unproductive: ${(unproductive / 60).toFixed(
        1
      )} min</p>
    `;
  } catch (err) {
    summaryDiv.innerHTML = `<p>Error loading summary 😢</p>`;
    console.error(err);
  }
}

loadSummary();
