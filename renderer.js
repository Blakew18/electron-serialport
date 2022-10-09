// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require("serialport");
const tableify = require("tableify");

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      document.getElementById("error").textContent = err.message;
      return;
    } else {
      document.getElementById("error").textContent = "";
    }
    console.log("ports", ports);

    if (ports.length === 0) {
      document.getElementById("error").textContent = "No ports discovered";
    }

    tableHTML = tableify(ports);
    document.getElementById("ports").innerHTML = tableHTML;
  });
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

const button = document.getElementById("send");
const serialport = new SerialPort({ path: "COM2", baudRate: 115200 });
button.addEventListener("click", function () {
  serialport.write("123456", function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
});

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

listSerialPorts();
