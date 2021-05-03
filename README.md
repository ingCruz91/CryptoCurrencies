# CryptoCurrencies

Mobile App for search ocurrencies in market
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development purposes.

 ## Prerequisites
In order to run the project in a local environment, you have to get installed the next software:

* [NPM](https://nodejs.org/es/) - Node Packager Manager. It is installed with NodeJS
* [react-native](https://www.npmjs.com/package/react-native) React Native. It should be installed using `npm install -g react-native`
* [react-native-cli](https://www.npmjs.com/package/react-native-cli) React Native Tools. It should be installed using `npm install -g react-native-cli`
* [Android Studio](https://developer.android.com/studio/) IDE to develop Android Apps
* [react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases) Download the last release
*[XCode](https://developer.apple.com/xcode/) IDE to develop IOS Apps
Additional to this, you must accomplish the next conditions:

* Install the Android SDK version >= 28  using SDK Tools (It is part of Android Studio Tools)
* Set the environment variable **ANDROID_HOME** pointing to your Android base directory. Commonly it is located in ~/Library/Android/sdk
* Create an android emulator using the Android SDK. This can be created using AVD (It is part of Android Studio Tools)


## Installing

1. Clone the project and checkout to the current branch `git clone https://github.com/ingCruz91/CryptoCurrencies.git`
2. Move to the project directory `cd CryptoCurrencies`
3. Install node dependencies `npm install`
4. Open the android project **./android** using android studio. Clean the project and install missing packages if it is needed
5. Open the ios project **./ios** using xcode. Build the project and install missing packages if it is needed
6. In IOS directory `cd ios` run 'pod install'

## Running the application

1. Open the Android emulator. If the "allow USB debugging" window appears, select the OK option.
2. Open the react-native-debugger application. Then enable the network inspect. This can be done pressing secondary click in "Inspector" area and selection the "Enable network inspect" option.
3. Open a terminal in the project directory and run `react-native run-android or react-native run-ios`
4. Once the application is running in the emulator, open the menu and select  **Start Remote JS Debugging**. Now the application must appear in react-native-debugger and it must be done


## Troubleshooting

If you got an error like this :

`[ $ xcode-select --print-path
/Library/Developer/CommandLineTools
$ xcrun -k --sdk iphoneos --show-sdk-path
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'
$ xcrun -k --sdk iphonesimulator --show-sdk-path
xcrun: error: SDK "iphonesimulator" cannot be located
xcrun: error: SDK "iphonesimulator" cannot be located
xcrun: error: unable to lookup item 'Path' in SDK 'iphonesimulator']`

Run  `sudo xcode-select --switch /Applications/Xcode.app` 

## Useful commands 

* `adb emu kill` to finish emulator proccess
* `killall -9 node` for kill all proccess associate with node
* `sudo lsof -i :8081` to list all proccess in a specific port
* `adb shell input keyevent 82` to enter android menu in a physical device
* `xcrun simctl openurl booted https://app.zubale.com/task/5f9df8c864b2d90001c28623` to fire deep link from cli

