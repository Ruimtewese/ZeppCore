/*
 * =========================================================
 * ZEPPCORE POWER
 * =========================================================
 *
 * Screen, brightness and power-related controls.
 * =========================================================
 */

import {
  getBrightness,
  setBrightness,
  getAutoBrightness,
  setAutoBrightness,
  getSettings,
  setScreenOff,
  setPageBrightTime,
  resetPageBrightTime,
  setWakeUpRelaunch,
  pausePalmScreenOff,
  resetPalmScreenOff,
  pauseDropWristScreenOff,
  resetDropWristScreenOff
} from "@zos/display";

import {
  getSystemMode
} from "@zos/settings";

export function getBrightnessLevel() {
  return getBrightness();
}

export function setBrightnessLevel(level) {
  return setBrightness(level);
}

export function isAutoBrightnessEnabled() {
  return getAutoBrightness();
}

export function setAutoBrightnessEnabled(enabled) {
  return setAutoBrightness(Boolean(enabled));
}

export function keepScreenAwake(milliseconds = 2147483647) {
  return setPageBrightTime({
    brightTime: Math.min(Number(milliseconds), 2147483000)
  });
}

export function resetScreenTimeout() {
  return resetPageBrightTime();
}

export function turnScreenOff() {
  return setScreenOff();
}

export function setWakeUpRelaunchEnabled(enabled) {
  return setWakeUpRelaunch({
    relaunch: Boolean(enabled)
  });
}

export function pausePalmScreenOffFor(seconds) {
  return pausePalmScreenOff({
    duration: Number(seconds)
  });
}

export function resetPalmScreenOffBehavior() {
  return resetPalmScreenOff();
}

export function pauseWristScreenOffFor(milliseconds) {
  return pauseDropWristScreenOff({
    duration: Number(milliseconds)
  });
}

export function resetWristScreenOffBehavior() {
  return resetDropWristScreenOff();
}

export function getDisplaySettings() {
  return getSettings();
}

export function getPowerModes() {
  return getSystemMode();
}

export function isPowerSaving() {
  return Boolean(getSystemMode().powerSaving);
}

export function isUltraPowerSaving() {
  return Boolean(getSystemMode().ultraPowerSaving);
}

export default {
  getBrightnessLevel,
  setBrightnessLevel,
  isAutoBrightnessEnabled,
  setAutoBrightnessEnabled,
  keepScreenAwake,
  resetScreenTimeout,
  turnScreenOff,
  setWakeUpRelaunchEnabled,
  pausePalmScreenOffFor,
  resetPalmScreenOffBehavior,
  pauseWristScreenOffFor,
  resetWristScreenOffBehavior,
  getDisplaySettings,
  getPowerModes,
  isPowerSaving,
  isUltraPowerSaving
};
