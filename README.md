# temera-mobile-starter

Repository to start a new react-native mobile project in temera.

## Howto

Follow the instructions below to init a new temera mobile project:

1. clone this repository `git clone git@github.com:vaxxis/temera-mobile-starter.git`
2. install project dependencies `yarn install`
3. remove .git directory `rm -rf .git`
4. change application name in `./app.json`
5. remove `./android` and `./ios` directories: `rm -rf ./android && rm -rf ./ios`
6. run eject script: `react-native eject`
7. link project dependencies `react-native link`
8. Enjoy 😉

## Changelog

- [25/01/20] Upgrade to react-native v0.61.5
