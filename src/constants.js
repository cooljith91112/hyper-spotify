const pluginName = 'hyper-spotify';

export const RPCEvents = {
  nextSong: `${pluginName}:next`,
  prevSong: `${pluginName}:prev`,
  togglePlayPause: `${pluginName}:togglePlay`
};

export const defaultKeymaps = {
  [RPCEvents.togglePlayPause]: 'CmdOrCtrl+Shift+Space',
  [RPCEvents.prevSong]: 'CmdOrCtrl+Shift+P',
  [RPCEvents.nextSong]: 'CmdOrCtrl+Shift+N'
};
