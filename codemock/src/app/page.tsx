import Link from "next/link";

export default function Home() {
  return (
    <div>
      Chào nga nhé
      <button>Add new</button>
      <Link href="features/Authentication/Login">Log in</Link> 
    </div>
  );
}
