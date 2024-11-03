import { useState, MouseEvent } from "react";

import axios from "axios";

// TODO: add some more path to the url both here and in the gateway.
// extract the PORT.
// TODO: switch this for the docker-compose setup:
// const BASE_URL = "http://service1:8198/api";
const BASE_URL = "http://localhost:8199";

const getData = async () => {
  // TODO: try
  const response = await axios.get(`${BASE_URL}/`);

  return response.data;
};

interface ServiceData {
  uptime: string;
  df: string;
  ps_ax: string;
  ip_a: string;
}

interface Data {
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
const stringify = (data: Data) => {
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

function App() {
  const [data, setData] = useState(null);

  const onRequest = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO: try
    const newData = await getData();
    setData(() => newData);
  };

  const onStop = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO: all containers shut down
  };

  const textAreaStyle = {
    width: "100%",
  };

  return (
    <>
      <button onClick={onRequest}>REQUEST</button>
      <button onClick={onStop}>STOP</button>
      <label htmlFor="textarea0">REQUEST response:</label>
      <textarea
        id="textarea0"
        rows={40}
        cols={80}
        style={textAreaStyle}
        value={data ? stringify(data) : ""}
        readOnly
      ></textarea>
    </>
  );
}

export default App;
