function toggleCourseInput(show) {
  const courseDetails = document.getElementById("courseDetails");
  if (show) {
    courseDetails.classList.remove("hidden");
  } else {
    courseDetails.classList.add("hidden");
    document.getElementById("courseCount").value = 1; // Reset the number to 1
    clearCourseInputs(); // Clear the dynamically added course fields
  }
}

function incrementCourseCount() {
  const courseCountInput = document.getElementById("courseCount");
  let currentValue = parseInt(courseCountInput.value);
  courseCountInput.value = currentValue + 1;
  createCourseInputs();
}

function decrementCourseCount() {
  const courseCountInput = document.getElementById("courseCount");
  let currentValue = parseInt(courseCountInput.value);
  if (currentValue > 1) {
    courseCountInput.value = currentValue - 1;
    createCourseInputs();
  }
}

function createCourseInputs() {
  const courseCount = document.getElementById("courseCount").value;
  const courseInputs = document.getElementById("courseInputs");

  clearCourseInputs(); // Clear previous inputs before adding new ones

  for (let i = 1; i <= courseCount; i++) {
    const label = document.createElement("label");
    label.innerHTML = "Course " + i + " Name:";
    const input = document.createElement("input");
    input.type = "text";
    input.name = "course" + i;
    input.classList.add("course-input");
    // input.required = true;

    courseInputs.appendChild(label);
    courseInputs.appendChild(input);
  }
}

function clearCourseInputs() {
  const courseInputs = document.getElementById("courseInputs");
  while (courseInputs.firstChild) {
    courseInputs.removeChild(courseInputs.firstChild);
  }
}
// Function to validate the form
function validateForm(event) {
  event.preventDefault(); // Prevent form submission for validation

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const course = document.getElementById("course").value.trim();
  const status = document.getElementById("status").value;
  const district = document.getElementById("district").value;
  const college = document.getElementById("college").value.trim();
  const batch = document.getElementById("batch").value;
  const whychoose = document.getElementById("whychoose").value.trim();
  const howknow = document.getElementById("howknow").value.trim();
  const attendedCourse = document.querySelector(
    'input[name="attendedCourse"]:checked'
  );

  // Name validation
  if (name.trim() === "") {
    alert("Please enter your full name.");
    return;
  }

  // Regular expression to allow only alphabetic characters and spaces
  let namePattern = /^[a-zA-Z\s]+$/;

  if (!namePattern.test(name)) {
    alert("Please enter a valid name with alphabetic characters only.");
    return;
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Contact validation (basic phone number validation)
  const contactPattern = /^[0-9]{10}$/;
  if (!contactPattern.test(contact)) {
    alert("Please enter a valid 10-digit contact number.");
    return;
  }

  // Validate course
  if (course === "") {
    alert("Please enter your course.");
    return;
  }

  // Validate status
  if (status === "") {
    alert("Please select your status.");
    return;
  }
  // Validate district
  if (district === "") {
    alert("Please select your status.");
    return;
  }

  // Validate college
  if (college === "") {
    alert("Please enter your college name.");
    return;
  }

  // Validate attendedCourse radio button
  if (!attendedCourse) {
    alert("Please select whether you have attended a course before.");
    return;
  }

  // If attended courses, validate the course count
  if (attendedCourse.value === "yes") {
    const courseCount = document.getElementById("courseCount").value;
    if (courseCount < 1) {
      alert("Please enter the number of courses you have completed.");
      return;
    }

    // Validate each dynamic course input
    for (let i = 1; i <= courseCount; i++) {
      const courseInput = document.querySelector(`input[name="course${i}"]`);
      if (!courseInput || courseInput.value.trim() === "") {
        alert(`Please enter the name of course ${i}.`);
        return;
      }
    }
  }

  // Validate batch
  if (batch === "") {
    alert("Please select your batch type.");
    return;
  }

  // Validate whychoose
  if (whychoose === "") {
    alert("Please tell us why we should choose you.");
    return;
  }

  // Validate howknow
  if (howknow === "") {
    alert("Please tell us how you heard about us.");
    return;
  }

  // If all validations pass
  alert("Form submitted successfully!");
  // Here you can submit the form data or process it further
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", validateForm);
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch the districts from the API
    fetch('http://127.0.0.1:8000/districts/autocomplete')
      .then(response => response.json())
      .then(data => {
        // Get the select element
        const districtSelect = document.getElementById('district');
  
        // Clear any existing options
        districtSelect.innerHTML = '';
  
        // Append new options from the API response
        data.forEach(district => {
          const option = document.createElement('option');
          option.value = district.value;  // Assuming the value field in API response
          option.text = district.label;   // Assuming the label field in API response
          districtSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  });
  
