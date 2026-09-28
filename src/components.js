/*
 * =========================================================
 * ZEPPCORE COMPONENTS
 * =========================================================
 *
 * Helpers for composing groups of ZeppCore widgets into
 * reusable component-like objects.
 * =========================================================
 */

export function createComponent(options = {}) {
  const {
    children = [],
    state = {},
    onMount = null,
    onDestroy = null
  } = options;

  const component = {
    children: [...children],
    state,
    mounted: false,

    add(...items) {
      component.children.push(...items);
      return component;
    },

    mount() {
      if (component.mounted) return component;

      component.mounted = true;

      if (typeof onMount === "function") {
        onMount(component);
      }

      return component;
    },

    destroy() {
      if (!component.mounted && component.children.length === 0) {
        return component;
      }

      if (typeof onDestroy === "function") {
        onDestroy(component);
      }

      component.children.length = 0;
      component.mounted = false;

      return component;
    }
  };

  return component;
}

export function group(...children) {
  return createComponent({
    children
  });
}

export function withState(component, initialState = {}) {
  component.state = {
    ...component.state,
    ...initialState
  };

  return component;
}

export function addChild(component, child) {
  return component.add(child);
}

export function addChildren(component, ...children) {
  return component.add(...children);
}

export function removeChild(component, child) {
  const index = component.children.indexOf(child);

  if (index !== -1) {
    component.children.splice(index, 1);
    return true;
  }

  return false;
}

export function clearChildren(component) {
  component.children.length = 0;
  return component;
}
