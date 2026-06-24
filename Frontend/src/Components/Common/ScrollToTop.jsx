import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const startPosition = window.pageYOffset;
    const duration = 1500; // 1.5 seconds (increase for slower)
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out effect
      const easeOut = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startPosition * (1 - easeOut));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [pathname]);

  return null;
};

export default ScrollToTop;