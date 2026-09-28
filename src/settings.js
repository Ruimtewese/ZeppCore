/*
 * =========================================================
 * ZEPPCORE SETTINGS
 * =========================================================
 *
 * Friendly wrappers around @zos/settings.
 * =========================================================
 */

import {
  getLanguage as nativeGetLanguage,

  getDateFormat,
  DATE_FORMAT_YMD,
  DATE_FORMAT_DMY,
  DATE_FORMAT_MDY,

  getDistanceUnit,
  DISTANCE_UNIT_METRIC,
  DISTANCE_UNIT_IMPERIAL,

  getWeightUnit,
  WEIGHT_UNIT_KILOGRAM,
  WEIGHT_UNIT_JIN,
  WEIGHT_UNIT_POUND,
  WEIGHT_UNIT_STONE,

  getTemperatureUnit,
  TEMPERATURE_UNIT_CENTIGRADE,
  TEMPERATURE_UNIT_FAHRENHEIT,

  getTimeFormat,
  TIME_FORMAT_12,
  TIME_FORMAT_24,

  getSystemInfo,
  getSystemMode
} from "@zos/settings";

export function getLanguage() {
  return nativeGetLanguage();
}

export function getDateFormatSetting() {
  return getDateFormat();
}

export function getTimeFormatSetting() {
  return getTimeFormat();
}

export function getDistanceUnitSetting() {
  return getDistanceUnit();
}

export function getWeightUnitSetting() {
  return getWeightUnit();
}

export function getTemperatureUnitSetting() {
  return getTemperatureUnit();
}

export function getSystemInformation() {
  return getSystemInfo();
}

export function getSystemModes() {
  return getSystemMode();
}

export function uses12HourTime() {
  return getTimeFormat() === TIME_FORMAT_12;
}

export function uses24HourTime() {
  return getTimeFormat() === TIME_FORMAT_24;
}

export function usesMetricDistance() {
  return getDistanceUnit() === DISTANCE_UNIT_METRIC;
}

export function usesImperialDistance() {
  return getDistanceUnit() === DISTANCE_UNIT_IMPERIAL;
}

export function usesCelsius() {
  return getTemperatureUnit() === TEMPERATURE_UNIT_CENTIGRADE;
}

export function usesFahrenheit() {
  return getTemperatureUnit() === TEMPERATURE_UNIT_FAHRENHEIT;
}

export function getSettingsSnapshot() {
  return {
    language: getLanguage(),
    dateFormat: getDateFormatSetting(),
    timeFormat: getTimeFormatSetting(),
    distanceUnit: getDistanceUnitSetting(),
    weightUnit: getWeightUnitSetting(),
    temperatureUnit: getTemperatureUnitSetting(),
    systemInfo: getSystemInformation(),
    systemMode: getSystemModes()
  };
}

export {
  DATE_FORMAT_YMD,
  DATE_FORMAT_DMY,
  DATE_FORMAT_MDY,
  DISTANCE_UNIT_METRIC,
  DISTANCE_UNIT_IMPERIAL,
  WEIGHT_UNIT_KILOGRAM,
  WEIGHT_UNIT_JIN,
  WEIGHT_UNIT_POUND,
  WEIGHT_UNIT_STONE,
  TEMPERATURE_UNIT_CENTIGRADE,
  TEMPERATURE_UNIT_FAHRENHEIT,
  TIME_FORMAT_12,
  TIME_FORMAT_24
};
