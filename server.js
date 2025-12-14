const http = require("http");
const requestHandler = require("./app");

http.createServer(requestHandler).listen(3000, () => {
  console.log("server started http://localhost:3000");
});
