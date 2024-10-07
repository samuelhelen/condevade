const DataItem = (data, name) => {
  return `
    <h2>${name}</h2>
    <ul>
      <li>IP address information:
        <pre>${data.ip_a}</pre>
      </li>
      <li>Running processes:
        <pre>${data.ps_ax}</pre>
      </li>
      <li>Disk space:
        <pre>${data.df}</pre>
      </li>
      <li>Uptime: ${data.uptime}</li>
    </ul>
  `;
};

export default DataItem;
