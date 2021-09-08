const ytdl = require("ytdl-core");

async function handler(req, res) {
  try {
    const videoId = req.query.id;

    const isValid = ytdl.validateID(videoId);

    if (!isValid) {
        throw new Error();
    }

    const videoInfo = await ytdl.getInfo(videoId);
    let audioFormat = ytdl.chooseFormat(videoInfo.formats, {
        filter: "audioonly",
        quality: "highestaudio"
    });

    const { itag, container, contentLength } = audioFormat;

    // define headers
    const rangeHeader = req.headers.range || null;
    const rangePosition = (rangeHeader) ? rangeHeader.replace(/bytes=/, "").split("-") : null;
    console.log(`rangePosition`, rangePosition);
    const startRange = rangePosition ? parseInt(rangePosition[0], 10) : 0;
    const endRange = rangePosition && rangePosition[1].length > 0 ? parseInt(rangePosition[1], 10) : contentLength - 1;
    const chunksize = (endRange - startRange) + 1;
    
    // Send partial response
    res.writeHead(206, {
        'Content-Type': `audio/${container}`,
        'Content-Length': chunksize,
        "Content-Range": "bytes " + startRange + "-" + endRange + "/" + contentLength,
        "Accept-Ranges": "bytes",
    });

    const range = { start: startRange, end: endRange }
    console.log(range);
    const audioStream = ytdl(videoId, { filter: format => format.itag === itag, range });
    audioStream.pipe(res);

  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default handler;
