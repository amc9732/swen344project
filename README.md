##Student Enrollment System##

The Anatomy of our Node Project:

    Right now the root directory of our Node project should look something like this:
    
    app/
        bin/
        templates/
        public/
        routes/
        app.js
        index.html
    node_modules/
    coverage/
    specs/
    bower.json
    package.json
    gulpfile.js
    jasmine.json

    Explained(code comments are more specific):

    swen344project/
    |  app/ - contains our actual code, Javascript/Angular code, HTML templates, any styles, and our app.js and index.html.
    |   |   bin/       - figuring this out myself...
    |   |   public/    - contains AngularJS/any kind of javascript code, any CSS/SCSS/LESS, and static content like images.
    |   |   templates  - HTML templates that our Angular directives will use.
    |   |   app.js     - entry point to our application.
    |   |   index.html - the HTML file. all other necessary HTML will get used via Angular directives and controllers.
    |   |   routes/ - exactly what you think it does, holds routing information for different parts of the app
    |   node_modules/ - contains all app dependency definitions, only gets run locally or during deployment. not in repo
    |   coverage/ - we can talk about if this should stay, but it is an output folder that holds our current code coverage results
    |   specs/ - contains Jasmine unit tests
    |   bower.json - contains dependencies like node_modules/, but more specific ones like Angular Material or Bootstrap would go here
    |   gulpfile.js - very important for development, see the comments in the file for what each task does
    |   package.json - defines what Node packages we need. Different gulp plugins, Angular itself, and Express are included here
        

TESTS

From the root directory, run `gulp tests` to run all jasmine unit tests.  This refers to everything within the 'spec' directory. This can be nested and split into folders for organizational reasons, it doesn't all have to be in one file. BUT -- each file does need to have xxxx.spec.js at the end, not just xxxx.js!

Anytime you run `gulp`, it'll run everything, including the linter and unit tests.

#Contributors
Tyler
Joshua
Max
Austin
Fawaz
