import geometricKingLogo from './assets/images/logo_geometric_king_1789103570589.jpg';
import monogramCrownLogo from './assets/images/logo_monogram_crown_1789103586628.jpg';
import techSigilLogo from './assets/images/logo_tech_sigil_1789103598046.jpg';
import swissEmblemLogo from './assets/images/logo_swiss_emblem_1789103611765.jpg';

export interface LogoOption {
  id: string;
  name: string;
  subtitle: string;
  style: string;
  description: string;
  badge: string;
  imageSrc: string | null; // null for default pure SVG
  aspectRatio: string;
  recommendedFor: string;
}

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: 'geometric-king',
    name: 'Sovereign Apex',
    subtitle: 'Minimalist Geometric Chess King',
    style: 'Swiss Precision · Vector Facets',
    badge: 'Recommended · Top Pick',
    description:
      'A sharp, mathematically balanced Chess King crown featuring a subtle cross finial. Rendered in brushed champagne gold over obsidian black. Perfectly matches the 3D WebGL King on the site.',
    imageSrc: geometricKingLogo,
    aspectRatio: '1:1',
    recommendedFor: 'Editorial luxury, modern creative studios, high-contrast layouts.',
  },
  {
    id: 'monogram-crown',
    name: 'Royal Monogram RA',
    subtitle: 'Intertwined "R" & "A" Crest',
    style: 'Haute Couture · Fine Line Art',
    badge: 'Personal Signature',
    description:
      'A bespoke monogram fusing the initials of Rehan Ali crowned with a stately chess king apex. Fine line art with gold foil sheen on midnight black.',
    imageSrc: monogramCrownLogo,
    aspectRatio: '1:1',
    recommendedFor: 'Personal identity, portfolio authority, bespoke designer branding.',
  },
  {
    id: 'tech-sigil',
    name: 'Terminal King { ♔ }',
    subtitle: 'Code Brackets & King Sigil',
    style: 'Cyber-Minimalist · Developer Core',
    badge: 'Tech & Linux Focus',
    description:
      'A fusion of developer terminal compiler brackets and an electric amber-gold chess king glyph. Celebrates your hands-on Linux, Python, and Kotlin engineering journey.',
    imageSrc: techSigilLogo,
    aspectRatio: '1:1',
    recommendedFor: 'Software engineers, systems developers, open-source contributors.',
  },
  {
    id: 'swiss-emblem',
    name: 'Bauhaus King Silhouette',
    subtitle: 'Bold Neo-Brutalist Block Emblem',
    style: 'Architectural · Negative Space',
    badge: 'Architectural Form',
    description:
      'A timeless, weighty silhouette of the Staunton king piece carved out of deep matte black with warm antique gold and ivory tones.',
    imageSrc: swissEmblemLogo,
    aspectRatio: '1:1',
    recommendedFor: 'Bold art direction, minimal posters, iconic app icons.',
  },
  {
    id: 'vector-crown',
    name: 'Classic Vector Crown',
    subtitle: 'Pure Inline SVG Icon',
    style: 'Ultra-Minimalist · Zero Weight',
    badge: 'Original Minimalist',
    description:
      'The original crisp inline Lucide King Crown vector icon in pure gilt gold. Completely seamless, fast, and featherlight.',
    imageSrc: null,
    aspectRatio: '1:1',
    recommendedFor: 'Ultra-lightweight minimalism and distraction-free navigation.',
  },
];
