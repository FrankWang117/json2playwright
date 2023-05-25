const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();

console.log(figlet.textSync("PinCe"));

program
  // 版本信息
  .version("0.0.1", "-v, --version")
  .description("An ambitious test package for UI test.")
  .requiredOption("-c, --config <source>", "config file path")
  .parse(process.argv);

const options = program.opts();

// function resolve(program) {
//   // 没有匹配任何选项的参数会被放到数组 args 中
//   const { copy, hashtag, slash, args } = program;
//   if (!args.length) {
//     console.log("Please input filename.");
//     return;
//   }
//   if (copy === true) {
//     console.log("You should copy at least one file.");
//     return;
//   }
//   let type = "star";
//   if (slash) type = "slash";
//   if (hashtag) type = "hashtag";
//   for (let i = 0; i < args.length; i++) {
//     gen(args[i], copy, type);
//   }
// }

// resolve(program);
