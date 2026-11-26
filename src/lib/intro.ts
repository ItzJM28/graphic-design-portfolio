export const INTRO_KEY = "jd-intro-seen";

type IntroStorage = Pick<Storage, "getItem" | "setItem">;

/**
 * True only on the first page view of a browser session.
 * Never plays with reduced motion, and never blocks the page when storage is unavailable.
 */
export function shouldPlayIntro(storage: IntroStorage | null, reducedMotion: boolean): boolean {
  if (reducedMotion || !storage) return false;
  try {
    if (storage.getItem(INTRO_KEY)) return false;
    storage.setItem(INTRO_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
