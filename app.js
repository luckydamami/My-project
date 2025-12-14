const fs = require("fs");
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
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody); //encoded string se key-val pair
      const paramsObj = Object.fromEntries(params);
      const result = paramsObj.num1 + paramsObj.num2;
      console.log(result);
      fs.writeFileSync(
        "user.txt",
        `Sum of num1 & num2 : ${JSON.stringify(result)}`
      );
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<body><h1>End of the web page!</h1></body>");
  return res.end();
};
module.exports = requestHandler;
