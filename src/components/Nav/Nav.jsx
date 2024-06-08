import { ThemeSelector } from "./ThemeSelector";
import { LangSelector } from "./LangSelector";
import NavSearch from "./NavSearch";

const links = [
  { href: "/", text: { fr: "Accueil", en: "Home" } },
  { href: "/programming", text: { fr: "Programmation", en: "Programming" } },
  { href: "/drawing", text: { fr: "Dessin", en: "Drawing" } },
  { href: "/music", text: { fr: "Musique", en: "Music" } },
];

export default function Nav() {
  return (
    <div className="p-4 flex-col sm:flex-row align-middle items-center text-white space-y-4 z-50 hidden sm:block container mx-auto">
      <div className="flex flex-row items-center justify-between space-x-4">
        <ThemeSelector />
        <LangSelector />
        <NavSearch />
      </div>
    </div>
  );
}
