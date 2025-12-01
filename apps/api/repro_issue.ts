import * as csv from "csv-parser";
import { Readable } from "stream";

const csvContent = `login,name,targetAudience
user1,User One,Audience A

`;

interface CsvUser {
  login: string;
  name: string;
  targetAudience: string;
}

async function parseCsv(buffer: Buffer): Promise<CsvUser[]> {
  return new Promise((resolve, reject) => {
    const results: CsvUser[] = [];
    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

async function run() {
  console.log("--- Parsing CSV with trailing newline ---");
  const buffer = Buffer.from(csvContent);
  const users = await parseCsv(buffer);
  console.log("Raw users:", users);

  const filteredUsers = users.filter((u) => u.login);
  console.log("Filtered users:", filteredUsers);

  if (users.length > 1 && !users[users.length - 1].login) {
    console.log("CONFIRMED: Trailing newline creates an empty object.");
  }

  if (filteredUsers.length === 1 && filteredUsers[0].login === "user1") {
    console.log("SUCCESS: Filter removed the empty object.");
  } else {
    console.error("FAILURE: Filter did not work as expected.");
  }
}

run();
