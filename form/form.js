document.addEventListener("DOMContentLoaded", () => {
    const districtSelect = document.getElementById("district");
    const courseSelect = document.getElementById("course");
    const collegeSelect = document.getElementById("college");
    const form = document.getElementById("registrationForm");

    // Fetch and populate districts
    fetch("http://127.0.0.1:8999/api/districts/")
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
    fetch("http://127.0.0.1:8999/api/courses/")
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
    fetch("http://127.0.0.1:8999/api/colleges/")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((college) => {
                const option = document.createElement("option");
                option.value = college.id; // corrected from college.college_id to college.id
                option.textContent = college.name;
                collegeSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching colleges:", error));

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        
        const formData = new FormData(form);
        const registrationData = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone_number: formData.get("contact"), // Make sure this matches your backend
            district_id: parseInt(districtSelect.value, 10), // Convert to integer
            course_id: parseInt(courseSelect.value, 10), // Convert to integer
            // college_id: parseInt(collegeSelect.value, 10), // Convert to integer
            college_id:1,
            passout_or_studying: formData.get("status"),
            why_should_we_choose_you: formData.get("whychoose"),
            how_did_you_know_about_us: formData.get("howknow"),
        };

        fetch("http://127.0.0.1:8999/api/students/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {  // Ensure your backend responds with a 'success' flag
                    alert("Registration successful!");
                    form.reset(); // Optionally reset the form
                } else {
                    alert("Error in registration: " + data.detail);
                }
            })
            .catch((error) => console.error("Error during registration:", error));
    });
      
});
