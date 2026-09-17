let studentsData = [];

// Fetch data using JavaScript fetch API
$('#loadBtn').on('click', function() {
  fetch('students.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      studentsData = data;
      $('#message').text('');
      renderTable(studentsData);
    })
    .catch(() => {
      $('#tableBody').empty();
      $('#message').text('JSON data cannot be loaded.');
    });
});

/* 
// Alternative implementation using jQuery $.getJSON()
$('#loadBtn').on('click', function() {
  $.getJSON('students.json')
    .done(function(data) {
      studentsData = data;
      $('#message').text('');
      renderTable(studentsData);
    })
    .fail(function() {
      $('#tableBody').empty();
      $('#message').text('JSON data cannot be loaded.');
    });
});
*/

// Dynamic Table Rendering & Filtering
function filterAndRender() {
  const searchText = $('#searchInput').val().toLowerCase();
  const selectedStatus = $('#statusFilter').val();

  const filtered = studentsData.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchText) || 
                          student.prn.toLowerCase().includes(searchText);
    const matchesStatus = selectedStatus === 'All' || student.registrationStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (studentsData.length > 0 && filtered.length === 0) {
    $('#message').text('No student matches the search/filter criteria.');
  } else {
    $('#message').text('');
  }

  renderTable(filtered);
}

function renderTable(data) {
  const $tbody = $('#tableBody');
  $tbody.empty();

  data.forEach(student => {
    const row = `<tr>
      <td>${student.studentName}</td>
      <td>${student.prn}</td>
      <td>${student.department}</td>
      <td>${student.year}</td>
      <td>${student.eventName}</td>
      <td>${student.registrationStatus}</td>
    </tr>`;
    $tbody.append(row);
  });
}

// Event Listeners for Live Search & Filter
$('#searchInput').on('input', filterAndRender);
$('#statusFilter').on('change', filterAndRender);