const sumRequestHandler = require("./addition");
const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<body>");
    res.write("<h2>Welcome to Home page!</h2>");
    res.write("<a href='/calculator'>Go to calculator</a>");
    res.write("</body>");
    return res.end();
    //----------
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write("<body>");
    res.write("<h2>Enter Two Numbers</h2>");
    res.write("<form action='/calculate-result' method='POST'>");
    res.write("<label>Number 1: </label>");
    res.write('<input type="number" name="num1" required><br><br>');
    res.write("<label>Number 2: </label>");
    res.write('<input type="number" name="num2" required><br><br>');
    res.write('<button type="submit">Sum</button>');
    res.write("</form>");
    res.write("</body>");
    return res.end();
    //---------
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    sumRequestHandler(req, res);
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<body><h1>End of the web page!</h1></body>");
    return res.end();
  }
};
module.exports = requestHandler;
