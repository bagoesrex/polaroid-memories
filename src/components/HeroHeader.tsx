interface HeroHeaderProps {
  recipient: string;
  totalCount?: number;
}

export function HeroHeader({ recipient, totalCount = 4 }: HeroHeaderProps) {
  return (
    <section className="hero-header">
      <p className="eyebrow">{totalCount} KENANGAN TERSIMPAN DI ROLL INI</p>
      <h1 className="recipient-title">untuk {recipient}</h1>
    </section>
  );
}
