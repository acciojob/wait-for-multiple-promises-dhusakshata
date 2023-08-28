function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const promises = [
    Promise.resolve(delay(Math.random() * 2000 + 1000)),  // Between 1 and 3 seconds
    Promise.resolve(delay(Math.random() * 2000 + 1000)),
    Promise.resolve(delay(Math.random() * 2000 + 1000))
  ];

  const start = performance.now();
  await Promise.all(promises);
  const end = performance.now();
  const totalTime = (end - start) / 1000;

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  promises.forEach((promise, index) => {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = `Promise ${index + 1}`;
    cell2.textContent = `${(promise._settledValue ? promise._settledValue - start : 0) / 1000}`;
    row.appendChild(cell1);
    row.appendChild(cell2);
    tableBody.appendChild(row);
  });

  const totalRow = document.createElement('tr');
  const totalCell1 = document.createElement('td');
  const totalCell2 = document.createElement('td');
  totalCell1.textContent = 'Total';
  totalCell2.textContent = totalTime.toFixed(3);
  totalRow.appendChild(totalCell1);
  totalRow.appendChild(totalCell2);
  tableBody.appendChild(totalRow);
}

main();
