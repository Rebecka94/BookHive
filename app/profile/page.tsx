import { prisma } from "@/prisma/prismaClient";

export default async function ProfilePage() {
  const bookClubs = await prisma.bookClub.findMany();

  return (
    <div>
      <div>
        {bookClubs.map((bookClub) => (
          <div key={bookClub.id} className="display flex flex-col gap-2">
            <h2>{bookClub.name}</h2>
            <p className="mb-4">{bookClub.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
