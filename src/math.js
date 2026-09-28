/*
 * =========================================================
 * ZEPPCORE MATH
 * =========================================================
 */

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, amount) {
  return a + (b - a) * amount;
}

export function inverseLerp(a, b, value) {
  if (a === b) return 0;
  return (value - a) / (b - a);
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return (
    outMin +
    (value - inMin) *
      ((outMax - outMin) / (inMax - inMin))
  );
}

export function percentage(value, max) {
  if (!max) return 0;
  return (value / max) * 100;
}

export function round(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function floor(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
}

export function ceil(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.ceil(value * factor) / factor;
}

export function mod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

export function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

export function distance2D(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distance3D(x1, y1, z1, x2, y2, z2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function angle2D(x1, y1, x2, y2) {
  return radToDeg(
    Math.atan2(y2 - y1, x2 - x1)
  );
}

export function normalizeAngle(degrees) {
  return mod(degrees + 180, 360) - 180;
}

export function average(values = []) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function sum(values = []) {
  return values.reduce((total, value) => total + value, 0);
}

export function randomInt(min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);

  return Math.floor(
    Math.random() * (high - low + 1)
  ) + low;
}

export function nearlyEqual(a, b, epsilon = 0.000001) {
  return Math.abs(a - b) <= epsilon;
}

export function isBetween(value, min, max, inclusive = true) {
  return inclusive
    ? value >= min && value <= max
    : value > min && value < max;
}
