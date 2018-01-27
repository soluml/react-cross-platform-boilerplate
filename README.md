# React.js Cross Platform Boilerplate
This is a simple counter application that runs on any platform! The majority of the code is reused between platforms with the view components and entry points being the exception.

NOTE: This is currently being developed to be easy to use. While the basic funcionality should be working it should be used with caution for the time being.

# Current Progress
### Features
* Native development dev build with HMR
* Web development dev build with HMR
* Desktop development dev and prod builds
* Local dev server hosting web application

### In Progress
1. Prod build for native
    1. Docs are a must here
1. One testing framework for all platforms
    1. Use enzyme and mocha for React Native testing if possible

### TODO
1. README.md docs for how some things are done
    1. Testing with Enzyme
    1. One store file
    1. Actions calling dispatch
    1. Reusing containers
1. True HMR for desktop dev
1. Include PreStyle for CSS in JS for web and desktop
    1. PreStyle native?
1. JSDocs
1. Add sonarwhal to web and desktop for accessibility linting
1. Improve linting rules
1. Docker files for windows, linux, mac?


## Setting up everything
This will install all the modules we need for each platform.

Note: This might take awhile. There is around 750mb of node_modules at the moment.
```
$ npm install
```


# ./shared
Contains all the logic we will be sharing across our platforms. This includes our actions, reducers, containers, and the store.

## Tests
Tests run in mocha.
```
$ npm run shared:test
```


# ./native
Contains the views and npm scripts for the React Native application.

## Building for Dev
Run the command below and download the Expo app for iPhone or Android. Once the QR code appears in your terminal simply scan it and you're good to go! Your app will reload whenever anything in shared or native changes.

Note: You will need to allow ports 19000 and 19001 through your firewall on your computer.
```
$ npm run native:dev
```

## Tests
Tests run in Jest and use Enzyme for shallow rendering.
```
$ npm run native:test
```

## Building for Prod
TODO



# ./web
Contains the views and npm scripts for our React Web application.

## Building for Dev
Running this command will cause the web bundle to be rebuilt whenever anything in shared or web changes. You can
then view the the site on "localhost:1337"
```
$ npm run dev-server  # run this in another terminal first
$ npm run web:dev     # leave this running for bundle.js build on file update
```
## Testing
Runs tests in Mocha using Enyzme for shallow rendering.
```
$ npm run web:test
```

## Building for Prod
Running this command will uglify and minify the code. You can view the analyzed bundle at build/web/bundleAnalyzer.html
```
$ npm run web:prod
```



# ./desktop
Contains the views and npm scripts for our React Desktop application.

## Building for Dev
This will build the application on the platform you are running and open an instance of the application with
the debug tools open. As you make changes you can "refresh" the application to load in changes.

```
$ npm run desktop:dev
```

## Testing
```
$ npm run desktop:test
```

## Building for Prod
This creates a distributable for the platform that you are running the command on. You can find it in
/desktop/out/make.

```
$ npm run desktop:prod
```
