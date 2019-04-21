/* eslint-disable no-console */
const express = require("express");
const app = express();
const cmd = require("node-cmd");

app.post("/git", (req, res) => {
    if (
        req.headers["x-github-event"] == "push" &&
        process.env.secret == req.headers["x-hub-signature"]
    ) {
        cmd.run("chmod 777 git.sh"); 
        cmd.get("./git.sh", (err, data) => {
            if (data) console.log(data);
            if (err) console.log(err);
        });
        cmd.run("refresh"); // Refresh project
        const commits =
            req.body.head_commit.message.split("\n").length == 1
                ? req.body.head_commit.message
                : req.body.head_commit.message
                    .split("\n")
                    .map((el, i) =>
                        i !== 0 ? "                       " + el : el
                    )
                    .join("\n");
        console.log(
            "> [GIT] Updated with origin/master\n" +
                `        Latest commit: ${commits}`
        );
    }
    return res.sendStatus(200);
});

app.listen(3000, () => console.log("Express!"));