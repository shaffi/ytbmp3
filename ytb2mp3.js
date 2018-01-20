const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const fs = require('fs');
const util = require('util');

const ytb2mp3 = (inputVideo, outputFile) => {
  return new Promise((resolve, reject) => {
    ffmpeg(
      ytdl(inputVideo, { filter: 'audioonly' })
        .on('error', error => reject(error))
        .on('progress', (...progress) => {
          var prog = `Downloading.....${progress[1]} of ${progress[2]}`;
          process.stdout.cursorTo(0);
          process.stdout.clearLine(1);
          process.stdout.write(prog);
        })
        .on('end', () => console.log('\n Media Download! \n Converting to MP3'))
    )
      .format('mp3')
      .audioBitrate(320)
      .pipe(
        fs.createWriteStream(`./output/${outputFile}.mp3`).on('finish', eve => {
          resolve(true);
        })
      );
  });
};
const convert = async videos => {
  for (let videoURL of videos) {
    try {
      const videoInfo = await ytdl.getInfo(videoURL);
      console.log(` Starting to download ${videoInfo.title} ..\n`);
      await ytb2mp3(videoURL, videoInfo.title);
      console.log(`- ${videoInfo.title} Done!`);
    } catch (error) {
      console.log(error);
    }
  }
};
const videos = [
  '7M-jsjLB20Y',
  '3XmrZaVVUpc',
  'ZHpyi6oDmZM',
  '6u32X7r4WkE',
  'GU1hmTA71Zg',
  'J2GXBLVZk60',
  'o7vLjAVcddg'
  
];
convert(videos);
