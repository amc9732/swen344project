#Student Enrollment System#

##LOCAL DEVELOPMENT##

Any changes made to the code will automatically update in your development environment. First install dependencies with 

`npm install && bower install`

then run the server with `node ./bin/www`, and navigate to `localhost:3000` to view the page.

The Anatomy of our Node Project:

    Right now the root directory of our Node project should look something like this:
    
    app.js
    bin/
    node_modules/
    package.json
    gulpfile.js
    jasmine.json
    public/
    routes/
    views/

    gulpfile.js - This contains a set of tasks that can be run in order to do specific development tasks. Tasks include:
        `gulp tests` - Run all .spec.js Jasmine files within the ./spec folder
        `gulp clean` - Simply deletes the ./dist/views folder using a `rm -rf` plugin
        The rest are commented in the source code for reference.
        
    
    app.js - This file is the launching point for our app. We use it to import all other server files including modules, configure routes, open database connections, and just about anything else we can think of.
    
    bin/ - This directory is used to contain useful executable scripts. By default it contains one called www. A quick peak inside reveals that this script actually includes app.js and when invoked, starts our Node.js server.
    
    node_modules - This directory is home to all external modules used in the project. As mentioned earlier, these modules are usually installed using npm install. You will most likely not have to touch anything here.
    
    package.json - This file defines a JSON object that contains various properties of our project including things such as name and version number. It can also defines what versions of Node are required and what modules our project depends on. A list of possible options can be found in npm's documentation.
    
    public/ - As the name alludes to, anything in this folder will be made publicly available by the server. This is where we're going to store JavaScript, CSS, images, and templates we want the client to use.
    
    routes/ - This directory houses our Node controllers and is usually where most of the backend code will be stored.
    
    views/ - As the name says, we will put our views here. Because we specified the --ejs flag when initializing our project, views will have the .ejs extension as opposed to the '.jade' extension Jade views use. Although views are ultimately HTML, they are slightly different than any HTML file we might specify in the public/ directory. Views are capable of being rendered directly by Node using the render() function and can contain logic that allows the server to dynamically change the content. Because we are using Angular to create a dynamic experience, we won't be using this feature.

TESTS

From the root directory, run `gulp tests` to run all jasmine unit tests. This refers to everything within the 'spec' directory. This can be nested and split into folders for organizational reasons, it doesn't all have to be in one file. BUT -- each file does need to have xxxx.spec.js at the end, not just xxxx.js!

#Contributors
Tyler
Joshua
Max
Austin
Fawaz
