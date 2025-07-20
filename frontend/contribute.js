document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("student-name").value;
  const year = document.getElementById("student-year").value;
  const amount = parseInt(document.getElementById("amount").value);

  if (!name || !year || !amount || isNaN(amount)) {
    alert("Please fill all fields correctly.");
    return;
  }

  let paidStudents = JSON.parse(localStorage.getItem("paidStudents")) || [];

  paidStudents.push({
    name,
    year,
    amount,
    paymentId: "Manual via QR"
    
  });

  localStorage.setItem("paidStudents", JSON.stringify(paidStudents));
  alert("Marked as paid successfully!");

  document.getElementById("payment-form").reset();
});

function loadPaidStudents() {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  firebase.database().ref("paidStudents").once("value", snapshot => {
    let total = 0;
    snapshot.forEach(child => {
      const student = child.val();
      total += Number(student.amount);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.year}</td>
        <td>₹${student.amount}</td>
        <td>${student.paymentId}</td>
        <td>${student.timestamp || '-'}</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById("totalAmount").innerText = `Total Collected: ₹${total}`;
  });
}

