

from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import subprocess
import json


# hostName = "localhost"
hostName = "0.0.0.0"
serverPort = 8080


def command_lines(command):
    return subprocess.run(command, stdout=subprocess.PIPE,
                          encoding="utf-8").stdout
    # return subprocess.run(command, stdout=subprocess.PIPE,
    #                       encoding="utf-8").stdout.split("\n")


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # uptime = time.clock_gettime(time.CLOCK_BOOTTIME)
        uptime = command_lines(["uptime", "--pretty"])
        ps_ax_lines = command_lines(["ps", "-ax"])
        df_lines = command_lines(["df"])
        ip_a_lines = command_lines(["ip", "a"])

        self.send_response(200)
        self.send_header("Content-type", "application/json")

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')

        self.end_headers()

        payload_object = {
            "ip_a": ip_a_lines,
            "ps_ax": ps_ax_lines,
            "df": df_lines,
            # "uptime": uptime / 3600
            "uptime": uptime
        }
        payload = json.dumps(payload_object)

        self.wfile.write(bytes(payload, "utf-8"))


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
