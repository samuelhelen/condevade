import { useState, MouseEvent } from "react";

import { getData, stringify } from "./utils.ts";

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

    // objective: all containers shut down
    getData(false);
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
