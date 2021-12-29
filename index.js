var app = require("express")();
var server = require("http").Server(app);
const axios = require("axios");
require("dotenv").config();

const debug = true;
const hostname = process.env.SERVER_PTERODACTYL_URL;
const tokenUser = process.env.SERVER_PTERODACTYL_TOKENUSER;
const tokenServer = process.env.SERVER_PTERODACTYL_TOKENSERVER;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenUser}`,
};
const headersServer = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenServer}`,
};
let aujourdhui = new Date();
const options = {
    baseURL: hostname,
    port: 443,
    url: "",
    method: "",
    headers: headers,
};
server.listen(process.env.SERVER_PORT);

/////////////////////////////////////////////////////////////////

app.get(`/api/client`, async(req, res) => {
    try {
        let body = [];

        options.method = "get";
        options.url = "/api/client";

        const result = await axios(options);
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${options.url} ${result.status}`);
            }
        }

        if (result.data.data.length !== 0) {
            for (let data of result.data.data) {
                body.push(data.attributes);
            }
            return res.send(body);
        } else {
            return res.send(body);
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${options.url} : ${error}`);
        return res.send(error);
    }
});

app.get(`/api/client/servers/:identifier/`, async(req, res) => {
    try {
        let identifier = req.params.identifier;
        options.method = "get";
        options.url = `/api/client/servers/${identifier}`;

        const result = await axios(options);
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${options.url} ${result.status}`);
            }
        }

        if (result) {
            return res.send(result.data.attributes);
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${options.url} : ${error}`);
        return res.send(error);
    }
});

app.get(`/api/client/servers/:identifier/resources`, async(req, res) => {
    try {
        let identifier = req.params.identifier;
        options.method = "get";
        options.url = `/api/client/servers/${identifier}/resources`;

        const result = await axios(options);
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${options.url} ${result.status}`);
            }
        }

        if (result) {
            return res.send(result.data.attributes);
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${options.url} : ${error}`);
        return res.send(error);
    }
});