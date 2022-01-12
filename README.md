# Lukeflix: Watch With Friends (LukeStream)

Watch movies in sync with friends using video and voice chat.

## Getting Started

**Requires [npm](https://www.npmjs.com/) & [Node.js](https://nodejs.org/) and [Font Awesome](https://fontawesome.com) Pro License. Currently only optimized for [Chrome](https://www.google.com/chrome/).**

1. Clone repo.
1. Export your Font Awesome Access Token.

   ```zsh
   FONTAWESOME_NPM_AUTH_TOKEN=<YOUR-TOKEN-HERE>
   ```

1. Install dependencies:

   ```zsh
   npm i
   ```

1. Build server:

   ```zsh
   npm run build
   ```

1. Run once (to generate default config):

   ```zsh
   npm run start
   ```

1. Quit server: <kbd>control</kbd> + <kbd>c</kbd>
1. Edit newly generated `config.json`
1. Restart server (to use updated config):

   ```zsh
   npm run start
   ```

1. Visit `https://localhost:3000` or whatever port is set in the config file.
1. There may be some browser security warnings. If using Chrome, type `thisisunsafe` anywhere to view the site. **HTTPS is required as the voice/video chat will not function without it.** The server is using a provided self-signed cert. Consider using [Let's Encrypt](https://letsencrypt.org/) if hosting externally.

## Tech Stack

This app is written in [TypeScript](https://www.typescriptlang.org/) for both the server and client. This allows for consistent type-checking between both environments. The client uses [React](https://reactjs.org/) with [Next.js](https://nextjs.org/) for server-side rendering. On the back-end, the Next.js server script has been modified to use [Express](https://expressjs.com/) and serve a [Socket.IO](https://socket.io/) server. Currently, there is no database, as everything is managed client-side via local storage.

Movie playback syncing and voice/video chat call signaling is handled using sockets. After the initial signaling, the voice/video chat uses [WebRTC](https://webrtc.org/) to provide an end-to-end encrypted peer-to-peer chat. It uses a mesh-network format for each peer, meaning there is no host, peer, or centralized connection. Each user connects individually with each other user. This does have some performance implications when adding additional users to the room; however, this reduces the load on a centralized server.

To maintain SSL encryption, external content, such as the movies themselves, captions, thumbnails, etc... are all reverse-proxied through the back-end.

On the front-end, most components are styled using [styled-components](https://styled-components.com/) and are theme-customizable to make it easily re-brandable. Icons are using [Font Awesome Pro](https://fontawesome.com/).

## Development

You can learn more about developing for this project in the [contributing guide](CONTRIBUTING.md).

## LICENSE

This project is currently unlicensed. Please ask permission for using directly, however, using it as an example of how to set up your own project is more than welcome. The code was originally written in JavaScript in 2017 and updated in 2020 to meet the needs of the pandemic to include video and audio chat and to use TypeScript. I haven't updated or maintained it since and cannot gurantee it works properly. I'd love to get back to it though as this is one of my favorite projects I've worked on.
