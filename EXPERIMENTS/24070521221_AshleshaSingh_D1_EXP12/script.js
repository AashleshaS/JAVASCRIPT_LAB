$(document).ready(function () {
    let events = [];
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

    // --- 1. AJAX FETCHING EVENT DATA ---
    function fetchEvents() {
        $('#loader').show();
        $('#event-list').empty();

        // Simulating 800ms network delay for AJAX showcase
        setTimeout(() => {
            $.ajax({
                url: 'events.json',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    events = data;
                    recalculateAvailableSeats();
                    renderEvents();
                    populateDropdown();
                    $('#loader').hide();
                },
                error: function () {
                    $('#loader').text('Failed to load events. Please check events.json file.');
                }
            });
        }, 800);
    }

    // Recalculate remaining seats based on saved local registrations
    function recalculateAvailableSeats() {
        events.forEach(ev => {
            const count = registrations.filter(r => r.eventId == ev.id).length;
            ev.availableSeats = ev.totalSeats - count;
        });
    }

    // --- 2. DOM MANIPULATION & RENDERING ---
    function renderEvents() {
        const $container =$('#event-list');
        $container.empty();

        events.forEach(ev => {
            const isSoldOut = ev.availableSeats <= 0;
            const badgeClass = isSoldOut ? 'badge out-of-stock' : 'badge';
            const badgeText = isSoldOut ? 'Sold Out' : `${ev.availableSeats} Seats Left`;

            const card = `
                <div class="event-item" data-id="${ev.id}">
                    <h3>${ev.title}</h3>
                    <p><strong>Date:</strong> ${ev.date} | <strong>Venue:</strong> ${ev.location}</p>
                    <p><span class="${badgeClass}">${badgeText}</span></p>
                </div>
            `;
            $container.append(card);
        });
    }

    function populateDropdown() {
        const $select =$('#event-select');
        $select.html('<option value="">-- Choose an Event --</option>');

        events.forEach(ev => {
            const disabled = ev.availableSeats <= 0 ? 'disabled' : '';
            $select.append(`<option value="${ev.id}" ${disabled}>${ev.title} (${ev.availableSeats} seats)</option>`);
        });
    }

    function renderRegistrations() {
        const $tbody =$('#registrations-table-body');
        $tbody.empty();

        if (registrations.length === 0) {
            $tbody.append('<tr><td colspan="5" style="text-align:center;">No registrations found.</td></tr>');
            return;
        }

        registrations.forEach((reg, index) => {
            const row = `
                <tr>
                    <td>${reg.prn}</td>
                    <td>${reg.name}</td>
                    <td>${reg.email}</td>
                    <td>${reg.eventTitle}</td>
                    <td><button class="btn-danger cancel-btn" data-index="${index}">Cancel</button></td>
                </tr>
            `;
            $tbody.append(row);
        });
    }

    function showFeedback(msg, type) {
        const $box =$('#feedback-message');
        $box.removeClass('msg-success msg-error')
            .addClass(type === 'success' ? 'msg-success' : 'msg-error')
            .text(msg)
            .slideDown();

        setTimeout(() => {
            $box.slideUp();
        }, 3500);
    }

    // --- 3. EVENT HANDLERS ---

    // Event Selection click sync with dropdown
    $(document).on('click', '.event-item', function () {
        const eventId = $(this).data('id');$('.event-item').removeClass('selected');
        $(this).addClass('selected');$('#event-select').val(eventId);
    });

    // Sync dropdown selection with event list highlighting
    $('#event-select').change(function () {
        const selectedId = $(this).val();$('.event-item').removeClass('selected');
        if (selectedId) {
            $(`.event-item[data-id="${selectedId}"]`).addClass('selected');
        }
    });

    // Form Submission & Validation
    $('#registration-form').submit(function (e) {
        e.preventDefault();

        const eventId = parseInt($('#event-select').val());
        const name = $('#student-name').val().trim();
        const prn = $('#student-prn').val().trim();
        const email = $('#student-email').val().trim();

        // Form Validation
        if (!eventId || !name || !prn || !email) {
            showFeedback('Please fill out all fields.', 'error');
            return;
        }

        const selectedEvent = events.find(ev => ev.id === eventId);

        // Check Seat Availability
        if (!selectedEvent || selectedEvent.availableSeats <= 0) {
            showFeedback('Sorry, this event is completely sold out!', 'error');
            return;
        }

        // Check Duplicate PRN for same event
        const isDuplicate = registrations.some(r => r.prn.toLowerCase() === prn.toLowerCase() && r.eventId === eventId);
        if (isDuplicate) {
            showFeedback(`PRN ${prn} is already registered for this event!`, 'error');
            return;
        }

        // Add Registration
        const newRecord = {
            eventId: selectedEvent.id,
            eventTitle: selectedEvent.title,
            name: name,
            prn: prn,
            email: email
        };

        registrations.push(newRecord);
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Update state & UI
        recalculateAvailableSeats();
        renderEvents();
        populateDropdown();
        renderRegistrations();

        // Clear Form & Show Success Feedback
        $('#registration-form')[0].reset();
        $('.event-item').removeClass('selected');
        showFeedback(`Successfully registered ${name} for ${selectedEvent.title}!`, 'success');
    });

    // Delete / Cancel Registration
    $(document).on('click', '.cancel-btn', function () {
        const index = $(this).data('index');
        const removed = registrations.splice(index, 1)[0];

        // Save to localStorage
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Update state & UI
        recalculateAvailableSeats();
        renderEvents();
        populateDropdown();
        renderRegistrations();

        showFeedback(`Registration for PRN ${removed.prn} has been cancelled.`, 'success');
    });

    // --- INITIALIZATION ---
    fetchEvents();
    renderRegistrations();
});