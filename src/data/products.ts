import type { ImageKey } from './images';
export interface Product { slug: string; name: string; category: 'fragrance' | 'mists' | 'sets'; type: string; image: ImageKey; detail: ImageKey; sizes: string[]; mood: string; description: string; }
export const products: Product[] = [
  { slug: 'vanilla-rice', name: 'VANILLA RICE', category: 'fragrance', type: 'Eau de Parfum', image: 'rice', detail: 'rice-silo', sizes: ['50 ml', '10 ml'], mood: 'Vanilla', description: 'A little softness, a little sweetness. Discover VANILLA RICE and find the size that fits your everyday ritual.' },
  { slug: 'queens-caramel', name: 'QUEENS CARAMEL', category: 'fragrance', type: 'Eau de Parfum', image: 'caramel', detail: 'caramel-silo', sizes: ['50 ml', '10 ml', '50 ml + 10 ml duo'], mood: 'Gourmand', description: 'Make room for a sweeter mood. Explore QUEENS CARAMEL in full and travel sizes.' },
  { slug: 'vanilla-salt', name: 'VANILLA SALT', category: 'fragrance', type: 'Eau de Parfum', image: 'salt', detail: 'salt-silo', sizes: ['50 ml', '10 ml'], mood: 'Vanilla', description: 'A different side of vanilla. Make VANILLA SALT part of your fragrance wardrobe.' },
  { slug: 'miami-nectar', name: 'MIAMI NECTAR', category: 'fragrance', type: 'Eau de Parfum', image: 'miami', detail: 'miami', sizes: ['50 ml'], mood: 'Tropical', description: 'Bring a little getaway to your everyday. Discover the colorful world of MIAMI NECTAR.' },
  { slug: 'plum-tonic', name: 'PLUM TONIC', category: 'fragrance', type: 'Eau de Parfum', image: 'plum', detail: 'plum-white', sizes: ['50 ml', '10 ml'], mood: 'Fruity', description: 'A rich new mood for your fragrance collection. Explore PLUM TONIC and inquire about your preferred size.' },
  { slug: 'isla-sirena', name: 'ISLA SIRENA', category: 'fragrance', type: 'Eau de Parfum', image: 'isla', detail: 'isla-silo', sizes: ['50 ml'], mood: 'Tropical', description: 'An invitation to take a moment away. Step into the island-inspired world of ISLA SIRENA.' },
  { slug: 'banana-milkshake', name: 'BANANA MILKSHAKE', category: 'mists', type: 'Perfume Mist', image: 'banana', detail: 'banana-silo', sizes: ['240 ml'], mood: 'Gourmand', description: 'A playful addition to your daily fragrance ritual. Explore BANANA MILKSHAKE perfume mist.' },
  { slug: 'marshmallows', name: 'MARSHMALLOWS', category: 'mists', type: 'Perfume Mist', image: 'marshmallows', detail: 'marshmallows-silo', sizes: ['240 ml', '90 ml'], mood: 'Gourmand', description: 'Make everyday moments a little sweeter. Discover MARSHMALLOWS perfume mist in two sizes.' },
  { slug: 'memoir', name: 'MEMOIR', category: 'sets', type: 'Fragrance Discovery Set', image: 'memoir', detail: 'memoir', sizes: ['Discovery set'], mood: 'Discovery', description: 'Discover a new favorite, one fragrance at a time. Inquire about the current selection included in the MEMOIR discovery set.' },
];
export const collections = [
  { slug: 'all', title: 'ALL FRAGRANCES', subtitle: 'A fragrance for every mood. Find the one that feels like you.' },
  { slug: 'fragrance', title: 'EAU DE PARFUM', subtitle: 'Your everyday, made extraordinary. Explore the fragrance collection.' },
  { slug: 'mists', title: 'PERFUME MISTS', subtitle: 'A little playful. A little unexpected. Meet your new daily ritual.' },
  { slug: 'sets', title: 'GIFTS & SETS', subtitle: 'A world of scent, waiting to be discovered.' },
  { slug: 'vanilla', title: 'A VANILLA FOR EVERY MOOD', subtitle: 'Discover a softer side of your fragrance wardrobe.' },
];
export function inCollection(product: Product, slug: string) { return slug === 'all' || product.category === slug || (slug === 'vanilla' && product.mood === 'Vanilla'); }
