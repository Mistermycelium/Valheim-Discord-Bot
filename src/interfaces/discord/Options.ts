export interface Options {
  getSubcommand: () => string;
  getMentionable: (arg0: string) => any
  getString: (arg0: string) => any;
}
