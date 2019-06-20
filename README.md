# temera-mobile-starter

Repository to start a new react-native mobile project in temera.

## Howto

Follow the instructions below to init a new temera mobile project:

  1. clone this repository `git clone git@github.com:vaxxis/temera-mobile-starter.git`
  2. install project dependencies `yarn install`
  2. remove .git directory `rm -rf .git`
  3. change application name in `./app.json`
  4. remove `./android` and `./ios` directories: `rm -rf ./android && rm -rf ./ios`
  5. run eject script: `react-native eject`
  6. link project dependencies `react-native link`
  7. Enjoy 😉
