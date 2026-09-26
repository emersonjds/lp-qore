// jsdom has no AnimationEvent, so React would bind onAnimationEnd to webkitAnimationEnd instead of animationend.
if (!("AnimationEvent" in globalThis)) {
  Object.defineProperty(globalThis, "AnimationEvent", { configurable: true, value: class AnimationEvent extends Event {} });
}
