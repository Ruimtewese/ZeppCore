/*
 * =========================================================
 * ZEPPCORE NOTIFICATIONS
 * =========================================================
 *
 * System Notification helpers.
 *
 * Requires the app.json permission:
 *   device:os.notification
 * =========================================================
 */

import {
  notify,
  cancel,
  getAllNotifications
} from "@zos/notification";

export function sendNotification(options = {}) {
  const {
    title = "",
    content = "",
    actions = [],
    vibrate = 0
  } = options;

  return notify({
    title: String(title),
    content: String(content),
    actions,
    vibrate
  });
}

export function cancelNotification(id) {
  return cancel(id);
}

export function getNotificationIds() {
  return getAllNotifications();
}

export function cancelAllNotifications() {
  const ids = getAllNotifications();

  if (ids.length > 0) {
    cancel(ids);
  }

  return ids.length;
}

export function notificationAction(text, file, param) {
  const action = {
    text: String(text),
    file: String(file)
  };

  if (param !== undefined) {
    action.param = String(param);
  }

  return action;
}

export default {
  sendNotification,
  cancelNotification,
  getNotificationIds,
  cancelAllNotifications,
  notificationAction
};
