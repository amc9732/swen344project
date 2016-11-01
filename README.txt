##Student Enrollment System##

DEVELOPMENT

Install dependencies and get credentials:

1) `npm install`
2) `bower install`
3) Get the .env file that contains various private credentials for connecting to different parts of the app/db/etc.

To run the app locally:

    Dev environment(using dev DB):
        1) run `gulp`
    Prod environment: Uses optimized build, and prod DB which is on the VM. Not likely to need to do this much:
        1) Go to gulpfile.js, inside the "server" task.
        2) Within the runSequence() call, change the text that says "dev" to "prod".
        3) Change the 2 references to `app/app.js` to `dist/app.js`.
        4) Inside the nodemon() call, change the 'env' option to 'production' instead of 'development'.
        5) Run `gulp buildapp`.
        6) Run `gulp`.

TESTING

Run "npm install -g karma-cli" so you can type "karma" without having to type "./node_modules/karma/bin/karma"
From the projects root directory, run `karma start`.

This will open a new browser window to run the tests, close it, then output detailed results to the terminal window.

#Contributors
Tyler Russell
Joshua James
Max Mendleson
Austin Cowan
Fawaz Alhenaki
