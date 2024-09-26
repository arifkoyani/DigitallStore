import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY; 

export async function POST(req) {
  const { email, name, city, author, authorNumber, comments } = await req.json();

  try {
    const userExist = await prisma.AllUser.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    } else {
      const newUser = await prisma.AllUser.create({
        data: {
          email,
          name,
          city,
          author,
          authorNumber,
          comments,
        },
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        SECRET_KEY, 
        { expiresIn: "1h" } 
      );

     
      return NextResponse.json(
        { message: "User is created", token },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
