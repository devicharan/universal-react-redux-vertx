# Universal React Redux Vertx

The idea is to build a very basic boilerplate for building a universal react redux vertx application . 

Technologies used : Vertx , React.js , Redux ,Nashorn .


#### Inspirations : [Erikras Universal react redux](https://github.com/erikras/react-redux-universal-hot-example)  and  [Vertx Examples SSR](https://github.com/vert-x3/vertx-examples/tree/master/reactjs-server-side-rendering)

#### Technical Information:

1. The main java verticle on starting launches two verticles a) API Verticle b) Webserver verticle.

2. The API verticle is java based verticle handling your API calls . You can do all the crud . The 99% of your backend code can run here . Yeah , i mean the non-web part.

3. The Webserver verticle does two things  a) Acts a proxy forwarding all your API requests to API verticle. b) Generating html content if required for Search engine optimization.

4. NashornVerticleFactory : This is a copy of vertx projects JSVerticleFactory . I pulled it to experiment with polyfills of nashorn. This verticle factory is used for vertx-js.

5. NashornAPIClient is the API Client on the server .



###### For More information please click the links on the "Inspiration" area.

#### ** The project contains lot of todo's and lots of cleanup needs to be done.**


#### Build and Run
 
To build the  project, simply run `npm install && npm start` from the project's root directory. You can then run the application by editing your Eclipse or Intellij configurations . The main class should be com.example.Main . Point your browser at [http://localhost:8080](http://localhost:8080) to get started.

The client code (Browser) lives under `src/client` and the server code under `src/server`. All code under `src/shared` is shared by both client and server (typically your react application logic).

For a more productive development workflow, the `package.json` file also has a `watch` script using `vert.x`, if run, it will start your application and on file save it will reload the application for you.

After doing npm install & start you would get pom.xml in the .vertx directory .
