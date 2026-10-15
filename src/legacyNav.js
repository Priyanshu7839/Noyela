import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Maps old string screen IDs -> real URL paths
export function screenToPath(screen) {
  if (screen === 'splash') return '/';
  if (screen.startsWith('onboarding-')) return `/onboarding/${screen.split('-')[1]}`;
  if (screen === 'auth') return '/auth';
  if (screen === 'personalization') return '/personalization';
  if (screen === 'ask-noyela') return '/ask-noyela';
  if (screen.startsWith('face-')) return `/face/${screen.replace('face-', '')}`;
  if (screen === 'doctor-profile') return '/doctors/profile';
  if (screen === 'booking') return '/booking';
  if (screen === 'booking-confirm') return '/booking/confirm';
  if (screen === 'booking-review') return '/booking/review';
  if (screen === 'treatment-detail') return '/treatment-detail';
  if (screen === 'home') return '/home';
  if (screen.startsWith('skin-')) return `/skin/${screen.replace('skin-', '')}`;
  if (screen.startsWith('hair-')) return `/hair/${screen.replace('hair-', '')}`;
  if (screen.startsWith('jawline-')) return `/jawline/${screen.replace('jawline-', '')}`;
  if (['sleep', 'nutrition', 'supplements'].includes(screen)) return `/${screen}`;
  if (screen.startsWith('roadmap')) {
    const sub = screen.replace('roadmap-', '') || 'today';
    return `/roadmap/${sub}`;
  }
  if (screen === 'progress') return '/progress';
  if (screen === 'doctors') return '/doctors';
  if (['notifications', 'profile', 'settings'].includes(screen)) return `/${screen}`;
  return '/home';
}

// Drop-in replacement for the old `navigate(screenString, params)` signature.
// Use this INSIDE a component (it's a hook).
export function useLegacyNavigate() {
  const rrNavigate = useNavigate();
  return (screen, params) => {
    const path = screenToPath(screen);
    rrNavigate(path, { state: params });
  };
}

// Rebuilds the old `screen` string (e.g. "skin-overview") from the current
// route's :sub param, for components that switch behavior based on it.
export function useLegacyScreen(prefix, defaultSub = '') {
  const { sub } = useParams();
  return sub ? `${prefix}-${sub}` : `${prefix}${defaultSub ? `-${defaultSub}` : ''}`;
}

// Rebuilds the old `params` object that used to be passed via
// navigate(screen, params) — now carried in router location state.
export function useLegacyParams() {
  const location = useLocation();
  return location.state || {};
}
