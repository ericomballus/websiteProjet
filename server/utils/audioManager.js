const { stat, createReadStream } = require("fs");
const { promisify } = require("util");
const fileInfo = promisify(stat);
module.exports = async (audioPath, res, req) => {
  const { size } = await fileInfo(audioPath);

  const range = req.headers.range;
  if (range) {
    // let [start, end] = range.replace(/bytes=/, "").split("-");
    //  start = parseInt(start, 10);
    //  end = end ? parseInt(end, 10) : size - 1;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, size - 1);
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": `bytes`,
      "Content-Length": end - start + 1,
      "Content-Type": "audion/mp3",
    });
    createReadStream(audioPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "audio/mp3",
    });
    createReadStream(audioPath).pipe(res);
  }
};
