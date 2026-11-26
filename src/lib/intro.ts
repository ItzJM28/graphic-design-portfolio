type IntroStorage = Pick<Storage, "getItem" | "setItem">;

/**
 * True only on the first page view of a browser session.
 * Never plays with reduced motion, and never blocks the page when storage is unavailable.
 *
 * Self-contained on purpose: layout.tsx inlines its source as a pre-paint script.
 */
export function shouldPlayIntro(storage: IntroStorage | null, reducedMotion: boolean): boolean {
  const key = "jd-intro-seen";
  if (reducedMotion || !storage) return false;
  try {
    if (storage.getItem(key)) return false;
    storage.setItem(key, "1");
    return true;
  } catch {
    return false;
  }
}

/** Inline script: marks <html data-intro> before first paint when the intro should play. */
export const introPrepaintScript = `(function(){try{var s=null;try{s=window.sessionStorage}catch(e){}
var play=(${shouldPlayIntro.toString()})(s, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
if(play)document.documentElement.setAttribute("data-intro","1")}catch(e){}})();`;
