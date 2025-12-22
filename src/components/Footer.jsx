import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 py-8 text-center border-t-2 border-oak/10">
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl opacity-30 select-none">❦</div>
        <p className="font-serif text-oak/60 text-sm">
          &copy; {new Date().getFullYear()} The Grand Library. Repository of
          Fine Works.
        </p>
        <p className="text-xs text-oak/40">
          "Expertly curated for the discerning reader."
        </p>
      </div>
    </footer>
  );
};

export default Footer;
