import { formatTime, startCountdown, scheduleNotification } from './timer.js';
import { loadSchedule, saveSchedule, resetSchedule, getCurrentOrNextClass } from './scheduler.js';

let activeSchedule = [];
let activeIntervalId = null;

function renderSchedule() {
  const scheduleListEl = document.getElementById('schedule-list');
  
  if (activeSchedule.length === 0) {
    scheduleListEl.innerHTML = '<li class="schedule-item">No classes added yet.</li>';
    return;
  }

  // Sort classes chronologically
  activeSchedule.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  scheduleListEl.innerHTML = activeSchedule.map(item => `
    <li class="schedule-item">
      <div class="class-info">
        <h3>${item.title}</h3>
        <p>Instructor: ${item.instructor}</p>
      </div>
      <div class="class-time">
        <span>${formatTime(new Date(item.startTime))} - ${formatTime(new Date(item.endTime))}</span>
        <button class="btn-delete" data-id="${item.id}">Delete</button>
      </div>
    </li>
  `).join('');

  // Attach delete button event listeners
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idToDelete = Number(e.target.getAttribute('data-id'));
      activeSchedule = activeSchedule.filter(item => item.id !== idToDelete);
      saveSchedule(activeSchedule);
      renderSchedule();
      updateAppCycle();
    });
  });
}

function updateAppCycle() {
  if (activeIntervalId) clearInterval(activeIntervalId);

  const activeInfoEl = document.getElementById('active-class-info');
  const timerEl = document.getElementById('countdown-timer');
  const { status, classItem, targetTime } = getCurrentOrNextClass(activeSchedule);

  if (status === 'ACTIVE') {
    activeInfoEl.innerHTML = `<span class="badge live">LIVE NOW</span> <strong>${classItem.title}</strong> ends in:`;
    activeIntervalId = startCountdown(targetTime, ({ hours, minutes, seconds, totalMs }) => {
      timerEl.textContent = `${hours}:${minutes}:${seconds}`;
      if (totalMs <= 0) updateAppCycle();
    });
  } else if (status === 'UPCOMING') {
    activeInfoEl.innerHTML = `<span class="badge upcoming">UPCOMING</span> <strong>${classItem.title}</strong> starts in:`;
    activeIntervalId = startCountdown(targetTime, ({ hours, minutes, seconds, totalMs }) => {
      timerEl.textContent = `${hours}:${minutes}:${seconds}`;
      if (totalMs <= 0) updateAppCycle();
    });
  } else {
    activeInfoEl.textContent = 'No active or upcoming classes for today.';
    timerEl.textContent = '00:00:00';
  }
}

function bindFormEvents() {
  const form = document.getElementById('add-class-form');
  const resetBtn = document.getElementById('reset-schedule-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const instructor = document.getElementById('instructor').value.trim();
    const startTimeStr = document.getElementById('start-time').value;
    const endTimeStr = document.getElementById('end-time').value;

    // Convert time string (HH:MM) to today's Date object
    const today = new Date();
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);

    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startH, startM);
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endH, endM);

    if (endTime <= startTime) {
      alert('End time must be after start time.');
      return;
    }

    const newClass = {
      id: Date.now(),
      title,
      instructor,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };

    activeSchedule.push(newClass);
    saveSchedule(activeSchedule);
    renderSchedule();
    updateAppCycle();

    // Schedule notification trigger
    scheduleNotification(startTime, () => {
      console.log(`[TIMEOUT]: Class starting now - ${title}`);
    });

    form.reset();
  });

  resetBtn.addEventListener('click', () => {
    activeSchedule = resetSchedule();
    renderSchedule();
    updateAppCycle();
  });
}

function init() {
  setInterval(() => {
    document.getElementById('current-time-display').textContent = formatTime(new Date());
  }, 1000);

  activeSchedule = loadSchedule();
  bindFormEvents();
  renderSchedule();
  updateAppCycle();
}

document.addEventListener('DOMContentLoaded', init);