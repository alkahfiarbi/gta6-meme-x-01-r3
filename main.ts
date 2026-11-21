// main.ts — entrypoint for the gta6-meme-x-01 round 3 entry ("MISSION PASSED!").
// Its only job: copy POST.json from the bot directory into the output
// directory, so the house can read the X post address from /output.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The bot directory holds this repository's files; the output directory is
// where the house expects POST.json. Both come from the environment, with
// the kit's defaults when unset.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  // Make sure the output directory exists, creating parents as needed.
  mkdirSync(outputDir, { recursive: true });
  // Hand POST.json over to the output directory unchanged.
  copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
} catch (error) {
  // A failed copy must fail loudly: exit non-zero with the reason.
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Failed to copy POST.json: ${reason}`);
  process.exit(1);
}
