import { Hono } from "hono";
import { serve } from "@hono/node-server";
import "dotenv/config";
import createImage from "./api/createImage";
import getImage from "./api/getImages";
import deleteImage from "./api/deleteImage";
require("dotenv").config();

const app = new Hono().basePath("/api");

app.route("/createImage", createImage);
app.route("/getImages", getImage);
app.route("/deleteImage", deleteImage);

app.use("*", async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (c.req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  return next();
});

console.log("Server is running");

const port = 3000;
serve({
  fetch: app.fetch,
  port,
});

export default app;
