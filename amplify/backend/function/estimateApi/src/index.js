/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	ESTIMATE_TABLE
Amplify Params - DO NOT EDIT */

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = process.env.ESTIMATE_TABLE || "Estimates";
const TABLE_NAME = "DynamoDB-dev";

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const item = {
      id: uuidv4(),
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      address: data.address,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      visit_day: data.visitDay,
      visit_hours: data.visitHours,
      products: data.products,
      heard_about: data.heardAbout,
      marketing_permission: data.marketingPermission,
      created_at: new Date().toISOString(),
    };

    await dynamoDb
      .put({
        TableName: TABLE_NAME,
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: item.id }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
};