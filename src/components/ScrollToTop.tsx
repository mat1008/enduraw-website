import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration so SPA controls it
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // If targeting a specific element via hash, let the browser handle it
    if (location.hash) return;
    // Otherwise, always scroll to top on pathname change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.key, location.hash]);

  return null;
};

export default ScrollToTop;

