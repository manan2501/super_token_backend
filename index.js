const supertokens = require("supertokens-node");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Session = require("supertokens-node/recipe/session");
const {
    middleware,
    errorHandler,
} = require("supertokens-node/framework/express");
const express = require("express");

const cors = require("cors");

const app = express();

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI:
            "https://adc1c871d63d11ecba0497ced3af7a55-ap-southeast-1.aws.supertokens.io:3568",
        apiKey: "f=FEsSm2PwQX7MWhG36JSyQem9G7Bx",
    },
    appInfo: {
        appName: "task-super_token",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

app.use(middleware());

app.use(errorHandler());
