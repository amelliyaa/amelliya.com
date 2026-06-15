import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { execSync } from "child_process";
import { statSync } from "node:fs";
import path from "node:path";
import rehypeAutolinkHeadingsPlugin from "rehype-autolink-headings";

export const remarkReadingTime = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro.frontmatter.readingTime = readingTime.text;
  };
};

export const remarkModifiedTime = () => {
  return function (_tree, file) {
    const filePath = file.history[0];
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    let lastModified;

    try {
      const result = execSync(`git log -1 --pretty="format:%cI" "${fileName}"`, {
        cwd: fileDir,
      });
      lastModified = result.toString().trim();

      if (!lastModified) {
        throw new Error("No commit history found");
      }
    } catch (error) {
      try {
        const stats = statSync(filePath);
        lastModified = stats.mtime.toISOString();
      } catch (fsError) {
        console.warn(`[remarkModifiedTime] Could not find ${filePath}. Using current time.`);
        lastModified = new Date().toISOString();
      }
    }

    file.data.astro.frontmatter.lastModified = lastModified;
  };
};

export const rehypeAutolinkHeadings = [
  rehypeAutolinkHeadingsPlugin,
  {
    behavior: "wrap",
    properties: {
      className: ["mdx-header"],
    },
    test: ["h2", "h3", "h4", "h5", "h6"],
  },
];
