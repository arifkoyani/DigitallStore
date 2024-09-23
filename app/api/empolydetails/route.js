import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const { name, authorNumber, city, startingDate, endDate, author, comments } =
    await req.json();
  console.log(
    name,
    authorNumber,
    startingDate,
    endDate,
    city,
    author,
    comments
  );
  try {
    const userExist = await prisma.EmployeeDetails.findUnique({
      where: {
        authorNumber: authorNumber
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "user is exist allready" ,code:111},
        { status: 201 }
      );
    } else {
     await prisma.EmployeeDetails.create({
        data: {
          name,
          authorNumber,
          city,
          author,
          comments,
          startingDate: new Date(startingDate),
          endDate: new Date(endDate),
        },
      });
    }
    return NextResponse.json({ message: "user is created",code:222 }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "sth is error " }, { status: 500 });
  }
}