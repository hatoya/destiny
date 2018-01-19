// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAkFjnWA9WS5XsWo8GNtyTPEORQPFmSCyM",
    authDomain: "destiny-cff1c.firebaseapp.com",
    databaseURL: "https://destiny-cff1c.firebaseio.com",
    projectId: "destiny-cff1c",
    storageBucket: "destiny-cff1c.appspot.com",
    messagingSenderId: "266890712087"
  },
  destiny: {
    apiKey: '26afb960ed334cc09268788c92305fd6'
  }
};
