import { defineEcConfig } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  themes: ["dracula"],
  styleOverrides: {
    borderRadius: "var(--border-radius-md)",
    uiFontFamily: "var(--typeface-workhorse)",
    uiFontSize: "var(--font-size-sm)",
    codeFontFamily:
      'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    codeFontSize: "var(--font-size-sm)",
    codeLineHeight: "1.5",
    frames: { shadowColor: "var(--box-shadow-md)" },
  },
});
