# ZMWallet

ZMWallet is a mobile web browser that provides easy access to websites that use the [Ethereum](https://ethereum.org/) blockchain.

## ZMWallet Mobile

### Building Locally

The code is built using React-Native and running code locally requires a Mac or Linux OS.

- Make sure your NodeJS and npm versions are up to date for `React 16.8.6`

- Install [React Native CLI](https://reactnative.dev/docs/environment-setup)

- Install [cocoapods](https://guides.cocoapods.org/using/getting-started.html) by running:

```bash 
sudo gem install cocoapods
```

- Clone this repo and install our dependencies:

```bash
git clone ...
cd zmwallet-mobile
yarn install # this will run a lengthy postinstall flow
cd ios && pod install && cd .. # install pods for iOS
```

- Install shims for core node modules:

```bash
./node_modules/.bin/rn-nodeify --hack --install
```

#### Android

- Start the emulator and run:
```bash
yarn run android
```

#### iOS

- Start the emulator and run:
```bash
yarn run ios
```