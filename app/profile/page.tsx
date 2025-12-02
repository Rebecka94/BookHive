import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: bookClubs, error } = await supabase
    .from('book_clubs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching book clubs:', error);
    return <div>Error loading book clubs</div>;
  }


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
