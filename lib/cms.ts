import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Locale } from "./i18n-config";

const contentDirectory = path.join(process.cwd(), "content");

export async function getMarkdownContent(folder: string, filename: string, locale: Locale) {
  const localizedFile = path.join(contentDirectory, folder, `${filename}.${locale}.md`);
  const defaultFile = path.join(contentDirectory, folder, `${filename}.md`);
  const filePath = fs.existsSync(localizedFile) ? localizedFile : defaultFile;

  if (!fs.existsSync(filePath)) {
    return { contentHtml: "", data: {} };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const parsed = matter(fileContents);
  const processed = await remark().use(html).process(parsed.content);

  return {
    contentHtml: processed.toString(),
    data: parsed.data as Record<string, any>,
  };
}

export function getJsonContent<T = any>(filename: string, locale: Locale): T | null {
  const localizedFile = path.join(contentDirectory, `${filename}.${locale}.json`);
  const defaultFile = path.join(contentDirectory, `${filename}.json`);
  const filePath = fs.existsSync(localizedFile) ? localizedFile : defaultFile;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as T;
}

export function getAllMarkdownFiles(folder: string, locale: Locale) {
  const dir = path.join(contentDirectory, folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const items: { slug: string; data: Record<string, any>; contentHtml: string }[] = [];

  for (const file of files) {
    if (!file.endsWith(`.${locale}.md`) && !file.endsWith(".md")) continue;
    // Prefer localized version if it exists
    const base = file.replace(/\.md$/, "").replace(/\.(zh-hant|zh-hans|en)$/, "");
    const localizedPath = path.join(dir, `${base}.${locale}.md`);
    const filePath = fs.existsSync(localizedPath) ? localizedPath : path.join(dir, file);

    const contents = fs.readFileSync(filePath, "utf8");
    const parsed = matter(contents);
    const processed = remark().use(html).processSync(parsed.content);

    items.push({
      slug: base,
      data: parsed.data,
      contentHtml: processed.toString(),
    });
  }

  // Deduplicate by slug, preferring localized versions
  const map = new Map<string, { slug: string; data: Record<string, any>; contentHtml: string }>();
  for (const item of items) {
    map.set(item.slug, item);
  }

  return Array.from(map.values()).sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}
