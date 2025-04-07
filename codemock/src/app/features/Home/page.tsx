"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Home</div>
      <Link href="/Authentication">Log in</Link>
    </div>
  );
}
