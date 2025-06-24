import SelectedTodo from "@/app/components/todos/SelectedTodo";

export async function generateStaticParams() {
  try {
    const posts = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json());
    return posts.map(el => ({ slug: String(el.id) }));
  } catch (err) {
    console.log(err.message);
  }
}

export default function TodoPage({ params }) {
  return (
    <SelectedTodo id={params.slug} />
  );
}