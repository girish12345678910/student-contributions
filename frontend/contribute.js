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
