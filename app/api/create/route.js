import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { email, name, city, author, authorNumber, comments } =
    await req.json();
  console.log(email, name, city, author, authorNumber, comments);
  const prisma = new PrismaClient();
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
    }
     else {
      await prisma.AllUser.create({
        data: {
          email,
          name,
          city,
          author,
          authorNumber,
          comments,
        },
      });
    }
    return NextResponse.json({ message: "user is created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "sth is error " }, { status: 500 });
  }
}
