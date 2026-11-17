// Load saved students from browser localStorage (starts empty if none saved yet)
let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const formSection = document.getElementById("formSection");
const showFormBtn = document.getElementById("showFormBtn");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const studentForm = document.getElementById("studentForm");

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Render the table rows
function renderTable() {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  if (students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-message">
          No student records found. Click "+ Add Student" to add one.
        </td>
      </tr>
    `;
    return;
  }

  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.rollNo}</td>
        <td>${student.name}</td>
        <td>${student.department}</td>
        <td>${student.email}</td>
        <td class="actions-cell">
          <button class="btn-edit" onclick="editStudent(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function openForm() {
  editIndex = -1;
  studentForm.reset();
  formTitle.textContent = "Add New Student";
  submitBtn.textContent = "Add Student";
  formSection.style.display = "block";
  showFormBtn.style.display = "none";
}

function closeForm() {
  formSection.style.display = "none";
  showFormBtn.style.display = "inline-block";
  studentForm.reset();
  editIndex = -1;
}

function saveStudent(event) {
  event.preventDefault();

  const studentData = {
    rollNo: document.getElementById("rollNo").value.trim(),
    name: document.getElementById("fullName").value.trim(),
    department: document.getElementById("department").value.trim(),
    email: document.getElementById("email").value.trim()
  };

  if (editIndex === -1) {
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
  }

  saveToStorage();
  renderTable();
  closeForm();
}

function editStudent(index) {
  editIndex = index;
  const student = students[index];

  document.getElementById("rollNo").value = student.rollNo;
  document.getElementById("fullName").value = student.name;
  document.getElementById("department").value = student.department;
  document.getElementById("email").value = student.email;

  formTitle.textContent = "Edit Student";
  submitBtn.textContent = "Update Student";
  formSection.style.display = "block";
  showFormBtn.style.display = "none";
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToStorage();
    renderTable();
  }
}

renderTable();