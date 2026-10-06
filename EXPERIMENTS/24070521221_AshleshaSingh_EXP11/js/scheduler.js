const STORAGE_KEY = 'manual_class_schedule';

// Default classes relative to current time for instant testing
export function getDefaultSchedule() {
  const now = Date.now();
  return [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Smith',
      startTime: new Date(now + 5000).toISOString(),     // Starts in 5s
      endTime: new Date(now + 45000).toISOString()       // Ends in 45s
    },
    {
      id: 2,
      title: 'Web Development Lab',
      instructor: 'Prof. Johnson',
      startTime: new Date(now + 50000).toISOString(),    // Starts in 50s
      endTime: new Date(now + 120000).toISOString()      // Ends in 2 mins
    }
  ];
}

export function loadSchedule() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const defaults = getDefaultSchedule();
    saveSchedule(defaults);
    return defaults;
  }
  return JSON.parse(stored);
}

export function saveSchedule(scheduleArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleArray));
}

export function resetSchedule() {
  localStorage.removeItem(STORAGE_KEY);
  return loadSchedule();
}

export function getCurrentOrNextClass(classList) {
  const now = new Date();

  // Find currently active class
  const activeClass = classList.find(c => {
    const start = new Date(c.startTime);
    const end = new Date(c.endTime);
    return now >= start && now <= end;
  });

  if (activeClass) {
    return { 
      status: 'ACTIVE', 
      classItem: activeClass, 
      targetTime: new Date(activeClass.endTime) 
    };
  }

  // Find next upcoming class
  const nextClass = classList.find(c => new Date(c.startTime) > now);
  if (nextClass) {
    return { 
      status: 'UPCOMING', 
      classItem: nextClass, 
      targetTime: new Date(nextClass.startTime) 
    };
  }

  return { status: 'FINISHED', classItem: null, targetTime: null };
}