const express = require("express");

const app = express();

app.post("/api/loan-applications", (req, res) => {
    // Get the preAssessment value from the request body
    const preAssessment = req.body.preAssessment;

    // Send the preAssessment value to the decision engine
    fetch(`https://api.decisionengine.com/loan-applications/${preAssessment}`)
        .then(response => response.json())
        .then(result => {
            // Send the result back to the client
            res.send(result);
        });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

