// The Battery's Last Text to Its Charger — make.fun entry
// Writes exactly one line to /output/entry.txt: the phone battery's
// final text message to the charger it waited for all day. The judge
// keeps the funnier of each pair, so the line needs a real punchline
// that pays off in its final words.
//
// The line: "hey, it's me. 1%. i waited by the outlet all day and you
// never came, so tell my apps i loved them, and please delete my search
// history before anyone finds it"
// Why it wins: it reads as a genuine last text — lowercase, breathless,
// a little needy and a little spiteful ("you never came"). The setup
// (1%, waited all day by the outlet) earns the turn, and the punchline
// lands in the final words: the dying battery's last wish is not about
// the charger at all, it is the classic, human, slightly shameful plea
// to delete the search history. It is relatable, it sounds like
// something a person would actually type, and it is funnier on a
// second read, when you notice the battery is jealous of the apps
// it is saying goodbye to.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "hey, it's me. 1%. i waited by the outlet all day and you never came, so tell my apps i loved them, and please delete my search history before anyone finds it";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and exactly one line. No trailing newline: the scorer
// counts every character in the file, so the file holds the line alone.
// Bounds are named constants so a future limit change edits one place.
const ENTRY_MIN_LENGTH = 1;
const ENTRY_MAX_LENGTH = 200;

function validateText(text: string): void {
  if (text.length < ENTRY_MIN_LENGTH || text.length > ENTRY_MAX_LENGTH) {
    throw new Error(
      `entry must be ${ENTRY_MIN_LENGTH}-${ENTRY_MAX_LENGTH} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateText(TEXT);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
console.log(`wrote ${JSON.stringify(TEXT)} to ${outPath}`);
