/*
 * =========================================================
 * ZEPPCORE SENSORS
 * =========================================================
 *
 * Friendly wrappers around @zos/sensor.
 *
 * This file intentionally keeps the API simple:
 *
 * import {
 *   getBattery,
 *   getSteps,
 *   getHeartRate,
 *   getLocation,
 *   createAccelerometer
 * } from "zeppcore";
 *
 * =========================================================
 */

import {
  Battery,
  Step,
  HeartRate,
  BloodOxygen,
  Sleep,
  Stress,
  Pai,
  Calorie,
  Distance,
  Stand,
  FatBurning,
  Barometer,
  Accelerometer,
  Gyroscope,
  Compass,
  Geolocation,
  Screen,
  Time,
  Wear,
  BodyTemperature,
  Workout,
  WorldClock,
  checkSensor,

  FREQ_MODE_LOW,
  FREQ_MODE_NORMAL,
  FREQ_MODE_HIGH
} from "@zos/sensor";


/* =========================================================
 * SENSOR PERMISSIONS
 * =========================================================
 *
 * These are the Zepp permission codes used by sensors.
 *
 * Put only the permissions your application actually uses
 * into app.json.
 *
 * =========================================================
 */

export const SENSOR_PERMISSIONS = {

  battery:
    null,

  steps:
    "data:user.hd.step",

  heartRate:
    "data:user.hd.heart_rate",

  bloodOxygen:
    "data:user.hd.spo2",

  sleep:
    "data:user.hd.sleep",

  stress:
    "data:user.hd.stress",

  pai:
    "data:user.hd.pai",

  calories:
    "data:user.hd.calorie",

  distance:
    "data:user.hd.distance",

  stand:
    "data:user.hd.stand",

  fatBurning:
    "data:user.hd.fat_burning",

  workout:
    "data:user.hd.workout",

  accelerometer:
    "device:os.accelerometer",

  gyroscope:
    "device:os.gyroscope",

  compass:
    "device:os.compass",

  geolocation:
    "device:os.geolocation",

  barometer:
    "device:os.barometer",

  bodyTemperature:
    "data:user.hd.body_temp"
};


/* =========================================================
 * SENSOR CLASS REGISTRY
 * =========================================================
 *
 * Useful for advanced code that needs access to a sensor
 * constructor by name.
 *
 * =========================================================
 */

export const SENSOR_CLASSES = {

  Battery,

  Step,

  HeartRate,

  BloodOxygen,

  Sleep,

  Stress,

  Pai,

  Calorie,

  Distance,

  Stand,

  FatBurning,

  Barometer,

  Accelerometer,

  Gyroscope,

  Compass,

  Geolocation,

  Screen,

  Time,

  Wear,

  BodyTemperature,

  Workout,

  WorldClock
};


/* =========================================================
 * FACTORY
 * ========================================================= */

/**
 * Create a native Zepp sensor instance.
 *
 * Example:
 *
 * const heartRate = createSensor(HeartRate);
 */
export function createSensor(
  SensorClass
) {
  if (!SensorClass) {
    throw new Error(
      "ZeppCore: SensorClass is required."
    );
  }

  return new SensorClass();
}


/**
 * Check whether a sensor is available on the
 * current device.
 *
 * Example:
 *
 * if (isSensorAvailable(Accelerometer)) {
 *   // use accelerometer
 * }
 */
export function isSensorAvailable(
  SensorClass
) {
  if (!SensorClass) {
    return false;
  }

  try {
    return Boolean(
      checkSensor(
        SensorClass
      )
    );
  } catch (error) {
    return false;
  }
}


/* =========================================================
 * BATTERY
 * ========================================================= */

/**
 * Get the current battery percentage.
 *
 * Returns:
 *
 * number
 *
 * Example:
 *
 * const battery = getBattery();
 */
export function getBattery() {
  const sensor =
    new Battery();

  return sensor.getCurrent();
}


/**
 * Create a battery sensor.
 *
 * The returned object is the native Zepp Battery sensor.
 */
export function createBattery() {
  return new Battery();
}


/**
 * Listen for battery changes.
 *
 * Returns the sensor instance and callback so it can
 * easily be stopped later.
 */
export function watchBattery(
  callback
) {
  const sensor =
    new Battery();

  if (
    typeof callback !==
    "function"
  ) {
    throw new Error(
      "ZeppCore: watchBattery callback must be a function."
    );
  }

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * STEPS
 * ========================================================= */

/**
 * Get today's current step count.
 */
export function getSteps() {
  const sensor =
    new Step();

  return sensor.getCurrent();
}


/**
 * Get the configured step target.
 */
export function getStepTarget() {
  const sensor =
    new Step();

  return sensor.getTarget();
}


/**
 * Create a step sensor.
 *
 * Use the native methods:
 *
 * sensor.getCurrent()
 * sensor.getTarget()
 * sensor.onChange()
 * sensor.offChange()
 */
export function createStep() {
  return new Step();
}


/**
 * Watch step-count changes.
 */
export function watchSteps(
  callback
) {
  const sensor =
    new Step();

  if (
    typeof callback !==
    "function"
  ) {
    throw new Error(
      "ZeppCore: watchSteps callback must be a function."
    );
  }

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * HEART RATE
 * ========================================================= */

/**
 * Get the latest saved heart-rate value.
 */
export function getHeartRate() {
  const sensor =
    new HeartRate();

  return sensor.getLast();
}


/**
 * Get today's minute-by-minute heart-rate data.
 */
export function getTodayHeartRate() {
  const sensor =
    new HeartRate();

  return sensor.getToday();
}


/**
 * Create a heart-rate sensor.
 *
 * Use the native sensor for continuous measurements.
 */
export function createHeartRate() {
  return new HeartRate();
}


/**
 * Start continuous heart-rate monitoring.
 *
 * The callback is called whenever a new measurement
 * is available.
 *
 * The callback receives:
 *
 * value
 */
export function watchHeartRate(
  callback
) {
  const sensor =
    new HeartRate();

  if (
    typeof callback !==
    "function"
  ) {
    throw new Error(
      "ZeppCore: watchHeartRate callback must be a function."
    );
  }

  const listener = () => {
    callback(
      sensor.getCurrent()
    );
  };

  sensor.onCurrentChange(
    listener
  );

  return {
    sensor,

    callback: listener,

    stop() {
      sensor.offCurrentChange(
        listener
      );
    }
  };
}


/* =========================================================
 * BLOOD OXYGEN
 * ========================================================= */

/**
 * Get the current SpO2 measurement result.
 *
 * Returns the native result object:
 *
 * {
 *   value,
 *   time,
 *   retCode
 * }
 */
export function getBloodOxygen() {
  const sensor =
    new BloodOxygen();

  return sensor.getCurrent();
}


/**
 * Create a BloodOxygen sensor.
 */
export function createBloodOxygen() {
  return new BloodOxygen();
}


/**
 * Get average blood oxygen measurements from
 * the last 24 hours.
 */
export function getBloodOxygenLastDay() {
  const sensor =
    new BloodOxygen();

  return sensor.getLastDay();
}


/**
 * Start a blood oxygen measurement.
 */
export function startBloodOxygen(
  callback = null
) {
  const sensor =
    new BloodOxygen();

  if (callback) {
    sensor.onChange(
      callback
    );
  }

  sensor.start();

  return {
    sensor,

    stop() {
      if (callback) {
        sensor.offChange(
          callback
        );
      }

      sensor.stop();
    }
  };
}


/* =========================================================
 * SLEEP
 * ========================================================= */

/**
 * Get current sleep information.
 */
export function getSleepInfo() {
  const sensor =
    new Sleep();

  return sensor.getInfo();
}


/**
 * Get sleep-stage data.
 */
export function getSleepStages() {
  const sensor =
    new Sleep();

  return sensor.getStage();
}


/**
 * Get sleep-stage constants.
 */
export function getSleepStageConstants() {
  const sensor =
    new Sleep();

  return sensor.getStageConstantObj();
}


/**
 * Get current sleeping status.
 *
 * 0 = awake
 * 1 = sleeping
 */
export function getSleepingStatus() {
  const sensor =
    new Sleep();

  return sensor.getSleepingStatus();
}


/**
 * Get nap information.
 */
export function getNaps() {
  const sensor =
    new Sleep();

  return sensor.getNap();
}


/**
 * Create a Sleep sensor.
 */
export function createSleep() {
  return new Sleep();
}


/* =========================================================
 * STRESS
 * ========================================================= */

/**
 * Get the current stress result.
 */
export function getStress() {
  const sensor =
    new Stress();

  return sensor.getCurrent();
}


/**
 * Get today's minute-level stress data.
 */
export function getTodayStress() {
  const sensor =
    new Stress();

  return sensor.getToday();
}


/**
 * Get the hourly stress averages for today.
 */
export function getTodayStressByHour() {
  const sensor =
    new Stress();

  return sensor.getTodayByHour();
}


/**
 * Get the past week's daily stress averages.
 */
export function getLastWeekStress() {
  const sensor =
    new Stress();

  return sensor.getLastWeek();
}


/**
 * Create a stress sensor.
 */
export function createStress() {
  return new Stress();
}


/**
 * Watch stress changes.
 */
export function watchStress(
  callback
) {
  const sensor =
    new Stress();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * PAI
 * ========================================================= */

/**
 * Get today's PAI.
 */
export function getTodayPai() {
  const sensor =
    new Pai();

  return sensor.getToday();
}


/**
 * Get total cumulative PAI.
 */
export function getTotalPai() {
  const sensor =
    new Pai();

  return sensor.getTotal();
}


/**
 * Get the last 7 days of PAI data.
 */
export function getLastWeekPai() {
  const sensor =
    new Pai();

  return sensor.getLastWeek();
}


/**
 * Create a PAI sensor.
 */
export function createPai() {
  return new Pai();
}


/* =========================================================
 * CALORIES
 * ========================================================= */

/**
 * Get current calorie consumption.
 */
export function getCalories() {
  const sensor =
    new Calorie();

  return sensor.getCurrent();
}


/**
 * Get calorie target.
 */
export function getCalorieTarget() {
  const sensor =
    new Calorie();

  return sensor.getTarget();
}


/**
 * Create calorie sensor.
 */
export function createCalorie() {
  return new Calorie();
}


/**
 * Watch calorie changes.
 */
export function watchCalories(
  callback
) {
  const sensor =
    new Calorie();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * DISTANCE
 * ========================================================= */

/**
 * Get today's current distance.
 */
export function getDistance() {
  const sensor =
    new Distance();

  return sensor.getCurrent();
}


/**
 * Create distance sensor.
 */
export function createDistance() {
  return new Distance();
}


/**
 * Watch distance changes.
 */
export function watchDistance(
  callback
) {
  const sensor =
    new Distance();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * STANDING
 * ========================================================= */

/**
 * Get current standing hours.
 */
export function getStandingHours() {
  const sensor =
    new Stand();

  return sensor.getCurrent();
}


/**
 * Get standing target.
 */
export function getStandingTarget() {
  const sensor =
    new Stand();

  return sensor.getTarget();
}


/**
 * Create standing sensor.
 */
export function createStand() {
  return new Stand();
}


/**
 * Watch standing changes.
 */
export function watchStanding(
  callback
) {
  const sensor =
    new Stand();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * FAT BURNING
 * ========================================================= */

/**
 * Get current fat-burning minutes.
 */
export function getFatBurningMinutes() {
  const sensor =
    new FatBurning();

  return sensor.getCurrent();
}


/**
 * Get fat-burning target.
 */
export function getFatBurningTarget() {
  const sensor =
    new FatBurning();

  return sensor.getTarget();
}


/**
 * Create fat-burning sensor.
 */
export function createFatBurning() {
  return new FatBurning();
}


/**
 * Watch fat-burning changes.
 */
export function watchFatBurning(
  callback
) {
  const sensor =
    new FatBurning();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * BAROMETER
 * ========================================================= */

/**
 * Get the current air pressure in hPa.
 */
export function getAirPressure() {
  const sensor =
    new Barometer();

  return sensor.getAirPressure();
}


/**
 * Get the current altitude in meters.
 */
export function getAltitude() {
  const sensor =
    new Barometer();

  return sensor.getAltitude();
}


/**
 * Get both pressure and altitude.
 */
export function getBarometer() {
  const sensor =
    new Barometer();

  return {
    pressure:
      sensor.getAirPressure(),

    altitude:
      sensor.getAltitude()
  };
}


/**
 * Create a barometer.
 */
export function createBarometer() {
  return new Barometer();
}


/**
 * Watch barometer changes.
 */
export function watchBarometer(
  callback
) {
  const sensor =
    new Barometer();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * ACCELEROMETER
 * ========================================================= */

/**
 * Create an accelerometer.
 *
 * Example:
 *
 * const accelerometer =
 *   createAccelerometer({
 *     frequency: FREQ_MODE_NORMAL
 *   });
 *
 * const data =
 *   accelerometer.getCurrent();
 *
 * data.x
 * data.y
 * data.z
 */
export function createAccelerometer(
  options = {}
) {
  const {
    frequency = FREQ_MODE_NORMAL
  } = options;

  const sensor =
    new Accelerometer();

  sensor.setFreqMode(
    frequency
  );

  return sensor;
}


/**
 * Start an accelerometer listener.
 *
 * The callback receives:
 *
 * {
 *   x,
 *   y,
 *   z
 * }
 */
export function watchAccelerometer(
  callback,
  options = {}
) {
  const sensor =
    createAccelerometer(
      options
    );

  const listener = () => {
    callback(
      sensor.getCurrent()
    );
  };

  sensor.onChange(
    listener
  );

  sensor.start();

  return {
    sensor,

    callback: listener,

    stop() {
      sensor.offChange(
        listener
      );

      sensor.stop();
    }
  };
}


/* =========================================================
 * GYROSCOPE
 * ========================================================= */

/**
 * Create a gyroscope.
 */
export function createGyroscope(
  options = {}
) {
  const {
    frequency = FREQ_MODE_NORMAL
  } = options;

  const sensor =
    new Gyroscope();

  sensor.setFreqMode(
    frequency
  );

  return sensor;
}


/**
 * Start a gyroscope listener.
 *
 * Callback receives:
 *
 * {
 *   x,
 *   y,
 *   z
 * }
 */
export function watchGyroscope(
  callback,
  options = {}
) {
  const sensor =
    createGyroscope(
      options
    );

  const listener = () => {
    callback(
      sensor.getCurrent()
    );
  };

  sensor.onChange(
    listener
  );

  sensor.start();

  return {
    sensor,

    callback: listener,

    stop() {
      sensor.offChange(
        listener
      );

      sensor.stop();
    }
  };
}


/* =========================================================
 * COMPASS
 * ========================================================= */

/**
 * Create a compass.
 */
export function createCompass(
  options = {}
) {
  const {
    frequency = FREQ_MODE_NORMAL
  } = options;

  const sensor =
    new Compass();

  sensor.setFreqMode(
    frequency
  );

  return sensor;
}


/**
 * Get a simple compass reading.
 *
 * Returns:
 *
 * {
 *   calibrated,
 *   direction,
 *   angle
 * }
 */
export function getCompass() {
  const sensor =
    new Compass();

  return {
    calibrated:
      sensor.getStatus(),

    direction:
      sensor.getDirection(),

    angle:
      sensor.getDirectionAngle()
  };
}


/**
 * Watch compass changes.
 *
 * Callback receives the simplified compass result.
 */
export function watchCompass(
  callback,
  options = {}
) {
  const sensor =
    createCompass(
      options
    );

  const listener = () => {

    callback({
      calibrated:
        sensor.getStatus(),

      direction:
        sensor.getDirection(),

      angle:
        sensor.getDirectionAngle()
    });

  };

  sensor.onChange(
    listener
  );

  sensor.start();

  return {
    sensor,

    callback: listener,

    stop() {
      sensor.offChange(
        listener
      );

      sensor.stop();
    }
  };
}


/* =========================================================
 * GEOLOCATION
 * ========================================================= */

/**
 * Create a geolocation sensor.
 */
export function createGeolocation() {
  return new Geolocation();
}


/**
 * Get the current GPS status.
 */
export function getLocationStatus() {
  const sensor =
    new Geolocation();

  return sensor.getStatus();
}


/**
 * Get current latitude.
 *
 * format:
 * "DD" or "DMS"
 */
export function getLatitude(
  format = "DD"
) {
  const sensor =
    new Geolocation();

  return sensor.getLatitude({
    format
  });
}


/**
 * Get current longitude.
 *
 * format:
 * "DD" or "DMS"
 */
export function getLongitude(
  format = "DD"
) {
  const sensor =
    new Geolocation();

  return sensor.getLongitude({
    format
  });
}


/**
 * Get the current location as one object.
 */
export function getLocation(
  format = "DD"
) {
  const sensor =
    new Geolocation();

  return {
    status:
      sensor.getStatus(),

    latitude:
      sensor.getLatitude({
        format
      }),

    longitude:
      sensor.getLongitude({
        format
      })
  };
}


/**
 * Start watching GPS location.
 *
 * The callback receives:
 *
 * {
 *   status,
 *   latitude,
 *   longitude
 * }
 */
export function watchLocation(
  callback,
  options = {}
) {
  const {
    format = "DD"
  } = options;

  const sensor =
    new Geolocation();

  const listener = () => {

    callback({
      status:
        sensor.getStatus(),

      latitude:
        sensor.getLatitude({
          format
        }),

      longitude:
        sensor.getLongitude({
          format
        })
    });

  };

  sensor.onChange(
    listener
  );

  sensor.start();

  return {
    sensor,

    callback: listener,

    stop() {
      sensor.offChange(
        listener
      );

      sensor.stop();
    }
  };
}


/**
 * Check whether location use is enabled.
 *
 * API 4.0+.
 */
export function isLocationEnabled() {
  const sensor =
    new Geolocation();

  return sensor.getEnabled();
}


/**
 * Get positioning settings.
 *
 * API 3.0+.
 */
export function getLocationSettings() {
  const sensor =
    new Geolocation();

  return sensor.getSetting();
}


/* =========================================================
 * SCREEN
 * ========================================================= */

/**
 * Get current screen state.
 *
 * 1 = on
 * 2 = off
 */
export function getScreenStatus() {
  const sensor =
    new Screen();

  return sensor.getStatus();
}


/**
 * Get AOD state.
 */
export function getAodMode() {
  const sensor =
    new Screen();

  return sensor.getAodMode();
}


/**
 * Get ambient light level in lux.
 *
 * Requires API 3.6+.
 */
export function getScreenLight() {
  const sensor =
    new Screen();

  return sensor.getLight();
}


/**
 * Create a screen sensor.
 */
export function createScreen() {
  return new Screen();
}


/**
 * Watch screen state changes.
 */
export function watchScreen(
  callback
) {
  const sensor =
    new Screen();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * TIME
 * ========================================================= */

/**
 * Create a time sensor.
 */
export function createTimeSensor() {
  return new Time();
}


/**
 * Get the current timestamp in milliseconds.
 */
export function getTimestamp() {
  const sensor =
    new Time();

  return sensor.getTime();
}


/**
 * Get a complete time object.
 */
export function getTime() {
  const sensor =
    new Time();

  return {
    timestamp:
      sensor.getTime(),

    year:
      sensor.getFullYear(),

    month:
      sensor.getMonth(),

    day:
      sensor.getDate(),

    hour:
      sensor.getHours(),

    minute:
      sensor.getMinutes(),

    second:
      sensor.getSeconds(),

    weekday:
      sensor.getDay()
  };
}


/* =========================================================
 * WEAR
 * ========================================================= */

/**
 * Get wearing status.
 *
 * 0 = not wearing
 * 1 = wearing
 * 2 = in motion
 * 3 = not sure
 */
export function getWearStatus() {
  const sensor =
    new Wear();

  return sensor.getStatus();
}


/**
 * Create a wear sensor.
 */
export function createWear() {
  return new Wear();
}


/**
 * Watch wearing-status changes.
 */
export function watchWear(
  callback
) {
  const sensor =
    new Wear();

  sensor.onChange(
    callback
  );

  return {
    sensor,
    callback,

    stop() {
      sensor.offChange(
        callback
      );
    }
  };
}


/* =========================================================
 * BODY TEMPERATURE
 * ========================================================= */

/**
 * Get the current body-surface temperature result.
 */
export function getBodyTemperature() {
  const sensor =
    new BodyTemperature();

  return sensor.getCurrent();
}


/**
 * Get today's body-surface temperature data.
 */
export function getTodayBodyTemperature() {
  const sensor =
    new BodyTemperature();

  return sensor.getToday();
}


/**
 * Create a body-temperature sensor.
 */
export function createBodyTemperature() {
  return new BodyTemperature();
}


/* =========================================================
 * WORKOUT
 * ========================================================= */

/**
 * Get workout status.
 *
 * Returns:
 *
 * {
 *   vo2Max,
 *   trainingLoad,
 *   fullRecoveryTime
 * }
 */
export function getWorkoutStatus() {
  const sensor =
    new Workout();

  return sensor.getStatus();
}


/**
 * Get workout history.
 */
export function getWorkoutHistory() {
  const sensor =
    new Workout();

  return sensor.getHistory();
}


/**
 * Get user heart-rate zone settings.
 *
 * Requires API 4.2+.
 */
export function getWorkoutHrZones() {
  const sensor =
    new Workout();

  return sensor.getUserHrZoneSettings();
}


/**
 * Get workout navigation information.
 *
 * Returns undefined when navigation is unavailable.
 *
 * Requires API 4.2+.
 */
export function getWorkoutNavigation() {
  const sensor =
    new Workout();

  return sensor.getWorkoutTrackNavInfo();
}


/**
 * Create a workout sensor.
 */
export function createWorkout() {
  return new Workout();
}


/* =========================================================
 * WORLD CLOCK
 * ========================================================= */

/**
 * Get all configured world clocks.
 *
 * Returns:
 *
 * [
 *   {
 *     city,
 *     cityCode,
 *     hour,
 *     minute,
 *     timeZoneHour,
 *     timeZoneMinute
 *   }
 * ]
 */
export function getWorldClocks() {
  const sensor =
    new WorldClock();

  const result = [];

  const count =
    sensor.getCount();

  for (
    let i = 0;
    i < count;
    i++
  ) {
    result.push(
      sensor.getInfo(i)
    );
  }

  if (
    typeof sensor.destroy ===
    "function"
  ) {
    sensor.destroy();
  }

  return result;
}


/**
 * Create a WorldClock sensor.
 */
export function createWorldClock() {
  return new WorldClock();
}


/* =========================================================
 * SENSOR HELPERS
 * ========================================================= */

/**
 * Check multiple sensors at once.
 *
 * Example:
 *
 * const available =
 *   checkSensors({
 *     accelerometer: Accelerometer,
 *     compass: Compass
 *   });
 *
 * Result:
 *
 * {
 *   accelerometer: true,
 *   compass: true
 * }
 */
export function checkSensors(
  sensors = {}
) {
  const result = {};

  Object.keys(
    sensors
  ).forEach(
    (name) => {
      result[name] =
        isSensorAvailable(
          sensors[name]
        );
    }
  );

  return result;
}


/**
 * Get common wearable metrics in one call.
 *
 * This is useful for dashboards.
 */
export function getDailyMetrics() {
  return {
    battery:
      getBattery(),

    steps:
      getSteps(),

    stepTarget:
      getStepTarget(),

    calories:
      getCalories(),

    distance:
      getDistance(),

    standingHours:
      getStandingHours(),

    standingTarget:
      getStandingTarget(),

    pai:
      getTodayPai(),

    fatBurningMinutes:
      getFatBurningMinutes()
  };
}


/**
 * Get common sensor readings in one call.
 *
 * Errors from unavailable sensors are isolated so one
 * missing sensor does not prevent the other readings
 * from being returned.
 */
export function getCommonReadings() {
  const result = {};


  safeRead(
    result,
    "battery",
    getBattery
  );

  safeRead(
    result,
    "heartRate",
    getHeartRate
  );

  safeRead(
    result,
    "bloodOxygen",
    getBloodOxygen
  );

  safeRead(
    result,
    "airPressure",
    getAirPressure
  );

  safeRead(
    result,
    "altitude",
    getAltitude
  );

  safeRead(
    result,
    "steps",
    getSteps
  );

  safeRead(
    result,
    "calories",
    getCalories
  );

  safeRead(
    result,
    "distance",
    getDistance
  );

  safeRead(
    result,
    "pai",
    getTodayPai
  );

  return result;
}


/**
 * Run a sensor-reading function without allowing
 * one unavailable sensor to crash the whole call.
 */
function safeRead(
  target,
  key,
  reader
) {
  try {
    target[key] =
      reader();
  } catch (error) {
    target[key] =
      null;
  }
}


/* =========================================================
 * FREQUENCY CONSTANTS
 * ========================================================= */

export {
  FREQ_MODE_LOW,
  FREQ_MODE_NORMAL,
  FREQ_MODE_HIGH
};


/* =========================================================
 * NATIVE SENSOR CLASSES
 * =========================================================
 *
 * Advanced users can still access the real Zepp classes.
 * ZeppCore does not hide the native API.
 */

export {
  Battery,
  Step,
  HeartRate,
  BloodOxygen,
  Sleep,
  Stress,
  Pai,
  Calorie,
  Distance,
  Stand,
  FatBurning,
  Barometer,
  Accelerometer,
  Gyroscope,
  Compass,
  Geolocation,
  Screen,
  Time,
  Wear,
  BodyTemperature,
  Workout,
  WorldClock,
  checkSensor
};