/*
 * =========================================================
 * ZEPPCORE COMMUNICATION
 * =========================================================
 *
 * Lightweight in-process communication for pages, services,
 * and reusable library components.
 * =========================================================
 */

const channels = new Map();

function getListeners(channel) {
  if (!channels.has(channel)) channels.set(channel, new Set());
  return channels.get(channel);
}

export function on(channel, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Communication callback must be a function.");
  }

  getListeners(String(channel)).add(callback);

  return () => off(channel, callback);
}

export function off(channel, callback) {
  const listeners = channels.get(String(channel));
  if (!listeners) return false;

  const removed = listeners.delete(callback);

  if (listeners.size === 0) channels.delete(String(channel));

  return removed;
}

export function once(channel, callback) {
  const wrapper = (payload) => {
    off(channel, wrapper);
    callback(payload);
  };

  return on(channel, wrapper);
}

export function emit(channel, payload) {
  const listeners = channels.get(String(channel));

  if (!listeners) return 0;

  for (const callback of [...listeners]) {
    callback(payload);
  }

  return listeners.size;
}

export function broadcast(channel, payload) {
  return emit(channel, payload);
}

export function clearChannel(channel) {
  return channels.delete(String(channel));
}

export function clearCommunication() {
  channels.clear();
}

export function listenerCount(channel) {
  return getListeners(String(channel)).size;
}

export function createChannel(name) {
  const channel = String(name);

  return {
    name: channel,
    on(callback) {
      return on(channel, callback);
    },
    off(callback) {
      return off(channel, callback);
    },
    once(callback) {
      return once(channel, callback);
    },
    emit(payload) {
      return emit(channel, payload);
    },
    clear() {
      return clearChannel(channel);
    },
    listenerCount() {
      return listenerCount(channel);
    }
  };
}

export function encodeMessage(type, data = null) {
  return JSON.stringify({
    type: String(type),
    data
  });
}

export function decodeMessage(message) {
  const parsed =
    typeof message === "string"
      ? JSON.parse(message)
      : message;

  if (!parsed || typeof parsed !== "object") {
    throw new TypeError("Invalid ZeppCore communication message.");
  }

  return {
    type: parsed.type,
    data: parsed.data
  };
}

export default {
  on,
  off,
  once,
  emit,
  broadcast,
  clearChannel,
  clearCommunication,
  listenerCount,
  createChannel,
  encodeMessage,
  decodeMessage
};
