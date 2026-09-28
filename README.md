# ZeppCore

A lightweight JavaScript wrapper toolkit for **Zepp OS** app development.

ZeppCore sits on top of the native Zepp OS APIs and gives your app a cleaner, reusable interface for UI, sensors, device controls, storage, networking, interaction, animation, navigation, permissions, compatibility checks, and common utilities.

> **Goal:** make Zepp OS development faster without hiding the native Zepp APIs.

---

## Features

- 🎨 Reusable UI components
- ❤️ Health and wearable sensor helpers
- 📱 Device and display controls
- 🎛️ Keys, gestures, wrist motion, crown, modals and navigation
- 💾 Storage and filesystem helpers
- 🌐 HTTP/network helpers for Zepp Side Service
- ✨ Native widget-property animations
- 📡 In-app communication channels
- ⚙️ System and regional settings
- 🔔 Notification helpers
- 🕒 Date and time utilities
- 🧮 Math and geometry utilities
- 🖼️ Lightweight graphics helpers
- 📍 Location/GPS helpers
- 🧭 Navigation and app-launch helpers
- 🔋 Power and screen controls
- 🧩 Component composition
- 📝 Logging
- 🔐 Runtime permission helpers
- 📋 Device compatibility helpers
- 🧱 Native Zepp classes remain accessible

---

## Installation

ZeppCore is currently designed to be used directly from a Zepp OS project.

### GitHub install

From your Zepp OS application:

```bash
npm install github:Ruimtewese/ZeppCore
```

### Local development

For active development of ZeppCore itself:

```bash
cd ZeppCore
npm link
```

Then inside your test/application project:

```bash
npm link zeppcore
```

This creates a live link to your local ZeppCore source.

---

## Basic usage

Instead of importing every native Zepp module individually:

```js
import {
  pill,
  getBattery,
  getSteps,
  vibrate,
  getDevice,
  animate,
  fadeIn
} from "zeppcore";
```

Example:

```js
import {
  setupPage,
  pillAligned,
  getBattery,
  animate,
  fadeIn
} from "zeppcore";

Page({
  onInit() {
    setupPage({
      hideStatusBar: true
    });

    const battery = getBattery();

    const status = pillAligned({
      x: 30,
      y: 80,
      w: 330,
      h: 64,
      text: battery + "%",
      horizontal: "center",
      vertical: "center"
    });

    fadeIn(status.button, {
      duration: 300
    });
  }
});
```

---

# Modules

## 1. UI

**File:** `src/ui.js`

Reusable Zepp UI wrappers and higher-level controls.

### Theme

- `configureTheme`
- `getTheme`

### Status bar and page setup

- `hideStatusBar`
- `showStatusBar`
- `setStatusBar`
- `setupPage`

### Alignment

- `horizontalAlign`
- `verticalAlign`

### Basic widgets

- `text`
- `pillText`
- `button`
- `pill`
- `pillAligned`
- `iconButton`
- `card`
- `outlineCard`
- `divider`
- `image`
- `circle`
- `arc`

### Progress

- `progressBar`
- `progressCircle`

### Controls

- `switchControl`
- `checkbox`
- `radioGroup`

### Input and picker helpers

- `inputField`
- `numberInput`
- `picker`
- `timePicker`
- `datePicker`

### Higher-level UI

- `pageIndicator`
- `sectionTitle`
- `header`
- `infoCard`
- `statCard`
- `settingRow`
- `buttonRow`
- `progressCard`

The module also re-exports important native Zepp UI constants such as:

- `widget`
- `align`
- `text_style`
- `event`
- `prop`
- `inputType`

---

# 2. Sensors

**File:** `src/sensors.js`

A single wrapper layer for common Zepp wearable sensors.

### Battery and activity

- `getBattery`
- `createBattery`
- `watchBattery`
- `getSteps`
- `getStepTarget`
- `createStep`
- `watchSteps`
- `getCalories`
- `getCalorieTarget`
- `createCalorie`
- `watchCalories`
- `getDistance`
- `createDistance`
- `watchDistance`

### Health

- `getHeartRate`
- `getTodayHeartRate`
- `createHeartRate`
- `watchHeartRate`
- `getBloodOxygen`
- `createBloodOxygen`
- `getBloodOxygenLastDay`
- `startBloodOxygen`
- `getSleepInfo`
- `getSleepStages`
- `getSleepStageConstants`
- `getSleepingStatus`
- `getNaps`
- `createSleep`
- `getStress`
- `getTodayStress`
- `getTodayStressByHour`
- `getLastWeekStress`
- `createStress`
- `watchStress`
- `getTodayPai`
- `getTotalPai`
- `getLastWeekPai`
- `createPai`
- `getBodyTemperature`
- `getTodayBodyTemperature`
- `createBodyTemperature`

### Activity metrics

- `getStandingHours`
- `getStandingTarget`
- `createStand`
- `watchStanding`
- `getFatBurningMinutes`
- `getFatBurningTarget`
- `createFatBurning`
- `watchFatBurning`

### Motion and environment

- `getAirPressure`
- `getAltitude`
- `getBarometer`
- `createBarometer`
- `watchBarometer`
- `createAccelerometer`
- `watchAccelerometer`
- `createGyroscope`
- `watchGyroscope`
- `createCompass`
- `getCompass`
- `watchCompass`

### Location, screen and time

- `createGeolocation`
- `getLocationStatus`
- `getLatitude`
- `getLongitude`
- `getLocation`
- `watchLocation`
- `isLocationEnabled`
- `getLocationSettings`
- `getScreenStatus`
- `getAodMode`
- `getScreenLight`
- `createScreen`
- `watchScreen`
- `createTimeSensor`
- `getTimestamp`
- `getTime`
- `getWearStatus`
- `createWear`
- `watchWear`

### Workout and world clock

- `getWorkoutStatus`
- `getWorkoutHistory`
- `getWorkoutHrZones`
- `getWorkoutNavigation`
- `createWorkout`
- `getWorldClocks`
- `createWorldClock`

### Helpers

- `createSensor`
- `isSensorAvailable`
- `checkSensors`
- `getDailyMetrics`
- `getCommonReadings`

ZeppCore also exports the native sensor classes and frequency constants for advanced use.

---

# 3. Device

**File:** `src/device.js`

Watch/device information, storage information, display settings and vibration.

### Device information

- `getDevice`
- `getScreenSize`
- `getScreenWidth`
- `getScreenHeight`
- `getDeviceSource`
- `getKeyCount`
- `getKeyType`
- `getDeviceName`
- `getDeviceColor`
- `getScreenShape`
- `isSquareScreen`
- `isRoundScreen`
- `getDeviceSummary`

### Storage information

- `getStorageInfo`
- `getStorageTotal`
- `getStorageFree`
- `getAppStorage`
- `getWatchfaceStorage`
- `getMusicStorage`
- `getSystemStorage`
- `getStorageHuman`

### Display and screen

- `getBrightnessLevel`
- `setBrightnessLevel`
- `isAutoBrightnessEnabled`
- `setAutoBrightnessEnabled`
- `setManualBrightness`
- `setPageBrightnessTime`
- `keepScreenAwake`
- `resetPageBrightnessTime`
- `turnScreenOff`
- `setWakeUpRelaunchEnabled`
- `getDisplaySettings`
- `getScreenSettings`
- `getWristSettings`
- `getStandbySettings`
- `pausePalmScreenOffFor`
- `resetPalmScreenOffBehavior`

### System settings

- `getSystemInformation`
- `getDeviceApiLevel`
- `getOsVersion`
- `getFirmwareVersion`
- `getSystemModes`
- `getLanguageCode`
- `getDateFormatSetting`
- `getTimeFormatSetting`
- `uses12HourTime`
- `uses24HourTime`
- `getDistanceUnitSetting`
- `usesMetricDistance`
- `usesImperialDistance`
- `getWeightUnitSetting`
- `getTemperatureUnitSetting`
- `usesCelsius`
- `usesFahrenheit`
- `getRegionalSettings`

### Vibration

- `createVibrator`
- `vibrateLight`
- `vibrate`
- `vibrateStrong`
- `vibrateLong`
- `vibrateNotification`
- `startTimerVibration`
- `startCallVibration`
- `vibrateReminder`
- `stopVibration`

---

# 4. Interaction

**File:** `src/interaction.js`

User input, gestures, wrist motion, toasts, modals, scrolling and app navigation.

### Keys

- `onKeyPress`
- `offKeyPress`
- `onKeyClick`
- `onKeyLongPress`
- `onKeyDoubleClick`
- `onKeyDown`
- `onKeyUp`
- `onBackKey`
- `onHomeKey`
- `onSelectKey`
- `enableBackNavigation`

### Gestures

- `onSwipe`
- `offSwipe`
- `onSwipeUp`
- `onSwipeDown`
- `onSwipeLeft`
- `onSwipeRight`

### Crown and wrist

- `onCrown`
- `offCrown`
- `onCrownClockwise`
- `onCrownCounterClockwise`
- `onWrist`
- `onWristLift`
- `onWristLower`
- `onWristFlip`

### Feedback

- `toast`
- `successToast`
- `errorToast`
- `modal`
- `confirm`
- `showModal`
- `hideModal`

### Routing

- `goTo`
- `replacePage`
- `goBack`
- `goHome`
- `exitApp`
- `launchMiniApp`
- `launchSystemApp`

### Scrolling

- `scrollPageTo`
- `getPageScroll`
- `scrollToTop`
- `scrollSmoothTo`
- `enableFreeScroll`
- `enableVerticalSwiper`
- `enableHorizontalSwiper`
- `swipeToPage`
- `getCurrentSwiperIndex`
- `jumpToPage`

The module also provides shortcuts for opening common system apps such as weather, alarm, music, compass, stopwatch, timer and settings.

---

# 5. Storage

**File:** `src/storage.js`

A unified wrapper around Zepp storage and filesystem APIs.

### Local storage

- `setData`
- `getData`
- `removeData`
- `clearData`
- `createStorage`

### Session storage

- `setSession`
- `getSession`
- `removeSession`
- `clearSession`
- `createSession`

### JSON and files

- `saveJSON`
- `loadJSON`
- `isJSONFile`
- `updateJSON`
- `removeJSONKey`
- `readText`
- `readBinary`
- `writeText`
- `writeBinary`
- `appendText`
- `appendBinary`

### File handles and filesystem

- `openFile`
- `closeFile`
- `readOpenedFile`
- `writeOpenedFile`
- `getFileInfo`
- `fileExists`
- `getFileSize`
- `getFileModifiedTime`
- `createDirectory`
- `listDirectory`
- `directoryExists`
- `deleteFile`
- `renameFile`
- `deleteIfExists`
- `renameIfExists`

### Assets

- `getAssetInfo`
- `assetExists`
- `getAssetSize`
- `openAsset`
- `readAsset`
- `readAssetText`
- `readAssetJSON`

### Typed helpers and runtime cache

- `saveObject`
- `loadObject`
- `deleteObject`
- `setBool`
- `getBool`
- `setNumber`
- `getNumber`
- `setString`
- `getString`
- `setSessionBool`
- `getSessionBool`
- `setSessionNumber`
- `getSessionNumber`
- `setSessionString`
- `getSessionString`
- `cacheSet`
- `cacheGet`
- `cacheHas`
- `cacheDelete`
- `cacheClear`

---

# 6. Network

**File:** `src/network.js`

HTTP helpers for the Zepp OS **Side Service**.

> Zepp OS networking is environment-dependent. Actual Fetch requests should run from the Side Service where Zepp exposes `fetch()`.

### Availability

- `isNetworkAvailable`
- `assertNetworkAvailable`

### URL helpers

- `buildURL`
- `encodeQuery`
- `encodeURL`
- `decodeURL`
- `apiURL`

### HTTP

- `request`
- `get`
- `post`
- `put`
- `patch`
- `del`

### JSON and text

- `getJSON`
- `postJSON`
- `putJSON`
- `patchJSON`
- `deleteJSON`
- `requestJSON`
- `getText`
- `postText`

### Response helpers

- `getResponseBody`
- `responseText`
- `responseJSON`
- `responseJSONStrict`

### Safe helpers

- `getTextSafe`
- `getJSONSafe`
- `postJSONSafe`

### API helpers

- `createAPI`
- `createHeaders`
- `createJSONHeaders`
- `jsonHeaders`
- `jsonBody`
- `createJSONRequest`

---

# 7. Animation

**File:** `src/animation.js`

ZeppCore uses **native widget-property animation**.

It does **not** use frame-by-frame image animation.

Supported properties include:

- X
- Y
- width
- height
- alpha

### Basic animation

```js
import {
  animate
} from "zeppcore";

animate(widget, {
  x: [20, 200],
  y: [100, 120],
  duration: 500,
  easing: "easeout"
});
```

### Easing

- `linear`
- `easein`
- `easeout`
- `easeinout`
- `bounce`

### Core controls

- `animate`
- `startAnimation`
- `stopAnimation`
- `pauseAnimation`
- `resumeAnimation`
- `getAnimationStatus`

### Movement and size

- `moveX`
- `moveY`
- `move`
- `resizeWidth`
- `resizeHeight`
- `resize`

### Fade and slide

- `fade`
- `fadeIn`
- `fadeOut`
- `slideInLeft`
- `slideInRight`
- `slideInTop`
- `slideInBottom`
- `slideOutLeft`
- `slideOutRight`
- `slideOutTop`
- `slideOutBottom`

### Effects

- `popIn`
- `popPill`
- `shrink`
- `expand`
- `bounceX`
- `bounceY`
- `pulse`
- `breathe`
- `shake`

### Text and components

- `animateText`
- `textIn`
- `animatePill`
- `animateCard`
- `animateGroup`
- `moveGroup`

### Stagger and timelines

- `staggerIn`
- `staggerFadeIn`
- `staggerSlideUp`
- `createTimeline`

### Loops

- `loop`
- `loopFade`
- `loopMoveX`
- `loopMoveY`

### Global animation control

- `pauseAllAnimations`
- `resumeAllAnimations`
- `stopAllAnimations`
- `getAnimationCount`
- `clearAnimationRegistry`

### Composition

- `sequence`
- `parallel`
- `chain`
- `spring`
- `interruptAnimation`
- `animateWithProgress`

Example:

```js
import {
  sequence,
  parallel
} from "zeppcore";

sequence([
  (done) =>
    animate(widget, {
      x: [0, 100],
      duration: 300,
      onComplete: done
    }),

  (done) =>
    animate(widget, {
      y: [0, 100],
      duration: 300,
      onComplete: done
    })
]);
```

---

# 8. Communication

**File:** `src/communication.js`

Simple event/channel communication for components and application code.

- `on`
- `off`
- `once`
- `emit`
- `broadcast`
- `clearChannel`
- `clearCommunication`
- `listenerCount`
- `createChannel`
- `encodeMessage`
- `decodeMessage`

Example:

```js
import {
  createChannel
} from "zeppcore";

const channel = createChannel("weather");

channel.on((data) => {
  console.log(data.temperature);
});

channel.emit({
  temperature: 24
});
```

---

# 9. Settings

**File:** `src/settings.js`

Convenient wrappers around system and regional settings.

- `getLanguage`
- `getDateFormatSetting`
- `getTimeFormatSetting`
- `getDistanceUnitSetting`
- `getWeightUnitSetting`
- `getTemperatureUnitSetting`
- `getSystemInformation`
- `getSystemModes`
- `uses12HourTime`
- `uses24HourTime`
- `usesMetricDistance`
- `usesImperialDistance`
- `usesCelsius`
- `usesFahrenheit`
- `getSettingsSnapshot`

The corresponding Zepp setting constants are also exported.

---

# 10. Notifications

**File:** `src/notifications.js`

Notification helpers:

- `sendNotification`
- `cancelNotification`
- `getNotificationIds`
- `cancelAllNotifications`
- `notificationAction`

Check the relevant Zepp OS API requirements and application permissions for notification features.

---

# 11. Time

**File:** `src/time.js`

Dependency-free time and date utilities.

- `getTimestamp`
- `getCurrentTime`
- `formatTime`
- `formatDate`
- `minutesSinceMidnight`
- `secondsSinceMidnight`
- `startOfDay`
- `addMinutes`
- `addSeconds`
- `differenceMs`
- `isSameDay`
- `pad`

---

# 12. Math

**File:** `src/math.js`

Common numerical and geometry helpers.

- `clamp`
- `lerp`
- `inverseLerp`
- `mapRange`
- `percentage`
- `round`
- `floor`
- `ceil`
- `mod`
- `degToRad`
- `radToDeg`
- `distance2D`
- `distance3D`
- `angle2D`
- `normalizeAngle`
- `average`
- `sum`
- `randomInt`
- `nearlyEqual`
- `isBetween`

---

# 13. Graphics

**File:** `src/graphics.js`

Lightweight drawing and geometry helpers.

- `rgb`
- `hex`
- `alpha`
- `centerRect`
- `insetRect`
- `createFillRect`
- `createStrokeRect`
- `createCircle`
- `createArc`

These helpers build on the native `@zos/ui` widget system.

---

# 14. Location

**File:** `src/location.js`

High-level GPS/location helpers.

- `createLocationSensor`
- `getLocation`
- `getLocationStatus`
- `isLocationEnabled`
- `getLocationSettings`
- `watchLocation`

Location is a power-hungry feature, so start it only when necessary and stop the sensor when finished.

---

# 15. Navigation

**File:** `src/navigation.js`

Convenient wrappers around Zepp router APIs.

- `goTo`
- `replacePage`
- `goBack`
- `goHome`
- `exitApp`
- `launchMiniApp`
- `launchSystemApp`
- `scheduleLaunch`
- `cancelScheduledLaunch`

Native router functions are also re-exported.

---

# 16. Power

**File:** `src/power.js`

Screen, brightness and power-related controls.

- `getBrightnessLevel`
- `setBrightnessLevel`
- `isAutoBrightnessEnabled`
- `setAutoBrightnessEnabled`
- `keepScreenAwake`
- `resetScreenTimeout`
- `turnScreenOff`
- `setWakeUpRelaunchEnabled`
- `pausePalmScreenOffFor`
- `resetPalmScreenOffBehavior`
- `pauseWristScreenOffFor`
- `resetWristScreenOffBehavior`
- `getDisplaySettings`
- `getPowerModes`
- `isPowerSaving`
- `isUltraPowerSaving`

These controls are especially useful for apps that need to manage screen behavior while a page is active.

---

# 17. App

**File:** `src/app.js`

Application metadata, performance and service helpers.

- `getAppInfo`
- `getAppInfoById`
- `getAppPerformance`
- `getMemoryInfo`
- `getPerformanceInfo`
- `getAppPermissions`
- `requestAppPermissions`
- `startService`
- `stopService`

---

# 18. Components

**File:** `src/components.js`

Small composition helpers for building reusable application components.

- `createComponent`
- `group`
- `withState`
- `addChild`
- `addChildren`
- `removeChild`
- `clearChildren`

Example:

```js
import {
  createComponent,
  group
} from "zeppcore";

const panel = createComponent({
  state: {
    selected: 0
  },

  children: [
    group()
  ],

  onMount(component) {
    console.log("Mounted", component);
  }
});
```

---

# 19. Logger

**File:** `src/logger.js`

Simple configurable logging.

```js
import {
  configureLogger,
  info,
  warn,
  error
} from "zeppcore";

configureLogger({
  prefix: "Weather",
  level: "debug"
});

info("Weather loaded");
warn("Using cached data");
error("Request failed");
```

Exports:

- `configureLogger`
- `setLogLevel`
- `getLogLevel`
- `debug`
- `info`
- `warn`
- `error`
- `createLogger`
- `logger`

---

# 20. Permissions

**File:** `src/permissions.js`

Runtime permission helpers.

- `queryPermissions`
- `queryPermissionStatus`
- `isPermissionGranted`
- `isPermissionKnown`
- `isPermissionRequested`
- `requestPermissions`
- `requestPermissionOne`

Example:

```js
import {
  isPermissionGranted,
  requestPermissionOne
} from "zeppcore";

const permission = "device:os.location";

if (!isPermissionGranted(permission)) {
  requestPermissionOne(
    permission,
    (result) => {
      console.log(result);
    }
  );
}
```

Always declare the required permission in the application configuration where required by Zepp OS.

---

# 21. Compatibility

**File:** `src/compatibility.js`

Helpers for adapting an app to different devices.

- `getDeviceCapabilities`
- `hasScreenSize`
- `isBip6`
- `isSquareScreen`
- `isRoundScreen`
- `compareVersions`
- `supportsVersion`
- `createCompatibilityProfile`

Example:

```js
import {
  isBip6,
  getDeviceCapabilities
} from "zeppcore";

if (isBip6()) {
  console.log("Bip 6 layout");
}

console.log(
  getDeviceCapabilities()
);
```

---



# 22. Audio

**File:** `src/audio.js`

ZeppCore now includes a dedicated audio layer for playback, recording, and built-in system sounds.

The module wraps the native `@zos/media` and `@zos/sensor` audio APIs. Zepp's media API supports audio playback and recording from API_LEVEL 3.0; the documented recorder codec is OPUS. Built-in `SystemSounds` is available from API_LEVEL 3.6. citeturn546201search1turn546201search5turn546201search0

### Playback

- `createAudioPlayer`
- `setAudioSource`
- `prepareAudio`
- `playAudio`
- `pauseAudio`
- `resumeAudio`
- `stopAudio`
- `getAudioStatus`
- `getAudioDuration`
- `getAudioVolume`
- `setAudioVolume`
- `getAudioInfo`
- `getAudioTitle`
- `getAudioArtist`
- `seekAudioPercent`
- `seekAudioSeconds`
- `onAudioEvent`
- `playAudioFile`

Example:

```js
import {
  playAudioFile
} from "zeppcore";

const player = playAudioFile(
  "sounds/beep.mp3",
  {
    onComplete() {
      console.log("Audio finished");
    }
  }
);
```

Zepp's player supports MP3 and OPUS audio files, including files in the app assets directory and `data://` paths for downloaded audio. citeturn546201search1

### Recording

- `createAudioRecorder`
- `setAudioRecordTarget`
- `startAudioRecording`
- `stopAudioRecording`
- `onAudioRecordEvent`
- `recordAudio`

Example:

```js
import {
  recordAudio
} from "zeppcore";

const recorder = recordAudio(
  "data://recording.opus",
  {
    onStart() {
      console.log("Recording started");
    },

    onStop() {
      console.log("Recording stopped");
    }
  }
);

// Later:
recorder.stop();
```

The native recorder currently documents OPUS as its supported codec and stores recordings in the mini app's data directory. citeturn546201search5

### Built-in system sounds

- `createSystemSounds`
- `areSystemSoundsEnabled`
- `getSystemSoundTypes`
- `playSystemSound`
- `stopSystemSound`

Supported built-in sound categories include alarm, message, regular, achievement, camera, high/low abnormal-health sounds, and SOS. System sounds only play when the system ringtone function is enabled. citeturn546201search0

Example:

```js
import {
  createSystemSounds,
  playSystemSound
} from "zeppcore";

const sounds =
  createSystemSounds();

const types =
  sounds.getSourceType();

playSystemSound(
  types.REGULAR
);
```

### API-version notes

- File playback and recording: API_LEVEL 3.0+
- SystemSounds: API_LEVEL 3.6+
- Percentage seek: API_LEVEL 4.2+
- Seek by seconds: API_LEVEL 4.3+

ZeppCore checks for newer seek methods before using them so the same module can still be used on older API targets. citeturn546201search1turn546201search3

---

# Native API access

ZeppCore is a wrapper, not a replacement for Zepp OS.

You can still use the underlying Zepp APIs directly whenever ZeppCore does not expose the functionality you need.

For example:

```js
import {
  widget,
  prop,
  event
} from "zeppcore";
```

Advanced projects can also import the native sensor classes and constants exposed by the relevant ZeppCore modules.

---

# Architecture

The package is intentionally split into small modules:

```text
ZeppCore/
├── index.js
├── package.json
└── src/
    ├── ui.js
    ├── sensors.js
    ├── device.js
    ├── interaction.js
    ├── storage.js
    ├── network.js
    ├── animation.js
    ├── communication.js
    ├── settings.js
    ├── notifications.js
    ├── time.js
    ├── math.js
    ├── graphics.js
    ├── location.js
    ├── navigation.js
    ├── power.js
    ├── app.js
    ├── components.js
    ├── logger.js
    ├── permissions.js
    └── compatibility.js
```

The package entry point re-exports the modules so application code can normally import everything from:

```js
import {
  ...
} from "zeppcore";
```

---

# Design principles

### Lightweight

ZeppCore is intended for wearable applications where memory, storage and execution time matter.

### Wrapper, not lock-in

The native Zepp OS API should remain accessible.

### Reusable

Common patterns should be implemented once instead of repeatedly in every app.

### Device-aware

Apps often need to behave differently across screen sizes, hardware and OS versions. The compatibility helpers make that easier.

### Native animations

ZeppCore's animation system uses Zepp widget property animation rather than large frame/image sequences.

### Small modules

You can use the parts you need without putting all application logic into one giant utility file.

---

# Example project

A small Zepp page could look like:

```js
import {
  setupPage,
  pillAligned,
  getBattery,
  onBackKey,
  vibrateLight,
  fadeIn
} from "zeppcore";

Page({
  onInit() {
    setupPage({
      hideStatusBar: true
    });

    const status = pillAligned({
      x: 25,
      y: 100,
      w: 340,
      h: 64,
      text: "Battery " + getBattery() + "%"
    });

    fadeIn(status.button, {
      duration: 250
    });

    onBackKey(() => {
      this.exit();
      return true;
    });

    vibrateLight();
  }
});
```

---

# Development

The project is a JavaScript/ES module package designed to run inside Zepp OS application projects.

Useful local workflow:

```bash
git clone https://github.com/Ruimtewese/ZeppCore.git
cd ZeppCore
npm link
```

Then in a Zepp OS test project:

```bash
npm link zeppcore
```

After changing ZeppCore locally, the linked project uses the updated source automatically.

When ZeppCore is changed on GitHub, update a local clone with:

```bash
git pull origin main
```

---

# Compatibility and API versions

Zepp OS APIs vary between OS versions and devices.

Some helpers depend on APIs that are not available on every watch. Check the corresponding native Zepp OS API requirements before using device-specific functionality.

ZeppCore intentionally does not pretend every feature is available everywhere. Use:

- `isSensorAvailable`
- `getDevice`
- `getDeviceCapabilities`
- `supportsVersion`
- `createCompatibilityProfile`

to build device-aware applications.

---

# Contributing

Contributions and improvements are welcome.

When adding a new helper:

1. Keep the wrapper small and focused.
2. Prefer native Zepp APIs over duplicated implementations.
3. Keep the original Zepp behavior understandable.
4. Document important API/version requirements.
5. Export the new functionality through `index.js`.

---

# License

MIT

---

# Repository

**GitHub:**  
https://github.com/Ruimtewese/ZeppCore

**Author:**  
Ruimtewese

**Package:**  
`zeppcore`
