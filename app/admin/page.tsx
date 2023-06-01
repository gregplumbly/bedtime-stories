import supabase from "../utils/supabase";

export default async function Messages() {
  const { data: posts } = await supabase.from("contacts").select();
  return (
    <>
      <h1>Contacts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
