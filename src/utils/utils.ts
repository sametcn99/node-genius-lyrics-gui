import { parseFile } from "music-metadata";
import ffmetadata from "ffmetadata";
import { getLyrics } from "genius-lyrics-api";
import fs from "fs";
import { dialog } from "electron";

/**
 * Retrieves an array of FLAC files from the specified directory.
 *
 * @param directory - The directory path to search for FLAC files.
 * @returns An array of strings representing the file names of the FLAC files found in the directory.
 */
function getFlacFiles(directory: string): string[] {
  try {
    const files = Array.from(fs.readdirSync(directory)).filter(
      (file) => file && file.endsWith(".flac" || ".mp3")
    );
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

/**
 * Main function that processes FLAC files, retrieves lyrics, and writes them to the audio metadata.
 * @returns {Promise<void>} A promise that resolves when all the processing is complete.
 */
export async function WriteLyrics(apiKey: string, folderPath: string) {
  const files = getFlacFiles(folderPath);
  if (!apiKey) {
    dialog.showErrorBox(
      "Error",
      "GENIUS_API_KEY environment variable is not set."
    );
    return;
  }
  const promises = files.map(async (file) => {
    const filePath = `${folderPath}\\${file}`;
    const metadata = await parseFile(`${filePath}`);

    const options = {
      apiKey: apiKey || "",
      title: metadata.common.title || "", // Add a conditional check to ensure title is not undefined
      artist: metadata.common.artist || "", // Add a conditional check to ensure artist is not undefined
      optimizeQuery: true,
    };
    const lyrics = await getLyrics(options);
    metadata.common.lyrics = [];
    if (lyrics) metadata.common.lyrics.push(lyrics);
    ffmetadata.write(
      filePath,
      metadata.common,
      function (err: Error | null) {
        if (err) dialog.showErrorBox("Error", "Error writing metadata");
        else console.log("Data written");
      },
      (err: Error) => {
        if (err) console.error("Error writing metadata:", err);
      }
    );
  });
  await Promise.all(promises);
}
