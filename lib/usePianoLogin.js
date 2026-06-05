'use client';

import { useState, useEffect } from 'react';

export function usePianoLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = () => {
      const user = window.tp?.pianoId?.getUser?.();
      if (user?.uid) setIsLoggedIn(true);
    };

    if (window.tp?.pianoId?.getUser) {
      check();
    } else {
      window.tp = window.tp || [];
      window.tp.push(['init', check]);
    }
  }, []);

  return isLoggedIn;
}
