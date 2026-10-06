export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function getRemainingTime(targetDate) {
  const totalMs = Date.parse(targetDate) - Date.parse(new Date());
  
  if (totalMs <= 0) {
    return { totalMs: 0, hours: '00', minutes: '00', seconds: '00' };
  }

  const seconds = Math.floor((totalMs / 1000) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalMs / 1000 / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor((totalMs / (1000 * 60 * 60))).toString().padStart(2, '0');

  return { totalMs, hours, minutes, seconds };
}

export function startCountdown(targetDate, onTick) {
  const updateTimer = () => {
    const remaining = getRemainingTime(targetDate);
    onTick(remaining);
    return remaining.totalMs;
  };

  const initialRemaining = updateTimer();
  if (initialRemaining <= 0) return null;

  const intervalId = setInterval(() => {
    const remaining = updateTimer();
    if (remaining <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);

  return intervalId;
}

export function scheduleNotification(targetDate, callback) {
  const delay = new Date(targetDate).getTime() - new Date().getTime();
  if (delay > 0) {
    return setTimeout(callback, delay);
  }
  return null;
}