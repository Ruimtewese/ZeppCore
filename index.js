/*
 * =========================================================
 * ZEPPCORE
 * =========================================================
 *
 * Main public entry point.
 *
 * Everything exported here becomes available through:
 *
 *   import { ... } from "zeppcore";
 *
 * =========================================================
 */

export * from "./src/ui.js";
export * from "./src/sensors.js";
export * from "./src/device.js";

/*
 * Interaction exports.
 *
 * Navigation helpers are intentionally NOT re-exported from
 * interaction.js here because navigation.js is the canonical
 * public home for:
 *
 *   goTo
 *   replacePage
 *   goBack
 *   goHome
 *   exitApp
 *   launchMiniApp
 *   launchSystemApp
 *
 * This avoids ambiguous Rollup namespace exports.
 */
export {
  onKeyPress,
  offKeyPress,
  onKeyClick,
  onKeyLongPress,
  onKeyDoubleClick,
  onKeyDown,
  onKeyUp,
  onBackKey,
  onHomeKey,
  onSelectKey,
  enableBackNavigation,

  onSwipe,
  offSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,

  onCrown,
  offCrown,
  onCrownClockwise,
  onCrownCounterClockwise,

  onWrist,
  onWristLift,
  onWristLower,
  onWristFlip,

  toast,
  successToast,
  errorToast,

  modal,
  confirm,
  showModal,
  hideModal,

  openHeartRate,
  openWeather,
  openAlarm,
  openMusic,
  openStopwatch,
  openTimer,
  openFindPhone,
  openSettings,
  openCameraRemote,
  openPhone,
  openCalendar,
  openCompass,
  openWorkout,
  openStatus,
  openCards,

  KEY_BACK,
  KEY_SELECT,
  KEY_HOME,
  KEY_UP,
  KEY_DOWN,
  KEY_SHORTCUT,

  KEY_EVENT_CLICK,
  KEY_EVENT_LONG_PRESS,
  KEY_EVENT_DOUBLE_CLICK,
  KEY_EVENT_PRESS,
  KEY_EVENT_RELEASE,

  GESTURE_UP,
  GESTURE_DOWN,
  GESTURE_LEFT,
  GESTURE_RIGHT,

  WRIST_MOTION_LIFT,
  WRIST_MOTION_LOWER,
  WRIST_MOTION_FLIP,

  MODAL_CONFIRM,
  MODAL_CANCEL,

  SCROLL_MODE_FREE,
  SCROLL_MODE_SWIPER,
  SCROLL_MODE_SWIPER_HORIZONTAL,

  SCROLL_ANIMATION_SMOOTH,
  SCROLL_ANIMATION_NONE,

  SYSTEM_APP_STATUS,
  SYSTEM_APP_HR,
  SYSTEM_APP_SPORT,
  SYSTEM_APP_WEATHER,
  SYSTEM_APP_ALARM,
  SYSTEM_APP_CAMERA,
  SYSTEM_APP_MUSIC,
  SYSTEM_APP_STOPWATCH,
  SYSTEM_APP_COUNTDOWN,
  SYSTEM_APP_FINE_PHONE,
  SYSTEM_APP_CARD,
  SYSTEM_APP_SETTING,
  SYSTEM_APP_COMPASS,
  SYSTEM_APP_CALENDAR,
  SYSTEM_APP_PHONE
} from "./src/interaction.js";

export * from "./src/storage.js";
export * from "./src/network.js";
export * from "./src/animation.js";

export * from "./src/communication.js";
export * from "./src/settings.js";
export * from "./src/notifications.js";
export * from "./src/time.js";
export * from "./src/math.js";
export * from "./src/graphics.js";
export * from "./src/location.js";

/*
 * Navigation is the canonical public export for all routing
 * helpers, including exitApp.
 */
export * from "./src/navigation.js";

export * from "./src/power.js";
export * from "./src/app.js";
export * from "./src/components.js";
export * from "./src/logger.js";
export * from "./src/permissions.js";
export * from "./src/compatibility.js";
export * from "./src/audio.js";

export {
  default as animation
} from "./src/animation.js";

export {
  default as network
} from "./src/network.js";

export {
  default as logger
} from "./src/logger.js";
