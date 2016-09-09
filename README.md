# CMS - Yankee
Project Structure

    api/                       <!-- all backend stuff -->
        server.js              <!-- set up our node application -->
        config.js              <!--stores secret key and token validity time settings-->
        routes/                <!--backend api routes -->
        schemas/               <!-- mongodb collection schemas -->
    app/                       <!-- all frontend and angular stuff -->
        styles/                <!-- all css files -->
        js/		               <!-- all frontend  javascripts -->
           controllers         <!-- angular controllers -->
           app.js 	           <!-- angular module definitions and settings -->
           routes.js	       <!-- angular routes -->
        img/  	               <!-- images and icons -->
        lib/ 	               <!-- created by bower install, which has all frontend libraries -->
        views/	               <!-- html pages -->
        index.html             <!--the main html page which bootstraps angular and all libraries-->
    node_modules/              <!-- created by npm install, which holds all backend frameworks -->
    .bowerrc                   <!-- tells bower where to put files (public/libs) -->
    bower.json                 <!-- tells bower which files we need -->
    package.json               <!-- tells npm which packages we need -->


-- mongodb collections
    {
      DB_Name: "cms",
      collections:
        [
          "users",
          "submissions",
          "reviews",
          "chair"
        ]
    }
