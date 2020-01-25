# temera-mobile-starter

Repository to start a new react-native mobile project in temera.

## Howto

Follow the instructions below to init a new temera mobile project:

1. clone this repository `git clone git@github.com:vaxxis/temera-mobile-starter.git`
2. remove .git directory `rm -rf .git`
3. change application name in `./app.json`
4. remove `./android` and `./ios` directories: `rm -rf ./android && rm -rf ./ios`
5. on a different folder create a new project with desired name eg. `npx react-native init myExampleProject`
6. copy `./ios` and `./android` folder from new project to temera-mobile-starter
7. delete the newly created project eg. `rm -rf myExampleProject`
8. in root folder install project dependencies `yarn install`
9. Enjoy 😉

## Changelog

- [25/01/20] Upgrade to react-native v0.61.5
