/*
 * =========================================================
 * ZEPPCORE COMPATIBILITY
 * =========================================================
 *
 * Device and API capability helpers.
 * =========================================================
 */

import {
  getDeviceInfo
} from "@zos/device";

function versionParts(version) {
  return String(version || "0")
    .split(".")
    .map((part) => {
      const match = String(part).match(/^\d+/);
      return match ? Number(match[0]) : 0;
    });
}

export function getDeviceCapabilities() {
  const info = getDeviceInfo();

  return {
    width: info.width,
    height: info.height,
    screenShape: info.screenShape,
    deviceName: info.deviceName,
    keyNumber: info.keyNumber,
    deviceSource: info.deviceSource,
    keyType: info.keyType,
    deviceColor: info.deviceColor,
    uuid: info.uuid
  };
}

export function hasScreenSize(width, height) {
  const info = getDeviceInfo();

  return (
    info.width === width &&
    info.height === height
  );
}

export function isBip6() {
  return hasScreenSize(390, 450);
}

export function isSquareScreen() {
  const info = getDeviceInfo();
  return info.width === info.height;
}

export function isRoundScreen() {
  const info = getDeviceInfo();
  return info.width !== info.height;
}

export function compareVersions(current, required) {
  const a = versionParts(current);
  const b = versionParts(required);
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; i++) {
    const av = a[i] || 0;
    const bv = b[i] || 0;

    if (av > bv) return 1;
    if (av < bv) return -1;
  }

  return 0;
}

export function supportsVersion(current, required) {
  return compareVersions(current, required) >= 0;
}

export function createCompatibilityProfile(options = {}) {
  const info = getDeviceInfo();

  return {
    matchesScreen:
      options.width === undefined
        ? true
        : info.width === options.width &&
          info.height === options.height,

    screenShape: info.screenShape,
    width: info.width,
    height: info.height,
    deviceName: info.deviceName,

    requires: options.requires || {},
    notes: options.notes || ""
  };
}

export default {
  getDeviceCapabilities,
  hasScreenSize,
  isBip6,
  isSquareScreen,
  isRoundScreen,
  compareVersions,
  supportsVersion,
  createCompatibilityProfile
};
