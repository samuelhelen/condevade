import { promisify } from "util";
import child_process from "child_process";

import axios from "axios";

import { BACKEND_URL } from "./constants.js";

const exec = promisify(child_process.exec);

export const getService2Data = async (requestQuery) => {
  const isEmpty = Object.entries(requestQuery).length === 0;

  // TODO: try
  const response = isEmpty
    ? await axios.get(BACKEND_URL)
    : await axios.get(BACKEND_URL, { params: requestQuery });

  return response.data;
};

export const getService1Data = async () => {
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
