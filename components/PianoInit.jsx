'use client';

import { useEffect } from 'react';

export default function PianoInit({ section, tags = [], contentCreator }) {
  useEffect(() => {
    window.tp = window.tp || [];

    if (section) window.tp.push(['setContentSection', section]);
    if (tags.length) window.tp.push(['setTags', tags]);

    window.tp.push(['init', function () {
      window.tp.experience.execute();
    }]);
  }, []);

  return null;
}
