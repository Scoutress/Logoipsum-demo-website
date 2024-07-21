import axios from "axios";
import fs from "fs";
import path from "path";

const ensureDirectoryExistence = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const downloadImage = async (
  url: string,
  destFolder: string
): Promise<string> => {
  try {
    ensureDirectoryExistence(destFolder);

    const response = await axios({
      url,
      responseType: "stream",
    });

    const fileName = `${Date.now()}-${path.basename(url)}`;
    const filePath = path.join(destFolder, fileName);

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(fileName));
      writer.on("error", reject);
    });
  } catch (error) {
    throw new Error("Error downloading the image");
  }
};

export default downloadImage;
