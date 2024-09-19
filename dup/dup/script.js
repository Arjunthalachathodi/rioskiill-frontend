// Student Growth Over Time (Line Chart)
const studentGrowthCtx = document.getElementById('studentGrowthChart').getContext('2d');
new Chart(studentGrowthCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Students',
            data: [100, 200, 300, 400, 500, 600, 700],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    }
});

// Enrollment Trends by Course (Bar Chart)
const enrollmentTrendsCtx = document.getElementById('enrollmentTrendsChart').getContext('2d');
new Chart(enrollmentTrendsCtx, {
    type: 'bar',
    data: {
        labels: ['Course A', 'Course B', 'Course C', 'Course D'],
        datasets: [{
            label: 'Enrollments',
            data: [150, 200, 100, 250],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    }
});

// Revenue and Payments (Multi-line Chart)
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue',
                data: [5000, 10000, 15000, 20000, 25000, 30000, 35000],
                borderColor: '#36A2EB',
                fill: false
            },
            {
                label: 'Payments',
                data: [4500, 9500, 14500, 19500, 24500, 29500, 34000],
                borderColor: '#FF6384',
                fill: false
            }
        ]
    }
});

// Student Demographics Breakdown (Pie Chart)
const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
new Chart(demographicsCtx, {
    type: 'pie',
    data: {
        labels: ['18-25', '26-35', '36-45', '45+'],
        datasets: [{
            data: [300, 250, 100, 50],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    }
});




// Sample data for students (Can be fetched from a backend)
const students = [
    { name: 'John Doe', course: 'Course A', status: 'ongoing', enrollmentDate: '2024-01-15' },
    { name: 'Jane Smith', course: 'Course B', status: 'completed', enrollmentDate: '2023-12-05' },
    { name: 'Alice Brown', course: 'Course C', status: 'ongoing', enrollmentDate: '2024-02-10' },
    { name: 'Bob White', course: 'Course A', status: 'completed', enrollmentDate: '2023-11-22' }
];

// Function to populate the students table
function loadStudentsTable(studentsData) {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';  // Clear the table before adding rows

    studentsData.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td class="status ${student.status}">${student.status.charAt(0).toUpperCase() + student.status.slice(1)}</td>
            <td>${student.enrollmentDate}</td>
            <td><button class="action-btn">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial load of the students table
loadStudentsTable(students);

// Filter and search functionality
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchInput) || student.course.toLowerCase().includes(searchInput);
        const matchesCourse = courseFilter === '' || student.course === courseFilter;
        const matchesStatus = statusFilter === '' || student.status === statusFilter;
        return matchesSearch && matchesCourse && matchesStatus;
    });

    loadStudentsTable(filteredStudents);
}
const ctx = document.getElementById('paymentDonutChart').getContext('2d');
const paymentDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Fully Paid', 'Partially Paid', 'Not Paid'],
        datasets: [{
            label: 'Payment Status',
            data: [1, 1, 1], // These values should come from your payment data
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Fully Paid (Green)
                'rgba(255, 206, 86, 0.2)', // Partially Paid (Yellow)
                'rgba(255, 99, 132, 0.2)'  // Not Paid (Red)
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});
