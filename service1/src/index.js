"use strict";

import http from "http";
import express from "express";
import child_process from "child_process";
import cors from "cors";

import DataItem from "./DataItem.js";

import { getService1Data, getService2Data } from "./service.js";

import { HOST, PORT } from "./constants.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  // TODO: try
  const service1Data = await getService1Data();
  // console.log(service1Data);

  // TODO: try
  const service2Data = await getService2Data();

  // HTML:
  // const htmlpage = `
  //   <!DOCTYPE html>
  //   <html>
  //   <head>
  //     <title>Juttu</title>
  //   </head>
  //   <body>
  //   ${DataItem(service1Data, "Service 1")}
  //   ${DataItem(service2Data, "Service 2")}
  //   </body>
  //   </html>
  // `;
  // response.send(htmlpage);
  // JSON:
  response.json({ service1Data, service2Data });

  child_process.execSync("sleep 2");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});
