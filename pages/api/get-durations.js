const ytdl = require("ytdl-core");

async function handler(req, res) {
  try {    
    const videoId = req.query.id;

    const info = await ytdl.getInfo(videoId);
    let audioFormat = ytdl.chooseFormat(info.formats, {
        filter: "audioonly",
    });

    let milliseconds = audioFormat.approxDurationMs;
    let hours = Math.floor(milliseconds / (3600 * 1000));
    let minutes = Math.floor((milliseconds / (60 * 1000)) % 60);
    let seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

    if(minutes < 10 && hours > 0) {
        minutes = '0'+minutes;
    }

    if(seconds < 10) {
        seconds = '0'+seconds;
    }

    let durations = minutes+'.'+seconds;
    if(hours > 0) {
        durations = hours+'.'+minutes+'.'+seconds;
    }

    res.status(200).json({
      'durations': durations
    });

  } catch(error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default handler;
