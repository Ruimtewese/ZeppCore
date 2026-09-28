/* =========================================================
 * ZEPPCORE LOGGER
 * ========================================================= */

const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

let minimumLevel = LEVELS.debug;
let prefix = "ZeppCore";

function emit(level, args) {
  if (LEVELS[level] < minimumLevel) return;

  const method =
    level === "debug"
      ? "log"
      : level;

  if (
    typeof console !== "undefined" &&
    typeof console[method] === "function"
  ) {
    console[method](
      "[" + prefix + "][" + level.toUpperCase() + "]",
      ...args
    );
  }
}

export function configureLogger(options = {}) {
  if (options.prefix !== undefined) {
    prefix = String(options.prefix);
  }

  if (options.level !== undefined) {
    setLogLevel(options.level);
  }
}

export function setLogLevel(level) {
  const key = String(level).toLowerCase();

  if (LEVELS[key] === undefined) {
    throw new Error("Unknown log level: " + level);
  }

  minimumLevel = LEVELS[key];
}

export function getLogLevel() {
  return (
    Object.keys(LEVELS).find(
      (key) => LEVELS[key] === minimumLevel
    ) || "debug"
  );
}

export function debug(...args) {
  emit("debug", args);
}

export function info(...args) {
  emit("info", args);
}

export function warn(...args) {
  emit("warn", args);
}

export function error(...args) {
  emit("error", args);
}

export function createLogger(name = "") {
  const localPrefix =
    name
      ? prefix + ":" + String(name)
      : prefix;

  function localEmit(level, args) {
    if (LEVELS[level] < minimumLevel) return;

    const method =
      level === "debug"
        ? "log"
        : level;

    if (
      typeof console !== "undefined" &&
      typeof console[method] === "function"
    ) {
      console[method](
        "[" + localPrefix + "][" + level.toUpperCase() + "]",
        ...args
      );
    }
  }

  return {
    debug: (...args) => localEmit("debug", args),
    info: (...args) => localEmit("info", args),
    warn: (...args) => localEmit("warn", args),
    error: (...args) => localEmit("error", args)
  };
}

export const logger = {
  debug,
  info,
  warn,
  error
};

export default logger;
