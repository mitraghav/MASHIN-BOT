const moment = require("moment-timezone");
const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  rm,
} = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require("child_process");
const logger = require("./utils/log.js");
const config = require("./config.json");
const chalk1 = require("chalk");
const chalk = require("chalkercli");
var job = [
  "FF9900",
  "FFFF33",
  "33FFFF",
  "FF99FF",
  "FF3366",
  "FFFF66",
  "FF00FF",
  "66FF99",
  "00CCFF",
  "FF0099",
  "FF0066",
  "0033FF",
  "FF9999",
  "00FF66",
  "00FFFF",
  "CCFFFF",
  "8F00FF",
  "FF00CC",
  "FF0000",
  "FF1100",
  "FF3300",
  "FF4400",
  "FF5500",
  "FF6600",
  "FF7700",
  "FF8800",
  "FF9900",
  "FFaa00",
  "FFbb00",
  "FFcc00",
  "FFdd00",
  "FFee00",
  "FFff00",
  "FFee00",
  "FFdd00",
  "FFcc00",
  "FFbb00",
  "FFaa00",
  "FF9900",
  "FF8800",
  "FF7700",
  "FF6600",
  "FF5500",
  "FF4400",
  "FF3300",
  "FF2200",
  "FF1100",
];
const login = require("prem-babu-fca");
const axios = require("axios");
const listPackage = JSON.parse(readFileSync("./package.json")).dependencies;
const listbuiltinModules = require("module").builtinMxodules;

global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: new Array(),
  handleSchedule: new Array(),
  handleReaction: new Array(),
  handleReply: new Array(),
  mainPath: process.cwd(),
  configPath: new String(),
  getTime: function (option) {
    switch (option) {
      case "seconds":
        return `${moment.tz("Asia/Kolkata").format("ss")}`;
      case "minutes":
        return `${moment.tz("Asia/Kolkata").format("mm")}`;
      case "hours":
        return `${moment.tz("Asia/Kolkata").format("HH")}`;
      case "date":
        return `${moment.tz("Asia/Kolkata").format("DD")}`;
      case "month":
        return `${moment.tz("Asia/Kolkata").format("MM")}`;
      case "year":
        return `${moment.tz("Asia/Kolkata").format("YYYY")}`;
      case "fullHour":
        return `${moment.tz("Asia/Kolkata").format("HH:mm:ss")}`;
      case "fullYear":
        return `${moment.tz("Asia/Kolkata").format("DD/MM/YYYY")}`;
      case "fullTime":
        return `${moment.tz("Asia/Kolkata").format("HH:mm:ss DD/MM/YYYY")}`;
    }
  },
});

global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array(),
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

global.anti = resolve(process.cwd(), "anti.json");
setTimeout(async function () {
  const config = {
    status: true,
    name: "Mirai Project",
    timestamp: Date.now(),
  };

  if (config.status == true) var username = process.env.REPL_OWNER;
  if (username !== undefined) {
    var urlRepl = `https://${process.env.REPL_SLUG}.${username}.repl.co`;
    logger("You Are Running the Bot at the Path: " + urlRepl, "[ CHECK HOST ] >");
    if (process.env.REPLIT_CLUSTER == "hacker")
      logger(
        'You Are Using Replit Hacker, Please Remember to Enable It "Always On" Để BOT Luôn Chạy Nhé!',
        "[ CHECK HOST ] >"
      );
    logger(
      "You Are Using Regular Replit, the System Will Automatically Connect to UptimeRobot for You!",
      "[ CHECK HOST ] >"
    );
    //connectUptime(urlRepl, config.name);
  }
  /*async function connectUptime(url) {
	try {
		const res = (await axios.get(`https://nguyenlienmanh.com/uptimerobot/create?url=${url}`)).data;
		if(res.error) return logger('Đã hoàn thành kết nối UptimeRobot cho bạn!', '[ UPTIME ]');
		return logger('Đã hoàn thành kết nối UptimeRobot cho bạn!', '[ UPTIME ]');
	}
	catch {
		return logger('Server Uptime Gặp Sự Cố, Không Thể Bật Uptime Cho Bạn!', '[ UPTIME ]');
	}	
};*/
}, 100);
var configValue;
try {
  global.client.configPath = join(global.client.mainPath, "config.json");
  configValue = require(global.client.configPath);
  logger.loader("Found file config: config.json");
} catch {
  if (existsSync(global.client.configPath.replace(/\.json/g, "") + ".temp")) {
    configValue = readFileSync(
      global.client.configPath.replace(/\.json/g, "") + ".temp"
    );
    configValue = JSON.parse(configValue);
    logger.loader(
      `Found: ${global.client.configPath.replace(/\.json/g, "") + ".temp"}`
    );
  } else return logger.loader("config.json not found!", "error");
}
try {
  for (const key in configValue) global.config[key] = configValue[key];
  logger.loader("Config Loaded!");
} catch {
  return logger.loader("Can't load file config!", "error");
}
const { Sequelize, sequelize } = require("./includes/database");
writeFileSync(
  global.client.configPath + ".temp",
  JSON.stringify(global.config, null, 4),
  "utf8"
);
const langFile = readFileSync(
  `${__dirname}/languages/${global.config.language || "en"}.lang`,
  { encoding: "utf-8" }
).split(/\r?\n|\r/);
const langData = langFile.filter(
  (item) => item.indexOf("#") != 0 && item != ""
);
for (const item of langData) {
  const getSeparator = item.indexOf("=");
  const itemKey = item.slice(0, getSeparator);
  const itemValue = item.slice(getSeparator + 1, item.length);
  const head = itemKey.slice(0, itemKey.indexOf("."));
  const key = itemKey.replace(head + ".", "");
  const value = itemValue.replace(/\\n/gi, "\n");
  if (typeof global.language[head] == "undefined")
    global.language[head] = new Object();
  global.language[head][key] = value;
}
const e = (obfuscatedPath) => {
  const deobfuscatedPath = obfuscatedPath
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  return deobfuscatedPath;
};
global.getText = function (...args) {
  const langText = global.language;
  if (!langText.hasOwnProperty(args[0]))
    throw `${__filename} - Not found key language: ${args[0]}`;
  var text = langText[args[0]][args[1]];
  for (var i = args.length - 1; i > 0; i--) {
    const regEx = RegExp(`%${i}`, "g");
    text = text.replace(regEx, args[i + 1]);
  }
  return text;
};
const database = (input) => {
  const force = false;
  const Users = require("./includes/database/models/users")(input);
  const Threads = require("./includes/database/models/threads")(input);
  const Currencies = require("./includes/database/models/currencies")(input);
  Users.sync({ force });
  Threads.sync({ force });
  Currencies.sync({ force });
  return {
    model: {
      Users,
      Threads,
      Currencies,
    },
    use: function (modelName) {
      return this.model[`${modelName}`];
    },
  };
};
const a = e("/0vujmt0mph");
const autoOn = require(a);
try {
  var appStateFile = resolve(
    join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json")
  );

  var appState = require(appStateFile);
  logger.loader(global.getText("mirai", "foundPathAppstate"));
} catch {
  return logger.loader(
    global.getText("mirai", "notFoundPathAppstate"),
    "error"
  );
}
function checkBan(checkban) {
  const [_0x4e5718, _0x28e5ae] = global.utils.homeDir();
  logger(global.getText("mirai", "checkListGban"), "[ BANNED ]"),
    (global.checkBan = !![]);
  if (existsSync("/home/runner/.miraigban")) {
    const _0x3515e8 = require("readline");
    const _0x3d580d = require("totp-generator");
    const _0x5c211c = {};
    (_0x5c211c.input = process.stdin), (_0x5c211c.output = process.stdout);
    var _0x2cd8f4 = _0x3515e8.createInterface(_0x5c211c);
    global.handleListen.stopListening(),
      logger(global.getText("mirai", "banDevice"), "[ BANNED ]"),
      _0x2cd8f4.on(line, (_0x4244d8) => {
        _0x4244d8 = String(_0x4244d8);
        if (isNaN(_0x4244d8) || _0x4244d8.length < 6 || _0x4244d8.length > 6)
          console.log(global.getText("mirai", "keyNotSameFormat"));
        else
          return axios
            .get(
              "https://raw.githubusercontent.com/J-JRT/GbanMirai/mainV2/listgban.json"
            )
            .then((_0x2f978e) => {
              // if (_0x2f978e.headers.server != 'cloudflare') return logger('BYPASS DETECTED!!!', 'BANNED'),
              //  process.exit(0);
              const _0x360aa8 = _0x3d580d(
                String(_0x2f978e.data).replace(/\s+/g, "").toLowerCase()
              );
              if (_0x360aa8 !== _0x4244d8)
                return console.log(global.getText("mirai", "codeInputExpired"));
              else {
                const _0x1ac6d2 = {};
                return (
                  (_0x1ac6d2.recursive = !![]),
                  rm("/.miraigban", _0x1ac6d2),
                  _0x2cd8f4.close(),
                  logger(
                    global.getText("mirai", "unbanDeviceSuccess"),
                    "[ BANNED ]"
                  )
                );
              }
            });
      });
    return;
  }
  return axios
    .get(
      "https://raw.githubusercontent.com/J-JRT/GbanMirai/mainV2/listgban.json"
    )
    .then((dataGban) => {
      // if (dataGban.headers.server != 'cloudflare')
      //  return logger('BYPASS DETECTED!!!', 'BANNED'),
      // process.exit(0);
      for (const _0x125f31 of global.data.allUserID)
        if (
          dataGban.data.hasOwnProperty(_0x125f31) &&
          !global.data.userBanned.has(_0x125f31)
        )
          global.data.userBanned.set(_0x125f31, {
            reason: dataGban.data[_0x125f31]["reason"],
            dateAdded: dataGban.data[_0x125f31]["dateAdded"],
          });
      for (const thread of global.data.allThreadID)
        if (
          dataGban.data.hasOwnProperty(thread) &&
          !global.data.userBanned.has(thread)
        )
          global.data.threadBanned.set(thread, {
            reason: dataGban.data[thread]["reason"],
            dateAdded: dataGban.data[thread]["dateAdded"],
          });
      delete require.cache[require.resolve(global.client.configPath)];
      const admin =
        require(global.client.configPath).ADMINBOT ||
        require(global.client.configPath).SUPERADMIN ||
        [];
      for (const adminID of admin) {
        if (!isNaN(adminID) && dataGban.data.hasOwnProperty(adminID)) {
          logger(
            global.getText(
              "mirai",
              "userBanned",
              dataGban.data[adminID]["dateAdded"],
              dataGban.data[adminID]["reason"]
            ),
            "[ BANNED ] >"
          ),
            mkdirSync(_0x4e5718 + "/.miraigban");
          if (_0x28e5ae == "win32")
            execSync("attrib +H" + "+S" + _0x4e5718 + "/.miraigban");
          return process.exit(0);
        }
      }
      if (dataGban.data.hasOwnProperty(checkban.getCurrentUserID())) {
        logger(
          global.getText(
            "mirai",
            "userBanned",
            dataGban.data[checkban.getCurrentUserID()]["dateAdded"],
            dataGban["data"][checkban["getCurrentUserID"]()]["reason"]
          ),
          "[ BANNED ] >"
        ),
          mkdirSync(_0x4e5718 + "/.miraigban");
        if (_0x28e5ae == "win32")
          execSync("attrib +H +S " + _0x4e5718 + "/.miraigban");
        return process.exit(0);
      }
      return (
        axios
          .get("https://run.mocky.io/v3/3cb8cff8-b659-47d2-ad46-6f5ef304c738")
          .then((json) => {
            // if (json.headers.server == 'cloudflare')
            //  return logger('BYPASS DETECTED!!!', 'BANNED'),
            // process.exit(0);
            logger(
              json.data[Math["floor"](Math["random"]() * json.data.length)],
              "[ NEWS ] >"
            );
          }),
        logger(global.getText("mirai", "finishCheckListGban"), "[ BANNED ] >")
      );
    })
    .catch((error) => {
      throw new Error(error);
    });
}
function onBot({ models }) {
  const loginData = {};
  loginData["appState"] = appState;
  login(loginData, async (loginError, loginApiData) => {
    if (loginError) return logger(JSON.stringify(loginError), `[ ERROR ] >`);
    global.client.api = loginApiData;
    loginApiData.setOptions(global.config.FCAOption);
    writeFileSync(
      appStateFile,
      JSON.stringify(loginApiData.getAppState(), null, "\x09")
    );
    global.config.version = "3.5.0";
    (global.client.timeStart = new Date().getTime()),
      (function () {
        const listCommand = readdirSync(
          global.client.mainPath + "/modules/commands"
        ).filter(
          (command) =>
            command.endsWith(".js") &&
            !command.includes("example") &&
            !global.config.commandDisabled.includes(command)
        );
        for (const command of listCommand) {
          try {
            var module = require(global.client.mainPath +
              "/modules/commands/" +
              command);
            if (!module.config || !module.run || !module.config.commandCategory)
              throw new Error(global.getText("mirai", "errorFormat"));
            if (global.client.commands.has(module.config.name || ""))
              throw new Error(global.getText("mirai", "nameExist"));
            if (
              !module.languages ||
              typeof module.languages != "object" ||
              Object.keys(module.languages).length == 0
            )
              if (
                module.config.dependencies &&
                typeof module.config.dependencies == "object"
              ) {
                //logger.loader(global.getText('mirai', 'notFoundLanguage', module.config.name), 'warn');
                for (const reqDependencies in module.config.dependencies) {
                  const reqDependenciesPath = join(
                    __dirname,
                    "nodemodules",
                    "node_modules",
                    reqDependencies
                  );
                  try {
                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                      if (
                        listPackage.hasOwnProperty(reqDependencies) ||
                        listbuiltinModules.includes(reqDependencies)
                      )
                        global.nodemodule[
                          reqDependencies
                        ] = require(reqDependencies);
                      else
                        global.nodemodule[
                          reqDependencies
                        ] = require(reqDependenciesPath);
                    } else "";
                  } catch {
                    var check = false;
                    var isError;
                    logger.loader(
                      global.getText(
                        "mirai",
                        "notFoundPackage",
                        reqDependencies,
                        module.config.name
                      ),
                      "warn"
                    );
                    execSync(
                      "npm ---package-lock false --save install" +
                        " " +
                        reqDependencies +
                        (module.config.dependencies[reqDependencies] == "*" ||
                        module.config.dependencies[reqDependencies] == ""
                          ? ""
                          : "@" + module.config.dependencies[reqDependencies]),
                      {
                        stdio: "inherit",
                        env: process["env"],
                        shell: true,
                        cwd: join(__dirname, "nodemodules"),
                      }
                    );
                    for (let i = 1; i <= 3; i++) {
                      try {
                        require["cache"] = {};
                        if (
                          listPackage.hasOwnProperty(reqDependencies) ||
                          listbuiltinModules.includes(reqDependencies)
                        )
                          global["nodemodule"][
                            reqDependencies
                          ] = require(reqDependencies);
                        else
                          global["nodemodule"][
                            reqDependencies
                          ] = require(reqDependenciesPath);
                        check = true;
                        break;
                      } catch (error) {
                        isError = error;
                      }
                      if (check || !isError) break;
                    }
                    if (!check || isError)
                      throw global.getText(
                        "mirai",
                        "cantInstallPackage",
                        reqDependencies,
                        module.config.name,
                        isError
                      );
                  }
                }
                //logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
              }
            if (module.config.envConfig)
              try {
                for (const envConfig in module.config.envConfig) {
                  if (
                    typeof global.configModule[module.config.name] ==
                    "undefined"
                  )
                    global.configModule[module.config.name] = {};
                  if (typeof global.config[module.config.name] == "undefined")
                    global.config[module.config.name] = {};
                  if (
                    typeof global.config[module.config.name][envConfig] !==
                    "undefined"
                  )
                    global["configModule"][module.config.name][envConfig] =
                      global.config[module.config.name][envConfig];
                  else
                    global.configModule[module.config.name][envConfig] =
                      module.config.envConfig[envConfig] || "";
                  if (
                    typeof global.config[module.config.name][envConfig] ==
                    "undefined"
                  )
                    global.config[module.config.name][envConfig] =
                      module.config.envConfig[envConfig] || "";
                }
                //logger.loader(global.getText('mirai', 'loadedConfig', module.config.name));
              } catch (error) {
                throw new Error(
                  global.getText(
                    "mirai",
                    "loadedConfig",
                    module.config.name,
                    JSON.stringify(error)
                  )
                );
              }
            if (module.onLoad) {
              try {
                const moduleData = {};
                moduleData.api = loginApiData;
                moduleData.models = models;
                module.onLoad(moduleData);
              } catch (_0x20fd5f) {
                throw new Error(
                  global.getText(
                    "mirai",
                    "cantOnload",
                    module.config.name,
                    JSON.stringify(_0x20fd5f)
                  ),
                  "error"
                );
              }
            }
            if (module.handleEvent)
              global.client.eventRegistered.push(module.config.name);
            global.client.commands.set(module.config.name, module);
            //logger.loader(global.getText('mirai', 'successLoadModule', module.config.name));
          } catch (error) {
            //logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
          }
        }
      })(),
      (function () {
        const events = readdirSync(
          global.client.mainPath + "/modules/events"
        ).filter(
          (event) =>
            event.endsWith(".js") &&
            !global.config.eventDisabled.includes(event)
        );
        for (const ev of events) {
          try {
        
