const fs = require("fs");
const sumRequestHandler = (req, res) => {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });
  let result;
  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody); //encoded string se key-val pair
    const paramsObj = Object.fromEntries(params);
    result = Number(paramsObj.num1) + Number(paramsObj.num2);
    fs.writeFileSync("user.txt", `Sum of num1 & num2 : ${result}`);
    res.setHeader("Content-Type", "text/html");
    res.write(`<h1>Num1 =  ${paramsObj.num1}</h1>\n`);
    res.write(`<h1>Num2 =  ${paramsObj.num2}</h1>\n`);
    res.write(`<h1>Sum = ${result}</h1>`);
    return res.end();
  });
};

module.exports = sumRequestHandler;
