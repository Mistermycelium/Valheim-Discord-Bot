/* eslint-disable no-shadow */

import { UserRepository, UserInterface } from '../data/repositories/UserRepository';
import { UploadService } from '../services/UploadService';
import { beeheimFileSystem } from '../../config/config.json';
import { FileSystemConfig } from '../interfaces/IConfig';

const whitelistService = new UploadService(beeheimFileSystem as FileSystemConfig);
const userRepository = new UserRepository();
// import ftpConn from './utility/ftpconn';
let users: any[];


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

export const whitelist = {
  loadData: async function() {
    users = await userRepository.getAll();
    console.log('loaded all users');
  },
  findUser: async function(discID: any) {
    const usr = users.find((user: { DiscordID: any; }) => user.DiscordID === discID);
    const whitelist = buildWhitelist(users);
    whitelistService.uploadAll(whitelist);
    return usr;
  },
  addUser: async function(user: any) {
    try {
      userRepository.create(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    users.push(user);
    const whitelist = buildWhitelist(users);
    whitelistService.uploadAll(whitelist);
    // console.log(user);
  },
  removeUser: async function(user: UserInterface) {
    users = users.filter((item: { DiscordID: any; }) => item.DiscordID !== user.DiscordID);
    const whitelist = buildWhitelist(users);
    whitelistService.uploadAll(whitelist);
    userRepository.delete(user);
  },
  updateUser: async function(user: UserInterface) {
    await userRepository.update(user);
    users = users.map((item: { DiscordID: any; }) => item.DiscordID === user.DiscordID ? { ...item, ...user } : item);
    // console.log(whitelistData);
    const whitelist = buildWhitelist(users);
    whitelistService.uploadAll(whitelist);
  },
};
