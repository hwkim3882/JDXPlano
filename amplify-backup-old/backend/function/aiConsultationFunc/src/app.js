/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["openai"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SECRET_NAME"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'SECRET_NAME', Value: 'SECRET_VALUE', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const OpenAI = require("openai");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Add a specific handler for the OPTIONS preflight request
app.options("*", function (req, res) {
  res.sendStatus(200);
});

// Initialize OpenAI client
// Force update: 4
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/****************************
 * AI Consultation POST method *
 ****************************/

app.post("*", async function (req, res) {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res
      .status(400)
      .json({ error: "`messages` array is required in the request body." });
  }

  // Transform messages to the format OpenAI expects
  const formattedMessages = messages.map((msg) => ({
    role: msg.from === "user" ? "user" : "assistant",
    content: msg.text,
  }));

  // Add a system prompt to guide the AI
  const systemMessage = {
    role: "system",
    content:
      "You are a helpful assistant for JDX Plano, a company specializing in blinds, shades, curtains, and shutters. Be concise, friendly, and focus on helping users with their window treatment needs.",
  };

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 250,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      success: "post call succeed!",
      message: aiResponse,
    });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      error: "Failed to get response from OpenAI.",
      details: error.message,
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the Express app on AWS Lambda
// via API Gateway, the serverless programming model uses this object to
// handle incoming requests.
module.exports = app;
