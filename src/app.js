/*
 * =========================================================
 * ZEPPCORE APP
 * =========================================================
 *
 * App metadata, performance, permissions and App Service
 * helpers.
 * =========================================================
 */

import {
  getPackageInfo,
  getPackageInfoById,
  getPerformance,
  queryPermission,
  requestPermission
} from "@zos/app";

import {
  start as startAppService,
  stop as stopAppService
} from "@zos/app-service";

export function getAppInfo() {
  return getPackageInfo();
}

export function getAppInfoById(appId) {
  return getPackageInfoById({ appId });
}

export function getAppPerformance(...types) {
  return getPerformance(...types);
}

export function getMemoryInfo() {
  return getPerformance("memory");
}

export function getPerformanceInfo() {
  return getPerformance("perf");
}

export function getAppPermissions(permissions) {
  return queryPermission({
    permissions
  });
}

export function requestAppPermissions(permissions, callback) {
  return requestPermission({
    permissions,
    callback
  });
}

export function startService(options = {}) {
  const {
    file,
    param,
    reload = true,
    onComplete = null
  } = options;

  return startAppService({
    file,
    param,
    reload,
    complete_func: onComplete || (() => {})
  });
}

export function stopService(file, onComplete = null) {
  return stopAppService({
    file,
    complete_func: onComplete || (() => {})
  });
}
