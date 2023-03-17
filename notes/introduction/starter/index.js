//to use additional modules ->
//store them in a variable and use require function
//return an object with the methods of the module
//file reading and writing
const fs = require("fs");
//network capability to build http servers
const http = require("http");
//routing
const url = require("url");

// //read files (synchronous way)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// //write in files
// const textOut = `avocado text: ${textIn} \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// //async way
// //readFile(file to be read , encoding , callback(first one is always error , data itself))
// //(callback hell)
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("file written");
//       });
//     });
//   });
// });
// console.log("reading files");

////////////////////////////////////////////////////////////////////////

//server
function replaceTemplate(temp, product) {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%ID%}", product.id);

  if (!product.organic)
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");

  return output;
}

const tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
const tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
const tempCard = fs.readFileSync("./templates/card.html", "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data); //turn the json string into js object (an array in this case)

//createServer(request , response)
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //true means it will parse the query ad well ('?id=0' in the address)
  //overview
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //product
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); //.end() requires a string, not an object
  }
  //not found
  else {
    //.writeHead(status you want to be sent , header)
    //can never send headers after sending the response (res.end)
    res.writeHead(404, {
      "Content-type": "text/html", //this header makes the response expect html
    });
    res.end("<h1>page not found</h1>");
  }
});

//starts to listen to incoming requests
//listen(port , host = default:localhost)
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests in port 8000");
});
//now the server is running when >node index.js
