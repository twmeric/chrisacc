"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ChevronUp, ChevronDown } from "lucide-react";

interface Match {
  element: HTMLElement;
  originalHtml: string;
}

export default function SearchOverlay({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightIdRef = useRef(0);

  const placeholder = lang === "en" ? "Search this page..." : lang === "zh-hans" ? "搜索本页内容..." : "搜尋本頁內容...";
  const noResults = lang === "en" ? "No results" : lang === "zh-hans" ? "无结果" : "無結果";
  const resultText = lang === "en" ? "results" : lang === "zh-hans" ? "个结果" : "個結果";

  // Restore original HTML for all highlighted elements
  const clearHighlights = useCallback(() => {
    matches.forEach((m) => {
      if (m.element.parentNode) {
        m.element.outerHTML = m.originalHtml;
      }
    });
    setMatches([]);
    setCurrentIndex(-1);
  }, [matches]);

  // Open search
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Close search and clear highlights
  const handleClose = useCallback(() => {
    clearHighlights();
    setOpen(false);
    setQuery("");
  }, [clearHighlights]);

  // Perform search
  const performSearch = useCallback(
    (q: string) => {
      clearHighlights();
      if (!q.trim()) return;

      const id = `search-highlight-${++highlightIdRef.current}`;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          // Skip script, style, nav, header, footer, input, textarea, and already highlighted
          const tag = parent.tagName.toLowerCase();
          if (["script", "style", "noscript", "input", "textarea"].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("header") || parent.closest("nav") || parent.closest("footer") || parent.closest(".search-overlay")) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.textContent?.toLowerCase().includes(q.toLowerCase())) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        },
      });

      const newMatches: Match[] = [];
      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.textContent || "";
        const lowerQ = q.toLowerCase();
        const indices: number[] = [];
        let pos = 0;
        while ((pos = text.toLowerCase().indexOf(lowerQ, pos)) !== -1) {
          indices.push(pos);
          pos += lowerQ.length;
        }

        if (indices.length === 0) return;

        const parent = textNode.parentNode;
        if (!parent) return;

        // Replace text node with a span wrapper so we can track it
        const wrapper = document.createElement("span");
        wrapper.dataset.searchWrapper = id;

        let lastIndex = 0;
        indices.forEach((idx) => {
          // Text before match
          if (idx > lastIndex) {
            wrapper.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
          }
          // Highlighted match
          const mark = document.createElement("mark");
          mark.className = "search-highlight bg-brand-gold/40 text-brand-navy font-semibold rounded px-0.5";
          mark.textContent = text.slice(idx, idx + q.length);
          wrapper.appendChild(mark);
          lastIndex = idx + q.length;
        });
        // Remaining text
        if (lastIndex < text.length) {
          wrapper.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        const originalHtml = (textNode as any).outerHTML || textNode.textContent || "";
        parent.replaceChild(wrapper, textNode);
        newMatches.push({ element: wrapper, originalHtml });
      });

      setMatches(newMatches);
      if (newMatches.length > 0) {
        setCurrentIndex(0);
        newMatches[0].element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [clearHighlights]
  );

  // Navigate to a match
  const goToMatch = (idx: number) => {
    if (idx < 0 || idx >= matches.length) return;
    setCurrentIndex(idx);
    matches[idx].element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Update search when query changes
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => performSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, open, performSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={handleOpen}
        className="hidden items-center gap-1.5 text-sm font-medium text-text-dark transition hover:text-brand-navy md:flex"
        aria-label={placeholder}
      >
        <Search className="h-4 w-4 text-brand-navy" />
        <span className="hidden lg:inline">{lang === "en" ? "Search" : lang === "zh-hans" ? "搜索" : "搜尋"}</span>
      </button>

      {/* Search overlay */}
      {open && (
        <div className="search-overlay fixed inset-0 z-[60] flex items-start justify-center bg-black/40 pt-24 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-2xl rounded-xl bg-white shadow-2xl">
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <Search className="h-5 w-5 text-text-light" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-lg text-text-dark outline-none placeholder:text-text-light"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-text-light hover:text-brand-navy">
                  <X className="h-5 w-5" />
                </button>
              )}
              <button onClick={handleClose} className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-text-light hover:bg-gray-200">
                ESC
              </button>
            </div>

            {/* Results info */}
            <div className="flex items-center justify-between border-b border-gray-50 px-4 py-2">
              <span className="text-sm text-text-light">
                {query.trim() ? (
                  matches.length > 0 ? (
                    <>
                      {currentIndex + 1} / {matches.length} {resultText}
                    </>
                  ) : (
                    noResults
                  )
                ) : (
                  <span className="text-xs">{lang === "en" ? "Type to search this page" : lang === "zh-hans" ? "输入关键词搜索本页" : "輸入關鍵詞搜尋本頁"}</span>
                )}
              </span>
              {matches.length > 0 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => goToMatch(currentIndex - 1)}
                    disabled={currentIndex <= 0}
                    className="rounded p-1 text-text-light hover:bg-gray-100 hover:text-brand-navy disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => goToMatch(currentIndex + 1)}
                    disabled={currentIndex >= matches.length - 1}
                    className="rounded p-1 text-text-light hover:bg-gray-100 hover:text-brand-navy disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="px-4 py-2 text-xs text-text-light">
              {lang === "en" ? "Tip: Press Ctrl+K to open search anytime" : lang === "zh-hans" ? "提示：按 Ctrl+K 随时打开搜索" : "提示：按 Ctrl+K 隨時打開搜尋"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
