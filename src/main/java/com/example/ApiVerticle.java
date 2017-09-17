package com.example;

import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonArray;
import io.vertx.rxjava.core.AbstractVerticle;
import io.vertx.rxjava.ext.web.Router;
import io.vertx.rxjava.ext.web.RoutingContext;
import io.vertx.rxjava.ext.web.handler.StaticHandler;
import io.vertx.core.json.JsonObject;

import javax.script.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.concurrent.ExecutionException;

public class ApiVerticle extends AbstractVerticle  {



    @Override
    public void start() throws  ExecutionException, InterruptedException {





        Router rxRouter = Router.router(vertx);


        rxRouter.get("/api/posts/").handler(this::getPosts);

        rxRouter.route().handler(routingContext -> {
            routingContext.response().putHeader("content-type", "text/html").end("Hello world");
        });
        rxRouter.route().handler(StaticHandler.create());

        HttpServerOptions options = new HttpServerOptions().setLogActivity(true);


        vertx.createHttpServer(options).requestHandler(rxRouter::accept).listen(8081);
    }

    private void getPosts(RoutingContext routingContext)  {

        JsonArray array = new JsonArray();
        array.add(new JsonObject().put("id", "0")
                .put("title","'Building a Universal JavaScript App on'")
                .put("slug","'buiding-a-universal-javascript-app'")
                .put("content","'Street art 8-bit photo booth, aesthetic kickstarter organic raw denim hoodie non kale chips pour-over occaecat. Banjo non ea, enim assumenda forage excepteur typewriter dolore ullamco. Pickled meggings dreamcatcher ugh, church-key brooklyn portland freegan normcore meditation tacos aute chicharrones skateboard polaroid. Delectus affogato assumenda heirloom sed, do squid aute voluptate sartorial. Roof party drinking vinegar franzen mixtape meditation asymmetrical. Yuccie flexitarian est accusamus, yr 3 wolf moon aliqua mumblecore waistcoat freegan shabby chic. Irure 90\\'s commodo, letterpress nostrud echo park cray assumenda stumptown lumbersexual magna microdosing slow-carb dreamcatcher bicycle rights. Scenester sartorial duis, pop-up etsy sed man bun art party bicycle rights delectus fixie enim. Master cleanse esse exercitation, twee pariatur venmo eu sed ethical. Plaid freegan chambray, man braid aesthetic swag exercitation godard schlitz. Esse placeat VHS knausgaard fashion axe cred. In cray selvage, waistcoat 8-bit excepteur duis schlitz. Before they sold out bicycle rights fixie excepteur, drinking vinegar normcore laboris 90\\'s cliche aliqua 8-bit hoodie post-ironic. Seitan tattooed thundercats, kinfolk consectetur etsy veniam tofu enim pour-over narwhal hammock plaid.'"));
        array.add(new JsonObject().put("id", "1").put("title", "'Learning React'")
                .put("slug","'Learning React'")
                .put("content","'Street art 8-bit photo booth, aesthetic kickstarter organic raw denim hoodie non kale chips pour-over occaecat. Banjo non ea, enim assumenda forage excepteur typewriter dolore ullamco. Pickled meggings dreamcatcher ugh, church-key brooklyn portland freegan normcore meditation tacos aute chicharrones skateboard polaroid. Delectus affogato assumenda heirloom sed, do squid aute voluptate sartorial. Roof party drinking vinegar franzen mixtape meditation asymmetrical. Yuccie flexitarian est accusamus, yr 3 wolf moon aliqua mumblecore waistcoat freegan shabby chic. Irure 90\\'s commodo, letterpress nostrud echo park cray assumenda stumptown lumbersexual magna microdosing slow-carb dreamcatcher bicycle rights. Scenester sartorial duis, pop-up etsy sed man bun art party bicycle rights delectus fixie enim. Master cleanse esse exercitation, twee pariatur venmo eu sed ethical. Plaid freegan chambray, man braid aesthetic swag exercitation godard schlitz. Esse placeat VHS knausgaard fashion axe cred. In cray selvage, waistcoat 8-bit excepteur duis schlitz. Before they sold out bicycle rights fixie excepteur, drinking vinegar normcore laboris 90\\'s cliche aliqua 8-bit hoodie post-ironic. Seitan tattooed thundercats, kinfolk consectetur etsy veniam tofu enim pour-over narwhal hammock plaid.'"));

        routingContext.response().putHeader("content-type","application/json").end(array.encodePrettily());
    }

}
