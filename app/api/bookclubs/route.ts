import { prisma } from "@/prisma/prismaClient";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  const bookClub = await prisma.bookClub.create({
    data: {
      name,
      description,
      creatorId: "lorem",
    },
  });

  return Response.json(bookClub);
}

export async function GET() {
  const bookClubs = await prisma.bookClub.findMany();
  return Response.json(bookClubs);
}
