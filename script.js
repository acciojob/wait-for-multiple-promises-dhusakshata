//your JS code here. If required.
// script.js
const tableBody = document.getElementById("output");

function createPromise(name) {
  const minTime = 1000; // 1 second (in milliseconds)
  const maxTime = 3000; // 3 seconds (in milliseconds)

  const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime / 1000); // Resolves the promise with time taken in seconds
    }, randomTime);
  });
}

function populateTable(data) {
  data.forEach((item) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const timeCell = document.createElement("td");

    nameCell.textContent = item.name;
    timeCell.textContent = item.time.toFixed(3);

    row.appendChild(nameCell);
    row.appendChild(timeCell);

    tableBody.appendChild(row);
  });
}

// By default, add a row that spans 2 columns with the exact text Loading...
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.setAttribute("colspan", "2");
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

Promise.all(promises)
  .then((results) => {
    const total = results.reduce((acc, time) => acc + time, 0);
    const data = [
      { name: "Promise 1", time: results[0] },
      { name: "Promise 2", time: results[1] },
      { name: "Promise 3", time: results[2] },
      { name: "Total", time: total },
    ];

    // Remove the loading row
    tableBody.removeChild(loadingRow);

    // Populate the table with the required values
    populateTable(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
