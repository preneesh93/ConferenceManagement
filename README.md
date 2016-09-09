# CMS - Yankee
Project Structure

    api/                       <!-- all backend related files-->
        server.js              <!-- starts node application -->
        config.js              <!--stores secret key and token validity time settings-->
        routes/                <!--backend api routes -->
        schemas/               <!-- mongodb collection schemas -->
        uploads/               <!-- uploaded pdf documents -->
    
    app/                       <!-- all frontend related files -->
        styles/                <!-- all css files -->
        js/                    <!-- all frontend  java scripts -->
           controllers         <!-- angular controllers -->
           app.js              <!-- angular module definitions and settings -->
           routes.js           <!-- angular routes -->
        img/                   <!-- images and icons -->
        lib/                   <!-- created by bower install, frontend dependencies -->
        views/                 <!-- html pages -->
        index.html             <!--the main html which loads angular and all libraries-->
    node_modules/              <!-- created by npm install, backend dependencies -->
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
