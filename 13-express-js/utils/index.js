import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

export const __filename = fileURLToPath(import.meta.url);

const d = dirname(__filename);
// got upwards from utils folder to get the root directory of the project
export const __dirname = path.join(d, "..");
