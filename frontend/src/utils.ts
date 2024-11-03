import axios from "axios";

// TODO: add some more path to the url both here and in the gateway.
// extract the PORT.
// TODO: switch this for the docker-compose setup:
// const BASE_URL = "http://service1:8198/api";
const BASE_URL = "http://localhost:8199";

// get_not_stop: if false, stop everything. else actually get
export const getData = async (get_not_stop: boolean = true) => {
  // TODO: try
  const response = get_not_stop
    ? await axios.get(`${BASE_URL}/`)
    : await axios.get(`${BASE_URL}/`, { params: { stop: true } });

  return response.data;
};

export interface ServiceData {
  uptime: string;
  df: string;
  ps_ax: string;
  ip_a: string;
}

export interface Data {
  service1Data: ServiceData;
  service2Data: ServiceData;
}

const stringifyServiceData = (serviceData: ServiceData, name: string) => {
  // TODO: input validation
  return (
    name +
    "\n\n" +
    "\nIP address information:\n" +
    serviceData.ip_a +
    "\nRunning processes:\n" +
    serviceData.ps_ax +
    "\nDisk space:\n" +
    serviceData.df +
    "\nUptime:\n" +
    serviceData.uptime
  );
};
export const stringify = (data: Data) => {
  // TODO: input validation

  // return JSON.stringify(data);
  const service1Data: ServiceData = data.service1Data;
  const service2Data: ServiceData = data.service2Data;

  return (
    stringifyServiceData(service1Data, "Service 1") +
    "\n\n\n" +
    stringifyServiceData(service2Data, "Service 2")
  );
};
