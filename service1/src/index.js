"use strict";

import http from "http";
import express from "express";

import axios from "axios";

import { promisify } from "util";
import child_process from "child_process";
const exec = promisify(child_process.exec);

import DataItem from "./DataItem.js";

const PORT = 8199;
const HOST = "0.0.0.0";
// const HOST = "localhost";

// const BACKEND_URL = "http://localhost:8080";
const BACKEND_URL = "http://service2:8080";

const getData = async () => {
  // TODO: try
  const response = await axios.get(BACKEND_URL);
  return response.data;
};

const getService1Data = async () => {
  // TODO: try
  const uptimeResult = await exec("uptime --pretty");
  const uptime = uptimeResult.stdout;

  // TODO: try
  const dfResult = await exec("df");
  const df = dfResult.stdout;

  // TODO: try
  const psAxResult = await exec("ps -ax");
  const ps_ax = psAxResult.stdout;

  // TODO: try
  const ipAResult = await exec("ip a");
  const ip_a = ipAResult.stdout;

  return { uptime, df, ps_ax, ip_a };
};

const app = express();

app.use(express.json());

app.get("/", async (request, response) => {
  // TODO: try
  const service1Data = await getService1Data();
  // console.log(service1Data);

  // TODO: try
  const service2Data = await getData();

  const htmlpage = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Juttu</title>
    </head>
    <body>
    ${DataItem(service1Data, "Service 1")}
    ${DataItem(service2Data, "Service 2")}
    </body>
    </html>
  `;

  response.send(htmlpage);

  child_process.execSync("sleep 2");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});
