"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

function EditorialPlaceholder({ label = "Image Coming Soon" }) {
  return (
    <div className="editorial-placeholder">
      <span className="editorial-placeholder-label">{label}</span>
    </div>
  );
}

export { EditorialPlaceholder };

export default function ProjectImage({
  src,
  alt,
  fill,
  sizes,
  style,
  priority,
  className = "",
}) {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);

  if (!src) return <EditorialPlaceholder />;

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`image-reveal ${loaded ? "loaded" : ""} ${className}`}
      style={style}
      onLoad={onLoad}
    />
  );
}
