const logger = require('electron-log');
const { upload } = require('./util');
const ReplayParser = require("w3gjs/dist/lib/parsers/ReplayParser").default;
const fs = require("fs");

class Queue {
  constructor() {
    this.paths = [];
    this.uploading = false;
  }

  add(path) {
    logger.info(`[Watcher-Add] Pushing [${path}] onto upload queue.`);
  
    this.paths.push(path);
    if (!this.uploading) {
      this.upload();
    }
  }
  change(path) {
    logger.info(`[Watcher-Change] Pushing [${path}] onto upload queue.`);
    this.paths.push(path);
    this.metadata(path)
    if (!this.uploading) {
      this.upload();
    }
  }
  async metadata(path) {
    const buffer = fs.readFileSync(path);
    const parser = new ReplayParser();
    // parser.on("basic_replay_information", (info) => console.log(info));
    // parser.on("gamedatablock", (block) => console.log(block));
    const result = await parser.parse(buffer);
    logger.info("[MAP]" + result.metadata.map.mapName);
    logger.info("[mapChecksum]" + result.metadata.map.mapChecksum);
    logger.info("[mapChecksumSha1]" + result.metadata.map.mapChecksumSha1);
  }
  async upload() {
    this.uploading = true;

    // while (this.paths.length) {
    //   // await upload(this.paths.shift());
    // }

    this.uploading = false;
    logger.info(`[Watcher] Upload queue empty, waiting...`);
  }
}

module.exports = Queue;