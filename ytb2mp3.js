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
        fs.createWriteStream(`./output/${outputFile}`).on('finish', eve => {
          resolve(true);
        })
      );
  });
};
const convert = async videos => {
  for (let video of videos) {
    try {
      await ytb2mp3(video.inputVideo, video.outputFile);
      console.log(`- ${video.outputFile} Done!`);
    } catch (error) {
      console.log(error);
    }
  }
};
const videos = [
  {
    inputVideo: 'https://www.youtube.com/watch?v=7M-jsjLB20Y',
    outputFile: 'vid12.mp3'
  },
  {
    inputVideo: 'https://www.youtube.com/watch?v=7M-jsjLB20Y',
    outputFile: 'vid23.mp3'
  }
];
convert(videos);
