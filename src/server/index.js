const Router = require("vertx-web-js/router")
const StaticHandler = require("vertx-web-js/static_handler")
import 'babel-polyfill';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import getRoutes from '../shared/routes';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import NashornApiClient from './NashornApiClient';
//import ApiClient from '../shared/helpers/ApiClient';
import createHistory from 'react-router/lib/createMemoryHistory';
import createStore from '../shared/redux/create';
import { syncHistoryWithStore } from 'react-router-redux';
import {Provider} from 'react-redux';


const app = Router.router(vertx);

var client = vertx.createHttpClient({
});

app.route('/api/*').handler(function (ctx) {

   //console.log(myKey);
    console.log("Proxying request: " + ctx.request().uri());
    var c_req = client.request(ctx.request().method(), 8081, "localhost", ctx.request().uri(), function (c_res) {
        console.log("Proxying response: " + c_res.statusCode());
        ctx.response().setChunked(true);
        ctx.response().setStatusCode(c_res.statusCode());
        ctx.response().headers().setAll(c_res.headers());
        c_res.handler(function (data) {
            console.log("Proxying response body: " + data.toString("ISO-8859-1"));
            ctx.response().write(data);
        });
        c_res.endHandler(function (v) {
            ctx.response().end();
        });
    });
    c_req.setChunked(true);
    c_req.headers().setAll(ctx.request().headers());
    ctx.request().handler(function (data) {
        console.log("Proxying request body " + data.toString("ISO-8859-1"));
        c_req.write(data);
    });
    ctx.request().endHandler(function (v) {
        c_req.end();
    });
});



app.get().handler((ctx) => {

    global.__SERVER__ = true;

    const client = new NashornApiClient(ctx);
    const memoryHistory = createHistory(ctx.request().uri());
    const store = createStore(memoryHistory, client);
    const history = syncHistoryWithStore(memoryHistory, store);

  match({routes: getRoutes(), location: ctx.request().uri()}, (err, redirect, props) => {

    if (err) {
      ctx.fail(err.message);
    } else if (redirect) {
      ctx.response()
        .putHeader("Location", redirect.pathname + redirect.search)
        .setStatusCode(302)
        .end();
    } else if (props) {
        console.log('Before load on server');
        loadOnServer({...props, store, helpers: {client}}).then(() => {

            console.log('after loadonserver');
            console.log('Hopefully there is something in server redux store now');

                const routerContextWithData = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect
                            {...props}/>
                    </Provider>
                );
                 console.log("BEFORE APPHTML CREATION");


                    const appHtml = renderToString(routerContextWithData);

                console.log("AFTER APPHTML CREATION");

                    ctx.response()
                        .putHeader("content-type", "text/html")
                        .end(`<!DOCTYPE html>
              <html lang="en">
              <head>
                <!--link rel="stylesheet" href="https://unpkg.com/wingcss" /-->
                <meta charset="UTF-8">
                <title>Universal Blog</title>
              </head>
              <body>
                <div id="app">${appHtml}</div>
                <script src="/bundle.js"></script>
              </body>
              </html>`);



       });


    } else {
      ctx.next();
        ctx.response().setStatusCode(404);
    }
  });
});

app.get().handler(StaticHandler.create().handle)

vertx.createHttpServer().requestHandler(app.accept).listen(8080)




console.log('Server listening: http://127.0.0.1:8080/')