"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import ProfileNav from "@/app/components/profile-nav";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header__inner">
        <Link
          data-test-id="header-logo"
          href="/"
          className={`header__logo ${playfairDisplay.className}`}
        >
          Travel App
        </Link>
        {pathname !== "/sign-in" && pathname !== "/sign-up" && <ProfileNav />}
      </div>
    </header>
  );
}
