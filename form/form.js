document.addEventListener("DOMContentLoaded", () => {
  const districtSelect = document.getElementById("district");
  const courseSelect = document.getElementById("course");
  const collegeSelect = document.getElementById("college");
  const courseSearch = document.getElementById("courseSearch");
  const collegeSearch = document.getElementById("collegeSearch");
  const courseSuggestionsContainer = document.getElementById("courseSuggestions");
  const collegeSuggestionsContainer = document.getElementById("collegeSuggestions");

  // Fetch and populate districts
  fetch("http://127.0.0.1:8564/api/districts")
      .then((response) => response.json())
      .then((data) => {
          data.forEach((district) => {
              const option = document.createElement("option");
              option.value = district.id;
              option.textContent = district.name;
              districtSelect.appendChild(option);
          });
      })
      .catch((error) => console.error("Error fetching districts:", error));

  // Fetch and populate courses
  fetch("http://127.0.0.1:8564/api/courses")
      .then((response) => response.json())
      .then((data) => {
          data.forEach((course) => {
              const option = document.createElement("option");
              option.value = course.id;
              option.textContent = course.name;
              courseSelect.appendChild(option);
          });
      })
      .catch((error) => console.error("Error fetching courses:", error));

  // Fetch and populate colleges
  fetch("http://127.0.0.1:8564/api/colleges")
      .then((response) => response.json())
      .then((data) => {
          data.forEach((college) => {
              const option = document.createElement("option");
              option.value = college.id;
              option.textContent = college.name;
              collegeSelect.appendChild(option);
          });
      })
      .catch((error) => console.error("Error fetching colleges:", error));

  // Function to create suggestions
  function createSuggestionItem(value, inputElement, suggestionContainer) {
      const suggestion = document.createElement("div");
      suggestion.classList.add("suggestion-item");
      suggestion.textContent = value;
      suggestion.addEventListener("click", () => {
          inputElement.value = value;
          suggestionContainer.innerHTML = ""; // Clear suggestions
      });
      return suggestion;
  }

  // Autocomplete for courses
  courseSearch.addEventListener("input", () => {
      const query = courseSearch.value;
      if (query.length > 0) {
          fetch(`http://127.0.0.1:8564/api/courses/search?query=${query}`)
              .then((response) => response.json())
              .then((data) => {
                  courseSuggestionsContainer.innerHTML = ""; // Clear previous suggestions
                  data.forEach((course) => {
                      const suggestion = createSuggestionItem(course.name, courseSearch, courseSuggestionsContainer);
                      courseSuggestionsContainer.appendChild(suggestion);
                  });
              })
              .catch((error) => console.error("Error fetching courses:", error));
      } else {
          courseSuggestionsContainer.innerHTML = ""; // Clear if no input
      }
  });

  
    // Autocomplete for colleges
    collegeInput.addEventListener("input", () => {
      const query = collegeInput.value;
      if (query.length > 0) {
          fetch(`http://127.0.0.1:8564/api/colleges/search?query=${query}`)
              .then((response) => response.json())
              .then((data) => {
                  collegeSuggestionsContainer.innerHTML = ""; // Clear previous suggestions
                  data.forEach((college) => {
                      const suggestion = createSuggestionItem(college.name, college.id, collegeInput);
                      collegeSuggestionsContainer.appendChild(suggestion);
                  });
              })
              .catch((error) => console.error("Error fetching colleges:", error));
      } else {
          collegeSuggestionsContainer.innerHTML = ""; // Clear if no input
      }
  });


  // Form submission
  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);
      const registrationData = {
          name: formData.get("name"),
          email: formData.get("email"),
          phone_number: formData.get("contact"),
          district_id: formData.get("district"),
          course_id: courseSelect.value, // Use selected course ID
          college_id: collegeSelect.value, // Use selected college ID
          passout_or_studying: formData.get("status"),
          why_should_we_choose_you: formData.get("whychoose"),
          how_did_you_know_about_us: formData.get("howknow"),
      };

      fetch("http://127.0.0.1:8564/api/students/signup/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              alert("Registration successful!");
          } else {
              alert("Error in registration!");
          }
      })
      .catch((error) => console.error("Error during registration:", error));
  });
});
