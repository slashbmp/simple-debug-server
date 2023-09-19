const express = require("express");
const app = express();
const port = 5555;
const parser = require("body-parser");
const fs = require("fs");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.all("*", (req, res) => {

	console.log(">>>>>>>>>>>> BEGIN <<<<<<<<<<<<<");

	console.log("\n%cENDPOINT:", "font-weight: bold");
	console.log(req.originalUrl);

	console.log("\nMETHOD:");
	console.log(req.method);

	console.log("\nHEADERS:");
	//console.log(req.headers);
	for (const [key, val] of Object.entries(req.headers)) {
		console.log(`${key}: ${val}`);
	}

	console.log("\nREQUEST PARAMS:");
	for (const [key, val] of Object.entries(req.query)) {
		console.log(`${key} = ${val}`);
	}
	
	console.log("\nREQUEST BODY:");
	console.log(req.body);

	console.log("\n>>>>>>>>>>>> END <<<<<<<<<<<<<");

	const fileResp = `./mock-response${req.originalUrl}.json`;
	if (fs.existsSync(fileResp)) {
		const resContent = fs.readFileSync(fileResp, { encoding: "utf8" });
		try {
			const json = JSON.parse(resContent);
			res.send(json);
		}
		catch (e) {
			res.send(resContent);
		}
	}
	else {
		res.send("Okay");
	}
	
});

app.listen(port, () => {
	console.log("Server running on port " + port);
});