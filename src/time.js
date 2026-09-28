/*
 * =========================================================
 * ZEPPCORE TIME
 * =========================================================
 *
 * Lightweight time/date helpers with no extra dependency.
 * =========================================================
 */

function pad(value, length = 2) {
  return String(value).padStart(length, "0");
}

export { pad };

export function getTimestamp() {
  return Date.now();
}

export function getCurrentTime(date = new Date()) {
  return {
    timestamp: date.getTime(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  };
}

export function formatTime(date = new Date(), options = {}) {
  const {
    includeSeconds = false,
    hour12 = false
  } = options;

  let hour = date.getHours();
  const suffix = hour >= 12 ? "PM" : "AM";

  if (hour12) {
    hour %= 12;
    if (hour === 0) hour = 12;
  }

  const base =
    pad(hour) +
    ":" +
    pad(date.getMinutes());

  return includeSeconds
    ? base + ":" + pad(date.getSeconds()) + (hour12 ? " " + suffix : "")
    : base + (hour12 ? " " + suffix : "");
}

export function formatDate(
  date = new Date(),
  separator = "-"
) {
  return (
    pad(date.getFullYear(), 4) +
    separator +
    pad(date.getMonth() + 1) +
    separator +
    pad(date.getDate())
  );
}

export function minutesSinceMidnight(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function secondsSinceMidnight(date = new Date()) {
  return (
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds()
  );
}

export function startOfDay(date = new Date()) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + Number(minutes) * 60000);
}

export function addSeconds(date, seconds) {
  return new Date(date.getTime() + Number(seconds) * 1000);
}

export function differenceMs(a, b) {
  return Math.abs(
    new Date(a).getTime() -
    new Date(b).getTime()
  );
}

export function isSameDay(a, b) {
  const da = new Date(a);
  const db = new Date(b);

  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}
