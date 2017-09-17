package com.example;

import io.vertx.rxjava.core.AbstractVerticle;
import io.vertx.core.Vertx;


public class Main extends AbstractVerticle {


    public static void main(String[] args) {


        Vertx vertx = Vertx.vertx();

        vertx.deployVerticle(new ApiVerticle());

        NashornVerticleFactory verticleFactory = new NashornVerticleFactory();

        verticleFactory.init(vertx);
        try {
            vertx.deployVerticle(verticleFactory.createVerticle("server.js", vertx.getClass().getClassLoader()));

        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}