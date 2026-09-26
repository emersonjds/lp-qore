import { vi } from "vitest";

const buildEntry = (target: Element, isIntersecting: boolean): IntersectionObserverEntry => {
  const rectangle = target.getBoundingClientRect();
  return {
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: rectangle,
    intersectionRect: rectangle,
    rootBounds: null,
    time: 0,
  };
};

export class IntersectionObserverMock implements IntersectionObserver {
  static readonly instances = new Set<IntersectionObserverMock>();
  readonly root = null;
  readonly rootMargin: string;
  readonly scrollMargin = "0px";
  readonly thresholds: readonly number[] = [0];
  private readonly callback: IntersectionObserverCallback;
  private readonly targets = new Set<Element>();

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin ?? "0px";
    IntersectionObserverMock.instances.add(this);
  }

  observe = (target: Element) => {
    this.targets.add(target);
  };

  unobserve = (target: Element) => {
    this.targets.delete(target);
  };

  disconnect = () => {
    this.targets.clear();
    IntersectionObserverMock.instances.delete(this);
  };

  takeRecords = (): IntersectionObserverEntry[] => [];

  static trigger = (target: Element, isIntersecting: boolean) => {
    IntersectionObserverMock.instances.forEach((instance) => {
      if (!instance.targets.has(target)) return;
      instance.callback([buildEntry(target, isIntersecting)], instance);
    });
  };
}

export const installIntersectionObserverMock = () => {
  IntersectionObserverMock.instances.clear();
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
};

export const installMatchMediaMock = (matchingQueries: readonly string[]) => {
  vi.stubGlobal(
    "matchMedia",
    (query: string): MediaQueryList => ({
      matches: matchingQueries.includes(query),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: () => false,
    }),
  );
};

export interface FakeAnimation {
  finished: Promise<void>;
  pause: ReturnType<typeof vi.fn>;
  play: ReturnType<typeof vi.fn>;
  cancel: ReturnType<typeof vi.fn>;
}

export const installAnimateMock = ({ finishes }: { finishes: boolean }) => {
  const animations: FakeAnimation[] = [];
  const animate = vi.fn<(keyframes: Keyframe[], options?: KeyframeAnimationOptions) => FakeAnimation>(() => {
    const animation: FakeAnimation = {
      finished: finishes ? Promise.resolve() : new Promise<void>(() => {}),
      pause: vi.fn(),
      play: vi.fn(),
      cancel: vi.fn(),
    };
    animations.push(animation);
    return animation;
  });
  Object.defineProperty(Element.prototype, "animate", { configurable: true, writable: true, value: animate });
  return { animate, animations };
};
