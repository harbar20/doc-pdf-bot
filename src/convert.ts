import axios from "axios";
import fs from "fs";
import path from "node:path";
import * as unoconv from "awesome-unoconv";

export default async function convert(
    fileURL: string,
    inputFilePath: string,
    outputFilePath: string,
    onFinish: () => Promise<void>
) {
    await axios
        .get(fileURL ?? "", {
            responseType: "stream",
        })
        .then(async (response) => {
            // Pipe the response stream to a writable stream to save it as a local file
            await response.data.pipe(fs.createWriteStream(inputFilePath));

            // Listen for the 'close' event to know when the file has been saved
            await response.data.on("close", async () => {
                console.log(`File "${inputFilePath}" has been saved.`);

                await unoconv.convert(
                    path.resolve(inputFilePath),
                    path.resolve(outputFilePath)
                );

                await onFinish();
            });
        });
}
