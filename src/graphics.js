/*
 * =========================================================
 * ZEPPCORE GRAPHICS
 * =========================================================
 *
 * Small drawing and geometry helpers built on @zos/ui.
 * =========================================================
 */

import {
  createWidget,
  widget
} from "@zos/ui";

export function rgb(red, green, blue) {
  return (
    ((Math.round(red) & 0xff) << 16) |
    ((Math.round(green) & 0xff) << 8) |
    (Math.round(blue) & 0xff)
  );
}

export function hex(value) {
  return "0x" + (Number(value) >>> 0).toString(16).padStart(6, "0");
}

export function alpha(value, opacity) {
  const color = Number(value) >>> 0;
  const a = Math.max(0, Math.min(255, Math.round(opacity)));

  return {
    color,
    opacity: a
  };
}

export function centerRect(parentX, parentY, parentW, parentH, w, h) {
  return {
    x: Math.round(parentX + (parentW - w) / 2),
    y: Math.round(parentY + (parentH - h) / 2),
    w,
    h
  };
}

export function insetRect(rect, amount) {
  return {
    x: rect.x + amount,
    y: rect.y + amount,
    w: Math.max(0, rect.w - amount * 2),
    h: Math.max(0, rect.h - amount * 2)
  };
}

export function createFillRect(options = {}) {
  const {
    x = 0,
    y = 0,
    w = 1,
    h = 1,
    color = 0xffffff,
    radius = 0
  } = options;

  return createWidget(widget.FILL_RECT, {
    x,
    y,
    w,
    h,
    color,
    radius
  });
}

export function createStrokeRect(options = {}) {
  const {
    x = 0,
    y = 0,
    w = 1,
    h = 1,
    color = 0xffffff,
    radius = 0,
    lineWidth = 1
  } = options;

  return createWidget(widget.STROKE_RECT, {
    x,
    y,
    w,
    h,
    color,
    radius,
    line_width: lineWidth
  });
}

export function createCircle(options = {}) {
  const {
    centerX = 0,
    centerY = 0,
    radius = 1,
    color = 0xffffff,
    opacity = 255
  } = options;

  return createWidget(widget.CIRCLE, {
    center_x: centerX,
    center_y: centerY,
    radius,
    color,
    alpha: opacity
  });
}

export function createArc(options = {}) {
  const {
    x = 0,
    y = 0,
    w = 100,
    h = 100,
    radius = 40,
    startAngle = -90,
    endAngle = 90,
    lineWidth = 5,
    color = 0xffffff
  } = options;

  return createWidget(widget.ARC, {
    x,
    y,
    w,
    h,
    radius,
    start_angle: startAngle,
    end_angle: endAngle,
    line_width: lineWidth,
    color
  });
}

export default {
  rgb,
  hex,
  alpha,
  centerRect,
  insetRect,
  createFillRect,
  createStrokeRect,
  createCircle,
  createArc
};
