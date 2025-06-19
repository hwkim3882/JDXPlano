/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DYNAMODB_ARN
	STORAGE_DYNAMODB_NAME
	STORAGE_DYNAMODB_STREAMARN
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
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const sns = new AWS.SNS({ region: process.env.REGION || "us-west-1" }); // 리전 확인 필요
// const TABLE_NAME = process.env.ESTIMATE_TABLE || "Estimates";
const TABLE_NAME = "Estimates-dev";

// 메일 환경변수
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// 문자 수신자
const RECEIVER_PHONE = process.env.RECEIVER_PHONE; // e.g. +1XXXYYYZZZZ

// Twilio 문자 발송 (임시 테스트용)
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
const customerPhone = process.env.CUSTOMER_PHONE_NUMBER;

const twilioClient = require("twilio")(twilioAccountSid, twilioAuthToken);

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    // 전체 신청 내역 조회
    try {
      const data = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: err.message }),
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }
  }

  // 기존 POST 저장 로직
  try {
    const data = JSON.parse(event.body);

    const item = {
      id: uuidv4(),
      email: data.email || "unknown",
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
      message: data.message,
      created_at: moment().tz("America/Chicago").format("YYYY-MM-DD HH:mm:ss"),
    };

    await dynamoDb
      .put({
        TableName: TABLE_NAME,
        Item: item,
      })
      .promise();

    // 2. 메일 발송
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "📬 New Estimate Request Received",
      text: `New estimate submitted by ${item.first_name} ${item.last_name}\nPhone: ${item.phone}\nMessage: ${item.message}\nvisit_day: ${item.visit_day}\nvisit_hours: ${item.visit_hours}`,
    });

    // 3. 문자 발송 (AWS SNS)
    // await sns
    //   .publish({
    //     Message: `New estimate from ${item.first_name} ${item.last_name}\nPhone: ${item.phone}\nMessage: ${item.message}\nvisit_day: ${item.visit_day}\nvisit_hours: ${item.visit_hours}`,
    //     PhoneNumber: RECEIVER_PHONE, // +1XXXYYYZZZZ
    //   })
    //   .promise();

    // // 테스트 문자 발송
    // try {
    //   const snsResult2 = await sns
    //     .publish({
    //       Message:
    //         "You have a new estimate request from JDX Plano. Please check the dashboard.",
    //       PhoneNumber: process.env.RECEIVER_PHONE || "+1XXXXXXXXXX",
    //     })
    //     .promise();

    //   console.log("✅ SMS 2 (Test) sent successfully:", snsResult2);
    // } catch (err) {
    //   console.error("❌ SMS 2 (Test) failed:", err);
    // }

    // // Twilio 문자 발송 (임시 테스트용)
    // try {
    //   const twilioResult = await twilioClient.messages.create({
    //     body: `📩 Twilio Test SMS: Estimate from ${item.first_name} ${item.last_name}`,
    //     from: twilioFrom,
    //     to: customerPhone,
    //   });
    //   console.log("✅ Twilio SMS sent:", twilioResult.sid);
    // } catch (err) {
    //   console.error("❌ Twilio SMS failed:", err);
    // }

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
