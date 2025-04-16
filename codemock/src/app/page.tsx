"use client";
import AppBar from "./components/Appbar";
import Home from "./features/Home/page";

export default function Main() {
  return (
    <div>
      <AppBar isHomePage={true} />
      <Home/>
    </div>
  );
}
