// components/Figure.js
import React from 'react';

export default function Figure({ src, alt, caption, width = "w-140" }) {
  return (
    <figure className="mt-4">
      <img src={src} alt={alt} className={`${width} h-auto mx-auto`} />
      <figcaption className="mt-2 text-white text-lg text-center italic">
        {caption}
      </figcaption>
    </figure>
  );
}
