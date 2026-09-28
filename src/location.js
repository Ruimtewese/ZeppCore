/*
 * =========================================================
 * ZEPPCORE LOCATION
 * =========================================================
 *
 * High-level wrapper for @zos/sensor Geolocation.
 *
 * Location is a high-power sensor. Apps should only start it
 * when needed and stop it when finished.
 * =========================================================
 */

import {
  Geolocation
} from "@zos/sensor";

export function createLocationSensor() {
  return new Geolocation();
}

export function getLocation(format = "DD") {
  const sensor = new Geolocation();

  return {
    status: sensor.getStatus(),
    latitude: sensor.getLatitude({ format }),
    longitude: sensor.getLongitude({ format }),
    enabled: sensor.getEnabled(),
    setting: sensor.getSetting()
  };
}

export function getLocationStatus() {
  return new Geolocation().getStatus();
}

export function isLocationEnabled() {
  return new Geolocation().getEnabled();
}

export function getLocationSettings() {
  return new Geolocation().getSetting();
}

export function watchLocation(callback, options = {}) {
  const sensor = new Geolocation();
  const format = options.format || "DD";

  const listener = () => {
    callback({
      status: sensor.getStatus(),
      latitude: sensor.getLatitude({ format }),
      longitude: sensor.getLongitude({ format })
    });
  };

  sensor.onChange(listener);
  sensor.start();

  return {
    sensor,
    callback: listener,
    stop() {
      sensor.offChange(listener);
      sensor.stop();
    }
  };
}
