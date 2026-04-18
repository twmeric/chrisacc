"use client";

import { useEffect } from "react";

export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    if (document.documentElement) {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}
