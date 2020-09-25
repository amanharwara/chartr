# [Chartr](https://chartr.vercel.app)

Chartr is a free, open-source web app which allows you to create your own, customized music chartrs. 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Famanharwara%2Fchartr) [![GitHub issues](https://img.shields.io/github/issues/amanharwara/chartr?color=%230aa2fc&style=for-the-badge)](https://github.com/amanharwara/chartr/issues) [![Discord](https://img.shields.io/discord/758989035837718538?color=%23738AD6&label=Discord&style=for-the-badge)](https://discord.gg/haBPMvn) [![Matrix Badge](https://img.shields.io/badge/Matrix%20Room-Join-green)](https://matrix.to/#/!teVYOmxkzmeoismAjI:matrix.org?via=matrix.org)

<a href="https://liberapay.com/~1670630/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a> [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U3114IH) 
### Demo Video:

![Chartr Demo Video](chartr-demo.gif)

## Features

### Album Collage

A collage of album covers.

- Show album titles alongside the collage
- Add upto a 100 items
- Customize the font
- Customize the colors
- Change the padding to your wish
- Increase or decrease the gap between the items

#### Example:

![Album Collage Example](album-collage-example.png)

### Spotify: Top 5 Artists

Your Top 5 Artists on Spotify (requires login)

- Customize background color
- Customize foreground color
- Change time range

![Spotify Top 5 Artists](spotify-top5-artists.png)

### Spotify: Top 5 Tracks

Your Top 5 Tracks on Spotify (requires login)

- Customize background color
- Customize foreground color
- Change time range

![Spotify Top 5 Tracks](spotify-top5-tracks.png)

## Roadmap

- Add localization support
- Move to a custom domain instead of a vercel subdomain
- Add more chart options

## Development

Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

### Initial set-up

```
$ git clone https://github.com/amanharwara/chartr.git
$ cd chartr
$ yarn
or
$ npm install
```

### Build files

`yarn build`

or

`npm run build`

### Start dev server (with live reload)

`yarn dev`

or

`npm run dev`

### Start dev server (without live reload)

`yarn start --host`

or

`npm start --host`
