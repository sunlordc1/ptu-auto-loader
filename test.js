// const W3GReplay = require("w3gjs").default;
// const ReplayParser = require("w3gjs/dist/lib/parsers/ReplayParser").default;

// (async () => {
//     const buffer = fs.readFileSync("C:/Users/phiva/Documents/Warcraft III Public Test/Replay/LastReplay.w3g");
//     const parser = new ReplayParser();
//     // parser.on("basic_replay_information", (info) => {
//     //     fs.appendFile('./extract.txt', "\n" + JSON.stringify(info), function (err) {
//     //         if (err) {
//     //             // append failed
//     //         } else {
//     //             // done
//     //         }
//     //     })
//     // });

//     // parser.on("gamedatablock", (block) => {
//     //     if (block.commandBlocks.length != 0){
//     //         fs.appendFile('./extract.txt', "\n" + JSON.stringify(block), function (err) {
//     //             if (err) {
//     //                 // append failed
//     //             } else {
//     //                 // done
//     //             }
//     //         })
//     //     }
          
//     // });



//     const result = await parser.parse(buffer);
    // fs.appendFile('./extract.txt', "\n" + JSON.stringify(result), function (err) {
    //     if (err) {
    //         // append failed
    //     } else {
    //         // done
    //     }
    // })
//     // console.log("[MAP]"+result.metadata.mapName);
//     // console.log("[mapChecksum]"+result.metadata.mapChecksum);
//     // console.log("[mapChecksumSha1]"+result.metadata.mapChecksumSha1);
//     console.log(result.metadata.gameData);
// })().catch(console.error);
const W3GReplay = require("w3gjs").default;
const parser = new W3GReplay();
const fs = require("fs");
(async () => {
  const result = await parser.parse("C:/Users/phiva/Documents/Warcraft III Public Test/Replay/LastReplay.w3g");
  fs.appendFile('./extract.json', "\n" + JSON.stringify(result), function (err) {
    if (err) {
        // append failed
    } else {
        // done
    }
})
  console.log(result);
})().catch(console.error);