"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="shrink-0" style={{ width: 54, height: 27 }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <label className="switch shrink-0">
      <input
        className="switch__input"
        type="checkbox"
        role="switch"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "التبديل للوضع الفاتح" : "التبديل للوضع الداكن"}
      />
      <span className="switch__icon">
        <span className="switch__icon-part switch__icon-part--1" />
        <span className="switch__icon-part switch__icon-part--2" />
        <span className="switch__icon-part switch__icon-part--3" />
        <span className="switch__icon-part switch__icon-part--4" />
        <span className="switch__icon-part switch__icon-part--5" />
        <span className="switch__icon-part switch__icon-part--6" />
        <span className="switch__icon-part switch__icon-part--7" />
        <span className="switch__icon-part switch__icon-part--8" />
        <span className="switch__icon-part switch__icon-part--9" />
        <span className="switch__icon-part switch__icon-part--10" />
        <span className="switch__icon-part switch__icon-part--11" />
      </span>
      <span className="switch__sr">
        {isDark ? "الوضع الداكن" : "الوضع الفاتح"}
      </span>
    </label>
  );
}
