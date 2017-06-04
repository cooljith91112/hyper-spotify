# hyper-spotify

[![License](https://img.shields.io/github/license/panz3r/hyper-spotify.svg)](LICENSE.md)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub issues](https://img.shields.io/github/issues/panz3r/hyper-spotify.svg)](https://github.com/panz3r/hyper-spotify/issues)
[![hyper](https://img.shields.io/badge/Hyper-v1.3.1-green.svg)](https://github.com/zeit/hyper/releases/tag/1.3.1)
[![npm](https://img.shields.io/npm/v/hyper-spotify.svg)](https://www.npmjs.com/package/hyper-spotify)

> Spotify plugin for [Hyper](https://hyper.is). <br>
Display currently playing song on [Spotify](https://www.spotify.com) at the bottom of the terminal and allows you to control your favourite music

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
