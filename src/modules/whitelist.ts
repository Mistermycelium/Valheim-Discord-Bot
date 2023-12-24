import {UserRepository, UserInterface} from './utility/repositories/UserRepository';

const userRepository = new UserRepository();


import fs from 'node:fs';
// import ftpConn from './utility/ftpconn';
let whitelistData: any[];


function buildWhitelist(Data: any[]) {
  let content = '';
  // Build the whitelist content
  Data.forEach((user: { SteamID: any; DiscordID: any; Username: any; XboxID: any; }) => {
    let userstr = '';
    if (user.SteamID) {
      userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.SteamID}\n\n`;
      if (user.XboxID) {
        userstr = userstr + `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
      }
    } else if (user.XboxID) {
      userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
    }
    content = content + userstr;
  });
  return content;
}

function writeWhitelist(content: string | NodeJS.ArrayBufferView) {
  fs.writeFile('./config/whitelist/whitelist.txt', content, err => {
    if (err) {
      console.error(err);
    }
    // success
  });
}

// function uploadWhitelist() {
//   ftpConn.uploadWhitelist('./whitelist/whitelist.txt');
// }
function maptoStrings(arr: any[]) {
  arr = arr.map((item: { [key: string]: any }) => ({
    ...item,
    DiscordID: String(item.DiscordID),
    SteamID: String(item.SteamID)
  }));
}
// writeWhitelist(buildWhitelist(whitelistData));

export const whitelist = {
    loadData: async function() {
      whitelistData = await userRepository.getWhitelistData();
      console.log('loaded whitelist data');
    },
    // uploadWhitelist: uploadWhitelist(),
    // get whitelistData() {
    //   return whitelistData;
    // },
    findUser: async function(discID: any) {
      const usr = whitelistData.find((user: { DiscordID: any; }) => user.DiscordID === discID);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      return usr;
    },
    addUser: async function(user: any) {
      try {
        userRepository.addUser(user);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
      whitelistData.push(user);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      console.log(user);
    },
    removeUser: async function(user: UserInterface) {
      whitelistData = whitelistData.filter((item: { DiscordID: any; }) => item.DiscordID !== user.DiscordID);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
      userRepository.removeUser(user);
    },
    updateUser: async function(user: UserInterface) {
      await userRepository.updateUser(user);
      whitelistData = whitelistData.map((item: { DiscordID: any; }) => item.DiscordID === user.DiscordID ? { ...item, ...user } : item);
      console.log(whitelistData);
      const whitelist = buildWhitelist(whitelistData);
      writeWhitelist(whitelist);
    },
  };
