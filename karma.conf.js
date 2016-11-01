module.exports = function(karma){
  
  karma.set({
    // register the framework (it needs to go before mocha / jasmine) 
    frameworks: ['angular', 'jasmine'],

    files: [               		
      "app/specs/**/*.spec.js",
      					    	
    ],

    browsers: ['Chrome'],
    
    singleRun: true,

    reporters: ["spec"],
    
  });
};