/*
 * =========================================================
 * ZEPPCORE PERMISSIONS
 * =========================================================
 *
 * Dynamic permission helpers for Zepp OS.
 * =========================================================
 */

import {
  queryPermission,
  requestPermission
} from "@zos/app";

export function queryPermissions(permissions) {
  return queryPermission({
    permissions
  });
}

export function queryPermissionStatus(permission) {
  return queryPermission({
    permissions: [permission]
  })[0];
}

export function isPermissionGranted(permission) {
  return queryPermissionStatus(permission) === 2;
}

export function isPermissionKnown(permission) {
  return queryPermissionStatus(permission) !== 1;
}

export function isPermissionRequested(permission) {
  return queryPermissionStatus(permission) !== 0;
}

export function requestPermissions(permissions, callback) {
  return requestPermission({
    permissions,
    callback
  });
}

export function requestPermissionOne(permission, callback) {
  return requestPermission({
    permissions: [permission],
    callback
  });
}

export default {
  queryPermissions,
  queryPermissionStatus,
  isPermissionGranted,
  isPermissionKnown,
  isPermissionRequested,
  requestPermissions,
  requestPermissionOne
};
