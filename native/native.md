# Native
Native contains all the presentational components for building native ios and android applications.



## File Glossary
* .babelrc
  * Specifies the babel plugin needed for react native
* .flowconfig
  * Generated by react native create app, read more about it there
* .watchmanconfig
  * Also generated by react native create app
  * Honestly not sure what it's needed for
* App.js
  * The main entry point for the application
  * Note: Needs to be in the root directory so it can be found
* app.json
  * Defines some properties for the app
  * entryPoint should be left as "./node_modules/react-native-scripts/build/bin/crna-entry.js"
  * Note: Needs to be in the root directory so it can be found



## Special Notes
* expo must be a dependency instead of devDependency



## Dev
To start up the dev build run
```
npm run native:dev
```
Download the Expo app from the marketplace and then scan the barcode that is shown. Once the app loads on the device whenever you make a change in native or shared the app will automatically reload. Sometimes it does take a couple saves before the changes apply.

Note: The test device and the computer running the dev build must be on the same network for it to work. You will need to allow ports 19000 and 19001 through your firewall on your computer



## Prod Android
Before running the prod android build the app.json file should be updated. Set these properties

    name - The name of the app
    slug - The short name of the project in expo
    android.package - The java package for your project

Then run
```
npm run native:prod:android
```
Answer any prompts that come and then wait for the link where the build can be monitored for the app. Once the build finishes the apk can be downloaded.



## Prod IOS
TODO



## Testing
Tests are run through Jest. Testing React components is done via an Enzyme shallow render. The example below is a pretty basic test that may not even be needed. When testing UI components it is important to only test things that give the code base value. With practice, unit testing can save a developer a lot of time that would otherwise be spent manually testing.

If you add a new test be sure to require it in the native/src/testConfig.js file.


```jsx
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import assert from 'assert';

it('should render count', () => {
  const wrapper = shallow(<Counter {...props} count={1} />);

  assert.ok(wrapper.contains(<Text>Count: 1</Text>));
});
```

Run tests via
```
npm run native:test
```