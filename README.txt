##Student Enrollment System##

The Anatomy of our Node Project:

swen344project/
    .coverdata/ - related to code coverage results when running `gulp tests`
    app/
        bower_components - contains the primary files needed for injection from the upper level bower_components directory
        css - contains any and all of our CSS for the app
        images - contains any images of any kind for the app
        js - contains our javascript. angular code goes in here.
        routes/ - exactly what you think it does, holds routing information for different parts of the app
        specs/ - contains Jasmine unit tests
        templates  - HTML templates that our Angular directives will use.
        app.js     - entry point to our application.
        index.html - the HTML file. all other necessary HTML will get used via Angular directives and controllers.
    .coverrun - related to code coverage functionality when running `gulp tests`
    .env - secret file containing credentials for connections to DB from local computer. this should always be gitignored.
    .gitignore - contains a list of files/folders not to be commited to the repo
    bower.json - contains dependencies like node_modules/, but more specific ones like Bootstrap/Material would go here
    gulpfile.js - very important for development, see the comments in the file for what each gulp task does
    package.json - defines what Node packages we need. Different gulp plugins, Angular itself, and Express are included here
    reports/ - contains an actual HTML file that displays the code coverage results when running `gulp tests`
    README.md - this file

        
DEVELOPMENT

After cloning the project, you'll need to run `npm install` and probably `bower install` as well in order to install all packages into the project. 

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

From the root directory, run `gulp tests` to run all jasmine unit tests.  This refers to everything within the 'app/spec' directory. This can be nested and split into folders for organizational reasons, it doesn't all have to be in one file. BUT -- each file does need to have xxxx.spec.js at the end, not just xxxx.js!

#Contributors
Tyler Russell
Joshua James
Max Mendleson
Austin Cowan
Fawaz Alhenaki
