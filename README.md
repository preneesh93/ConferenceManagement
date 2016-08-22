# CMS - Yankee
Project Structure

    - api <!---- all backend stuff -->
    -- server.js <!-- set up our node application -->
    ---- routes <!-- Api routes -->
    - app <!-- all frontend and angular stuff -->
    ----- css
    ----- js
    ---------- controllers <!-- angular controllers -->
    ---------- services <!-- angular services -->
    ---------- app.js <!-- angular application -->
    ---------- appRoutes.js <!-- angular routes -->
    ----- img
    ----- data
    ----- lib <!-- created by bower install -->
    ----- views
    ---------- home.html <!-- this is home file -->
    ----- index.html
    - config
    - node_modules <!-- created by npm install -->
    - .bowerrc <!-- tells bower where to put files (public/libs) -->
    - bower.json <!-- tells bower which files we need -->
    - package.json <!-- tells npm which packages we need -->

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