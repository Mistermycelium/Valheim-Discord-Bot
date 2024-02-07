/* eslint-disable quotes */
import { Options } from "./Options";
import { ReplyOptions } from "./ReplyOptions";
import { User } from "./User";

export interface Interaction {
  options: Options;
  user: User;
  reply: (arg0: ReplyOptions) => any;
}
