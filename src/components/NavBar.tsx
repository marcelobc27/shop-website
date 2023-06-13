import { fetchjson } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function NavBar() {
  const [user, setUser] = useState<User>()
  console.log(user)

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchjson('api/user')
        setUser(user)  
      } catch (err) {
        
      }
    })()
  }, [])

  const handleSignOut = async () => {
    await fetchjson('api/logout')
    setUser(undefined)
  }

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href={"/"}>Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
          <li>
            {user.name}
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
          </>
        ) : (
          <li>
            <Link href={"/sign-in"}>Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
