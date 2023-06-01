import supabase from "@/app/utils/supabase";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { first_name, last_name, email, message } = await req.json();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailData = {
    from: "greg.plumbly@gmail.com",
    to: process.env.EMAIL,
    subject: "New Message from Contact Form",
    text: `
              From: ${first_name} ${last_name}
              Email: ${email}
              Message: ${message}
          `,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    // else console.log(info);
  });

  const { error } = await supabase.from("contacts").insert({
    first_name: first_name,
    last_name: last_name,
    message: message,
    email: email,
  });
}
