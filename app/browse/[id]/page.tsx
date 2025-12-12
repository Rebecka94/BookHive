export default async function BrowseIdPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <h1>Book ID: {id}</h1>;
}