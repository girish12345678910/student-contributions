let events = [
  { id: 1, name: "Ganesh Chaturthi", projected: 59500, actual: 51905 },
  { id: 2, name: "Onam", projected: 25000, actual: 20000 },
];

let nextId = 3;
let isAdmin = false;

function login() {
  const password = document.getElementById("admin-pass").value;
  if (password === "admin123") {
    isAdmin = true;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadEvents();
  } else {
    alert("Wrong password!");
  }
}

function logout() {
  isAdmin = false;
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-section").style.display = "block";
}

function loadEvents() {


  const container = document.getElementById("events-container");
  container.innerHTML = "";

  events.forEach((event) => {
    const div = document.createElement("div");
    div.className = "event-card";

    div.innerHTML = `
      <input value="${event.name}" onchange="updateEvent(${event.id}, 'name', this.value)" ${!isAdmin ? "disabled" : ""}/>
      <input type="number" value="${event.projected}" onchange="updateEvent(${event.id}, 'projected', this.value)" ${!isAdmin ? "disabled" : ""}/>
      <input type="number" value="${event.actual}" onchange="updateEvent(${event.id}, 'actual', this.value)" ${!isAdmin ? "disabled" : ""}/>
      
      ${isAdmin ? `
        <button onclick="toggleProofUpload(${event.id})">🧾 Bills</button>
        <button onclick="deleteEvent(${event.id})">🗑️ Delete</button>
        <div id="proof-section-${event.id}" class="proof-section" style="display: none;">
          <input type="file" accept="image/*" onchange="uploadProof(event, ${event.id})" />
          <div class="proof-preview" id="proof-${event.id}">
            ${event.proofImage ? `
              <img src="${event.proofImage}" class="proof-img" alt="Proof" onclick="viewFullImage('${event.proofImage}')" />
              <button onclick="deleteProof(${event.id})">🗑️ Delete Image</button>
            ` : ""}
          </div>
        </div>
      ` : ""}
    `;

    container.appendChild(div);
  });
}

function updateEvent(id, field, value) {
  const event = events.find(e => e.id === id);
  if (event) {
    event[field] = field === 'name' ? value : Number(value);
  }
}

function addEvent() {
  if (!isAdmin) return alert("Only admin can add events.");
  const name = prompt("Enter event name:");
  const projected = prompt("Projected cost:");
  const actual = prompt("Actual cost:");

  if (name && projected && actual) {
    events.push({
      id: nextId++,
      name,
      projected: Number(projected),
      actual: Number(actual),
    });
    loadEvents();
  }
}

function deleteEvent(id) {
  if (!isAdmin) return;
  if (confirm("Are you sure you want to delete this event?")) {
    events = events.filter(e => e.id !== id);
    loadEvents();
  }
}

function toggleProofUpload(eventId) {
  const section = document.getElementById(`proof-section-${eventId}`);
  if (section) {
    section.style.display = section.style.display === "none" ? "block" : "none";
  }
}

function uploadProof(e, eventId) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (eventData) {
    const event = events.find(ev => ev.id === eventId);
    if (event) {
      event.proofImage = eventData.target.result;
      loadEvents(); // Refresh UI with preview
      toggleProofUpload(eventId); // Keep it open
    }
  };
  reader.readAsDataURL(file);
}

function deleteProof(eventId) {
  const event = events.find(ev => ev.id === eventId);
  if (event && event.proofImage) {
    if (confirm("Are you sure you want to delete this image?")) {
      event.proofImage = null;
      loadEvents();
      toggleProofUpload(eventId); // Keep it open
    }
  }
}

function viewFullImage(src) {
  const viewer = document.getElementById("fullscreen-img-view");
  const img = document.getElementById("full-img");
  img.src = src;
  viewer.style.display = "flex";
}

function closeFullImage() {
  document.getElementById("fullscreen-img-view").style.display = "none";
}


