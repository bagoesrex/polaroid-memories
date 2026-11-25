import { memo } from 'react';

interface BrandFooterProps {
  onOpenEditor: () => void;
}

export const BrandFooter = memo(function BrandFooter({ onOpenEditor }: BrandFooterProps) {
  return (
    <footer className="brand-footer">
      <p className="brand-tag">MADE WITH GIFTKUY.ID</p>
      <h2 className="brand-headline">Buat hadiah digital yang tak terlupakan</h2>
      <p className="brand-sub">
        Kamera polaroid interaktif, kenangan personal, dan surat rahasia—rancang halaman kejutanmu
        sendiri dalam hitungan menit.
      </p>
      <button type="button" className="brand-cta" onClick={onOpenEditor}>
        Coba Kustomisasi Demo
      </button>
    </footer>
  );
});
