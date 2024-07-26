"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ProfileNav from "@/app/components/ProfileNav";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" href="/" className="header__logo">
          Travel App
        </Link>
        {pathname !== "/sign-in" && pathname !== "/sign-out" && <ProfileNav />}
      </div>
    </header>
  );
}
