// const minimist = require('minimist')
const ffmpeg = require('fluent-ffmpeg')
const ytdl = require('ytdl-core')
// const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

// console.dir(argv);
const inputVideo = 'https://www.youtube.com/watch?v=3XmrZaVVUpc'
const outputFile = 'alaporaan.mp3';

const reader = ytdl(inputVideo, {filter: 'audioonly'})
.on('error', console.error)
.on('progress', (...progress) => {
  var prog = `Downloading.....${progress[1]} of ${progress[2]}`
  process.stdout.cursorTo(0);
  process.stdout.clearLine(1);  
  process.stdout.write(prog); 
});
const writer = ffmpeg(reader)
  .format('mp3')
  .audioBitrate(320)
  .pipe(fs.createWriteStream(outputFile));
// var args = minimist(process.argv.slice(2), {
//   default: {
//     format: 'mp3',
//     bitrate: 320,
//     seek: 0,
//     duration: null
//   }
// })

// var videoId = 'https://www.youtube.com/watch?v=xsbLtHql4g8&index=9&list=PLvTLJAdAwUW1glJ-4mz5GbwkvDcmTxrp9'
// var reader = ytdl(videoId, {filter: 'audioonly'})
// var writer = ffmpeg(reader)
//   .format('mp3')
//   .audioBitrate(320)

// if (args.seek) writer.seekInput(formatTime(args.seek))
// if (args.duration) writer.duration(args.duration)

//writer.output(process.stdout).run()

// function formatUrl (id) {
//   return 'https://www.youtube.com/watch?v=' + id
// }

// function formatTime (time) {
//   var minutes = time.match(/(\d+)m/)
//   var seconds = time.match(/(\d+)s/)
//   return [
//     minutes.length && padLeft(minutes[1], 2),
//     seconds.length && padLeft(seconds[1], 2)
//   ].filter(Boolean).join(':')
// }

// function padLeft (str, length) {
//   while (str.length < length) str = '0' + str
//   return str
// }