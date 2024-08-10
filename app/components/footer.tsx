import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">
        © 2024, from
        <a
          className="footer__link"
          href="https://binary-studio.com"
          target="_blank"
        >
          binary studio
        </a>
        with
        <Image
          className="footer__icon"
          src="/heart.svg"
          alt="heart"
          width={21}
          height={16}
        />
      </span>
    </footer>
  );
}
