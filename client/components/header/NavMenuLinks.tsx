"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const NavMenuLinks = () => {
  const { data: session, status } = useSession();
  console.log("Hello")

  const pages = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
  ];

  if (status === "loading") return <p>Loading...</p>;

  return (
    <ul className="md:flex md:flex-wrap md:items-center gap-8 text-lg md:text-[15px] space-y-5 md:space-y-0">
      {pages.map((item, i) => (
        <li key={i}>
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}

      {session ? (
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavMenuLinks;
