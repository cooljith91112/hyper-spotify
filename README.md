# hyper-spotify

[![License](https://img.shields.io/github/license/panz3r/hyper-spotify.svg)](LICENSE.md)
[![hyper](https://img.shields.io/badge/Hyper-v1.3.1-green.svg)](https://github.com/zeit/hyper/releases/tag/1.3.1)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub issues](https://img.shields.io/github/issues/panz3r/hyper-spotify.svg)](https://github.com/panz3r/hyper-spotify/issues)

> Spotify plugin for [Hyper](https://hyper.is). Display currently playing song on [Spotify](https://www.spotify.com) at the bottom of the terminal and allow to play/pause your favourite music

## Installation
Simply add this plugin inside `~/.hyper.js` and enjoy your music :musical_note:
```js
module.exports = {
  ...
  plugins: ['hyper-spotify']
  ...
}
```

## Limitations
Currently works only on macOS

## Credits

This plugin is inspired by [`atom-spotify2`](https://github.com/albertorestifo/atom-spotify2) and uses [`spotify-node-applescript`](https://github.com/andrehaveman/spotify-node-applescript) to interact with [Spotify](https://www.spotify.com) client on macOS
