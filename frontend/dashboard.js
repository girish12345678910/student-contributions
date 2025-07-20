// dashboard.js

window.onload = function () {
  const tbody = document.querySelector("#contributionTable tbody");
  const records = JSON.parse(localStorage.getItem("contributions")) || [];

  records.forEach((rec, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rec.name}</td>
      <td>${rec.year}</td>
      <td>${rec.amount}</td>
      <td>${rec.date}</td>
      <td><button onclick="deleteRecord(${idx})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
};

function deleteRecord(index) {
  const records = JSON.parse(localStorage.getItem("contributions")) || [];
  records.splice(index, 1);
  localStorage.setItem("contributions", JSON.stringify(records));
  location.reload();
}
