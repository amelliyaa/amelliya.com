import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { execSync } from "child_process";
import { statSync } from "node:fs";
import rehypeAutolinkHeadingsPlugin from "rehype-autolink-headings";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro.frontmatter.readingTime = readingTime.text;
  };
}

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    let lastModified;

    try {
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
      lastModified = result.toString().trim();

      if (!lastModified) {
        throw new Error("No commit history found");
      }
    } catch (error) {
      try {
        const stats = statSync(filepath);
        lastModified = stats.mtime.toISOString();
      } catch (fsError) {
        console.warn(`[remarkModifiedTime] Could not find ${filepath}. Using current time.`);
        lastModified = new Date().toISOString();
      }
    }

    file.data.astro.frontmatter.lastModified = lastModified;
  };
}

export const rehypeAutolinkHeadings = [
  rehypeAutolinkHeadingsPlugin,
  {
    behavior: "wrap",
    properties: {
      className: ["mdx-header"],
    },
  },
];
