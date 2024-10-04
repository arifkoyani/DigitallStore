import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server.js";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { firstName, lastName, email, password, dob, phone, country } = body;

  console.log(firstName, lastName, email, password, dob, phone, country);

  // Check if all required fields are filled
  if (!firstName || !lastName || !email || !password || !dob || !phone || !country) {
    return NextResponse.json({ message: "Fill all fields" }, { status: 400 });
  }



  try {
    // Create user in the database
    await prisma.UserCreate.create({
      data: {
        firstName,
        lastName,
        email,
        password, 
        dob: new Date(dob),
        phone,
        country,
      },
    });
    return NextResponse.json({ message: "User successfully created" }, { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: "Failure to create user" }, { status: 500 });
  }
}
