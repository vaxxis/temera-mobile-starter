# temera-mobile-starter (deprecated)

Repository to start a new react-native mobile project in temera.
**Using deprecated navigator**

## Howto

Follow the instructions below to init a new temera mobile project:

1. clone this repository `git clone git@github.com:vaxxis/temera-mobile-starter.git`
2. remove .git directory `rm -rf .git`
3. launch rename command `npx react-native-rename MyExampleApp`
4. in root folder install project dependencies `yarn install`
5. Enjoy 😉

## Changelog

- [25/01/20] Upgrade to react-native v0.61.5

## Troubleshooting

- When building on android you will have an errore with the react-native-i18n. Follow the Android Studio recomendations and remove the `<uses-sdk android:minSdkVersion="16" />` from the library AndroidManifest.xml then try to build again.
