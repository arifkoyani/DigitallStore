import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const { name, authorNumber, city, author,comments } = await req.json();
  console.log(name, authorNumber, city, author,comments );
  try {
    const userExist = await prisma.empolyedetails.findUnique({
      where: {
        authorNumber: authorNumber,
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "user is exist allready" },
        { status: 201 }
      );
    } else {
      await prisma.empolyedetails.create({
        data: {
          name, authorNumber, city, author,comments
        },
      });
    }
    return NextResponse.json({ message: "user is created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "sth is error " }, { status: 500 });
  }
}
