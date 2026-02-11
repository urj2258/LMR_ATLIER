export interface Product {
    id: string;
    slug: string;
    title: string;
    category: 'Bridal' | 'Wedding' | 'Formal' | 'Menswear' | 'Little Ones';
    price: string;
    images: string[];
    description: string;
    color: string;
    fabric: string;
    details: string;
}

export const products: Product[] = [
    {
        id: '1',
        slug: 'gul-e-noor',
        title: 'Gul-e-Noor',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/bridal/gul-e-noor/front.png',
            '/images/bridal/gul-e-noor/back.png',
            '/images/bridal/gul-e-noor/side.png',
            '/images/bridal/gul-e-noor/detail.png'
        ],
        description: 'A crimson red masterpiece featuring heavy zardozi and dabka work on pure velvet. The quintessential traditional Pakistani bridal look.',
        color: 'Deep Red',
        fabric: 'Pure Velvet & Jamawar',
        details: 'Hand-embellished with antique gold kora, dabka, and naqshi. Paired with a heavy matha patti and traditional jewelry.'
    },
    {
        id: '2',
        slug: 'mehr-un-nisa',
        title: 'Mehr-un-Nisa',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/bridal/mehr-un-nisa/front.png',
            '/images/bridal/mehr-un-nisa/back.png',
            '/images/bridal/mehr-un-nisa/side.png',
            '/images/bridal/mehr-un-nisa/detail.png'
        ],
        description: 'A regal maroon bridal lehenga adorned with intricate floral motifs in gold and silver. A tribute to Mughal royalty.',
        color: 'Maroon',
        fabric: 'Raw Silk',
        details: 'Features detailed resham work and crystal embellishments. Includes a heavy trailing dupatta.'
    },
    {
        id: '3',
        slug: 'zareen-begum',
        title: 'Zareen Begum',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/bridal/zareen-begum/front.png',
            '/images/bridal/zareen-begum/back.png',
            '/images/bridal/zareen-begum/side.png',
            '/images/bridal/zareen-begum/detail.png'
        ],
        description: 'A striking rust and burnt orange ensemble, perfect for the modern bride who values tradition with a twist.',
        color: 'Rust / Burnt Orange',
        fabric: 'Organza & Silk',
        details: 'Heavily embellished bodice with a voluminous flare. accented with gotta patti work.'
    },
    {
        id: '4',
        slug: 'noor-e-hayat',
        title: 'Noor-e-Hayat',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/bridal/noor-e-hayat/front.png',
            '/images/bridal/noor-e-hayat/back.png',
            '/images/bridal/noor-e-hayat/side.png',
            '/images/bridal/noor-e-hayat/detail.png'
        ],
        description: 'An ethereal champagne gold lehenga that exudes elegance and sophistication. Sparkling with Swarovski crystals.',
        color: 'Champagne Gold',
        fabric: 'Tissue & Net',
        details: 'Monochromatic gold embellishments on a shimmering base. Perfect for a Walima or Reception.'
    },
    {
        id: '5',
        slug: 'shehnai-royale',
        title: 'Shehnai Royale',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/bridal/shehnai-royale/front.png',
            '/images/bridal/shehnai-royale/back.png',
            '/images/bridal/shehnai-royale/side.png',
            '/images/placeholders/bridal_5_4.png'
        ],
        description: 'Ivory and gold combine to create a timeless masterpiece. Soft, romantic, and utterly luxurious.',
        color: 'Ivory & Gold',
        fabric: 'Pure Chiffon',
        details: 'Delicate pearl and beadwork on an ivory canvas, highlighted with antique gold accents.'
    },
    {
        id: '6',
        slug: 'emerald-empress',
        title: 'Emerald Empress',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_6_1.png',
            '/images/placeholders/bridal_6_2.png',
            '/images/placeholders/bridal_6_3.png',
            '/images/placeholders/bridal_6_4.png'
        ],
        description: 'A majestic emerald green lehenga for the bold and beautiful. Rich, deep tones with contrasting gold embroidery.',
        color: 'Emerald Green',
        fabric: 'Velvet',
        details: 'Gold zardozi work pops against the deep green velvet. styled with emerald jewelry.'
    },
    {
        id: '7',
        slug: 'laylas-dream',
        title: "Layla's Dream",
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_7_1.png',
            '/images/placeholders/bridal_7_2.png',
            '/images/placeholders/bridal_7_3.png',
            '/images/placeholders/bridal_7_4.png'
        ],
        description: 'Deep plum hues soaked in luxury. A unique color choice for a distinctive bridal look.',
        color: 'Deep Plum',
        fabric: 'Mysore Silk',
        details: 'Silver and gold mixed metal embroidery creates a stunning visual texture.'
    },
    {
        id: '8',
        slug: 'roshanara',
        title: 'Roshanara',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_8_1.png',
            '/images/placeholders/bridal_8_2.png',
            '/images/placeholders/bridal_8_3.png',
            '/images/placeholders/bridal_8_4.png'
        ],
        description: 'Soft blush pink for the fairytale bride. Adorned with 3D floral motifs and sequins.',
        color: 'Blush Pink',
        fabric: 'Net & Organza',
        details: 'Intricate floral embroidery in pastel shades with silver accents.'
    },
    {
        id: '9',
        slug: 'kohinoor',
        title: 'Kohinoor',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_9_1.png',
            '/images/placeholders/bridal_9_2.png',
            '/images/placeholders/bridal_9_3.png',
            '/images/placeholders/bridal_9_4.png'
        ],
        description: 'Antique gold on gold. A heavily embellished outfit that shines like a diamond.',
        color: 'Antique Gold',
        fabric: 'Tissue',
        details: 'A fully worked lehenga with hardly an inch of bare fabric. The ultimate statement piece.'
    },
    {
        id: '10',
        slug: 'teal-twilight',
        title: 'Teal Twilight',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_10_1.png',
            '/images/placeholders/bridal_10_2.png',
            '/images/placeholders/bridal_10_3.png',
            '/images/placeholders/bridal_10_4.png'
        ],
        description: 'A mesmerizing teal ensemble balancing modern vibrance with traditional craftsmanship.',
        color: 'Teal',
        fabric: 'Raw Silk',
        details: 'Copper and gold embroidery creates a warm contrast against the cool teal base.'
    },
    {
        id: '11',
        slug: 'jahanara',
        title: 'Jahanara',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_11_1.png',
            '/images/placeholders/bridal_11_2.png',
            '/images/placeholders/bridal_11_3.png',
            '/images/placeholders/bridal_11_4.png'
        ],
        description: 'A vibrant scarlet red lehenga, representing the passion and joy of the occasion.',
        color: 'Scarlet Red',
        fabric: 'Chiffon & Silk',
        details: 'Traditional motifs including peacocks and paisleys rendered in fine threadwork.'
    },
    {
        id: '12',
        slug: 'mah-e-ru',
        title: 'Mah-e-Ru',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_12_1.png',
            '/images/placeholders/bridal_12_2.png',
            '/images/placeholders/bridal_12_3.png',
            '/images/placeholders/bridal_12_4.png'
        ],
        description: 'Dark oxblood velvet, regal and commanding. Perfect for a winter wedding.',
        color: 'Oxblood',
        fabric: 'Micro Velvet',
        details: 'Heavy zardozi borders and a sprayed pattern of motifs across the flare.'
    },
    {
        id: '13',
        slug: 'saffron-soul',
        title: 'Saffron Soul',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_13_1.png',
            '/images/placeholders/bridal_13_2.png',
            '/images/placeholders/bridal_13_3.png',
            '/images/placeholders/bridal_13_4.png'
        ],
        description: 'A deep burnt sienna and saffron blend. Warm, earthy, and exceptionally beautiful.',
        color: 'Burnt Sienna',
        fabric: 'Jamawar',
        details: 'Self-print jamawar base with superimposed hand embroidery in antique gold.'
    },
    {
        id: '14',
        slug: 'sitara',
        title: 'Sitara',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_14_1.png',
            '/images/placeholders/bridal_14_2.png',
            '/images/placeholders/bridal_14_3.png',
            '/images/placeholders/bridal_14_4.png'
        ],
        description: 'A golden beige stunner that captures the starlight. Subtle yet glamorous.',
        color: 'Golden Beige',
        fabric: 'Tissue Silk',
        details: 'Embellished with sequins and crystals for a high-shine effect.'
    },
    {
        id: '15',
        slug: 'mumtaz',
        title: 'Mumtaz',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_15_1.png',
            '/images/placeholders/bridal_15_2.png',
            '/images/placeholders/bridal_15_3.png',
            '/images/placeholders/bridal_15_4.png'
        ],
        description: 'Pearl white elegance. Pristine, pure, and perfect for the sophisticated bride.',
        color: 'Pearl White',
        fabric: 'Organza',
        details: 'White-on-white embroidery with silver accents and pearl detailing.'
    },
    {
        id: '16',
        slug: 'sabz-pari',
        title: 'Sabz Pari',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_16_1.png',
            '/images/placeholders/bridal_16_2.png',
            '/images/placeholders/bridal_16_3.png',
            '/images/placeholders/bridal_16_4.png'
        ],
        description: 'A darker bottle green, rich with tradition and heritage.',
        color: 'Bottle Green',
        fabric: 'Velvet',
        details: 'Red and gold accents embedded within the heavy green base.'
    },
    {
        id: '17',
        slug: 'jamila',
        title: 'Jamila',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_17_1.png',
            '/images/placeholders/bridal_17_2.png',
            '/images/placeholders/bridal_17_3.png',
            '/images/placeholders/bridal_17_4.png'
        ],
        description: 'A deep aubergine number that stands out from the crowd.',
        color: 'Aubergine',
        fabric: 'Raw Silk',
        details: 'Contrasting light gold embroidery lifts the dark purple base colors.'
    },
    {
        id: '18',
        slug: 'gul-e-rana',
        title: 'Gul-e-Rana',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_18_1.png',
            '/images/placeholders/bridal_18_2.png',
            '/images/placeholders/bridal_18_3.png',
            '/images/placeholders/bridal_18_4.png'
        ],
        description: 'Dusty pink vintage charm. Soft, romantic, and steeped in nostalgia.',
        color: 'Dusty Pink',
        fabric: 'Net',
        details: 'Featuring vintage-style border work and scattered floral botis.'
    },
    {
        id: '19',
        slug: 'zardozi-queen',
        title: 'Zardozi Queen',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_19_1.png',
            '/images/placeholders/bridal_19_2.png',
            '/images/placeholders/bridal_19_3.png',
            '/images/placeholders/bridal_19_4.png'
        ],
        description: 'A bronze beauty. Metallic tones for an edgy yet traditional look.',
        color: 'Bronze',
        fabric: 'Tissue',
        details: 'Entirely hand-worked zardozi in shades of copper and bronze.'
    },
    {
        id: '20',
        slug: 'feroza',
        title: 'Feroza',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_20_1.png',
            '/images/placeholders/bridal_20_2.png',
            '/images/placeholders/bridal_20_3.png',
            '/images/placeholders/bridal_20_4.png'
        ],
        description: 'A bright turquoise and sea green delight. Fresh and vibrant.',
        color: 'Turquoise',
        fabric: 'Chiffon',
        details: 'Silver and crystal work makes this outfit shimmer like the ocean.'
    },
    {
        id: '21',
        slug: 'soraya',
        title: 'Soraya',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_21_1.png',
            '/images/placeholders/bridal_21_2.png',
            '/images/placeholders/bridal_21_3.png',
            '/images/placeholders/bridal_21_4.png'
        ],
        description: 'Blush and silver walima special. Soft, dreamy, and ethereal.',
        color: 'Blush & Silver',
        fabric: 'Organza',
        details: 'Silver crystal work on a blush pink base.'
    },
    {
        id: '22',
        slug: 'mahnoor',
        title: 'Mahnoor',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_22_1.png',
            '/images/placeholders/bridal_22_2.png',
            '/images/placeholders/bridal_22_3.png',
            '/images/placeholders/bridal_22_4.png'
        ],
        description: 'Black and gold majestic bridal. For the bold and beautiful.',
        color: 'Black & Gold',
        fabric: 'Velvet',
        details: 'Heavy gold embroidery on jet black velvet.'
    },
    {
        id: '23',
        slug: 'zarlish',
        title: 'Zarlish',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_23_1.png',
            '/images/placeholders/bridal_23_2.png',
            '/images/placeholders/bridal_23_3.png',
            '/images/placeholders/bridal_23_4.png'
        ],
        description: 'Peacock blue elegance. A unique and vibrant choice.',
        color: 'Peacock Blue',
        fabric: 'Raw Silk',
        details: 'Multicolor thread work inspired by peacock feathers.'
    },
    {
        id: '24',
        slug: 'ayesha',
        title: 'Ayesha',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_24_1.png',
            '/images/placeholders/bridal_24_2.png',
            '/images/placeholders/bridal_24_3.png',
            '/images/placeholders/bridal_24_4.png'
        ],
        description: 'Traditional red perfection. The classic bridal look.',
        color: 'Classic Red',
        fabric: 'Jamawar',
        details: 'Traditional zardozi work on a red base.'
    },
    {
        id: '25',
        slug: 'huma',
        title: 'Huma',
        category: 'Bridal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/bridal_25_1.png',
            '/images/placeholders/bridal_25_2.png',
            '/images/placeholders/bridal_25_3.png',
            '/images/placeholders/bridal_25_4.png'
        ],
        description: 'White and pearl sophistication. Pure and angelic.',
        color: 'White & Pearl',
        fabric: 'Net',
        details: 'Pearl and stone work on a white base.'
    },
    {
        id: '101',
        slug: 'mian-sahib-aur-begum-sahiba',
        title: 'Mian Sahib Aur Begum Sahiba',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_1_1.png',
            '/images/placeholders/wedding_1_2.png',
            '/images/placeholders/wedding_1_3.png',
            '/images/placeholders/wedding_1_4.png'
        ],
        description: 'A classic red and gold duo. Bride in a heavy zardozi red lehenga, Groom in a matching cream sherwani with red turban.',
        color: 'Classic Red & Cream',
        fabric: 'Velvet & Jamawar',
        details: 'Traditional hand-embroidery featuring peacocks and floral vines.'
    },
    {
        id: '102',
        slug: 'nikah-e-noor',
        title: 'Nikah-e-Noor',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_2_1.png',
            '/images/placeholders/wedding_2_2.png',
            '/images/placeholders/wedding_2_3.png',
            '/images/placeholders/wedding_2_4.png'
        ],
        description: 'Pristine white and gold for the sacred union. Minimalist yet luxurious.',
        color: 'White & Gold',
        fabric: 'Chiffon & Raw Silk',
        details: 'Self-on-self embroidery with delicate pearl accents.'
    },
    {
        id: '103',
        slug: 'zaujain-royale',
        title: 'Zaujain Royale',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_3_1.png',
            '/images/placeholders/wedding_3_2.png',
            '/images/placeholders/wedding_3_3.png',
            '/images/placeholders/wedding_3_4.png'
        ],
        description: 'Regal maroon and antique gold. A power couple look with heavy embellishments.',
        color: 'Maroon & Antique Gold',
        fabric: 'Velvet',
        details: 'Antique dabka work on deep maroon velvet.'
    },
    {
        id: '104',
        slug: 'shehnai-heritage',
        title: 'Shehnai Heritage',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_4_1.png',
            '/images/placeholders/wedding_4_2.png',
            '/images/placeholders/wedding_4_3.png',
            '/images/placeholders/wedding_4_4.png'
        ],
        description: 'Rust and beige combination reflecting the warmth of heritage.',
        color: 'Rust & Beige',
        fabric: 'Organza & Silk',
        details: 'Gotta patti work on rust organza paired with a beige jamawar sherwani.'
    },
    {
        id: '105',
        slug: 'mehfil-e-ishq',
        title: 'Mehfil-e-Ishq',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_5_1.png',
            '/images/placeholders/wedding_5_2.png',
            '/images/placeholders/wedding_5_3.png',
            '/images/placeholders/wedding_5_4.png'
        ],
        description: 'Emerald green and gold splendor. Rich, vibrant, and unforgettable.',
        color: 'Emerald Green & Gold',
        fabric: 'Raw Silk',
        details: 'Gold threadwork on emerald green silk.'
    },
    {
        id: '106',
        slug: 'shahi-jora',
        title: 'Shahi Jora',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_6_1.png',
            '/images/placeholders/wedding_6_2.png',
            '/images/placeholders/wedding_6_3.png',
            '/images/placeholders/wedding_6_4.png'
        ],
        description: 'Deep teal and gold. A modern twist on traditional grandeur.',
        color: 'Deep Teal & Gold',
        fabric: 'Velvet',
        details: 'Intricate zardozi patterns on a teal base.'
    },
    {
        id: '107',
        slug: 'valima-special',
        title: 'Valima Special',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_7_1.png',
            '/images/placeholders/wedding_7_2.png',
            '/images/placeholders/wedding_7_3.png',
            '/images/placeholders/wedding_7_4.png'
        ],
        description: 'Ivory and champagne elegance. Soft, romantic, and sophisticated.',
        color: 'Ivory & Champagne',
        fabric: 'Tissue & Net',
        details: 'Crystal and sequin work for a shimmering effect.'
    },
    {
        id: '108',
        slug: 'blush-promise',
        title: 'Blush Promise',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_8_1.png',
            '/images/placeholders/wedding_8_2.png',
            '/images/placeholders/wedding_8_3.png',
            '/images/placeholders/wedding_8_4.png'
        ],
        description: 'Blush pink and ivory. A fairytale look for the soft-hued wedding.',
        color: 'Blush Pink & Ivory',
        fabric: 'Organza',
        details: 'Floral motifs in pastel threads.'
    },
    {
        id: '109',
        slug: 'silver-lining',
        title: 'Silver Lining',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_9_1.png',
            '/images/placeholders/wedding_9_2.png',
            '/images/placeholders/wedding_9_3.png',
            '/images/placeholders/wedding_9_4.png'
        ],
        description: 'Champagne and silver. A monochromatic metallic masterpiece.',
        color: 'Champagne & Silver',
        fabric: 'Tissue Silk',
        details: 'Heavy silver zardozi work.'
    },
    {
        id: '110',
        slug: 'midnight-majesty',
        title: 'Midnight Majesty',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_10_1.png',
            '/images/placeholders/wedding_10_2.png',
            '/images/placeholders/wedding_10_3.png',
            '/images/placeholders/wedding_10_4.png'
        ],
        description: 'Midnight blue and silver. Deep, mysterious, and incredibly chic.',
        color: 'Midnight Blue',
        fabric: 'Velvet',
        details: 'Silver threadwork on dark blue velvet.'
    },
    {
        id: '111',
        slug: 'golden-glitch',
        title: 'Golden Era',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_11_1.png',
            '/images/placeholders/wedding_11_2.png',
            '/images/placeholders/wedding_11_3.png',
            '/images/placeholders/wedding_11_4.png'
        ],
        description: 'Pewter and Gold. An unusual but striking metallic combination.',
        color: 'Pewter & Gold',
        fabric: 'Tissue',
        details: 'Mixed metal embroidery.'
    },
    {
        id: '112',
        slug: 'mehndi-rang',
        title: 'Mehndi Rang',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_12_1.png',
            '/images/placeholders/wedding_12_2.png',
            '/images/placeholders/wedding_12_3.png',
            '/images/placeholders/wedding_12_4.png'
        ],
        description: 'Mustard and Gold. Traditional vibrancy perfect for Mehndi.',
        color: 'Mustard & Gold',
        fabric: 'Raw Silk',
        details: 'Gotta and mirror work.'
    },
    {
        id: '113',
        slug: 'lilac-lavish',
        title: 'Lilac Lavish',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_13_1.png',
            '/images/placeholders/wedding_13_2.png',
            '/images/placeholders/wedding_13_3.png',
            '/images/placeholders/wedding_13_4.png'
        ],
        description: 'Lavender and Silver. A soft, trendy pastel choice.',
        color: 'Lavender',
        fabric: 'Net',
        details: 'Silver pearls and stones.'
    },
    {
        id: '114',
        slug: 'noir-luxe',
        title: 'Noir Luxe',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_14_1.png',
            '/images/placeholders/wedding_14_2.png',
            '/images/placeholders/wedding_14_3.png',
            '/images/placeholders/wedding_14_4.png'
        ],
        description: 'Black and Gold. For the bold couple who breaks design norms.',
        color: 'Black & Gold',
        fabric: 'Velvet',
        details: 'Gold embroidery popping against jet black.'
    },
    {
        id: '115',
        slug: 'coral-cove',
        title: 'Coral Cove',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_15_1.png',
            '/images/placeholders/wedding_15_2.png',
            '/images/placeholders/wedding_15_3.png',
            '/images/placeholders/wedding_15_4.png'
        ],
        description: 'Coral and Gold. Fresh, warm, and inviting.',
        color: 'Coral',
        fabric: 'Chiffon',
        details: 'Intricate gold threadwork.'
    },
    {
        id: '116',
        slug: 'turquoise-treasure',
        title: 'Turquoise Treasure',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_16_1.png',
            '/images/placeholders/wedding_16_2.png',
            '/images/placeholders/wedding_16_3.png',
            '/images/placeholders/wedding_16_4.png'
        ],
        description: 'Turquoise and Silver. A cool tone masterpiece.',
        color: 'Turquoise',
        fabric: 'Jamawar',
        details: 'Silver zardozi work.'
    },
    {
        id: '117',
        slug: 'rose-gold-reverie',
        title: 'Rose Gold Reverie',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_17_1.png',
            '/images/placeholders/wedding_17_2.png',
            '/images/placeholders/wedding_17_3.png',
            '/images/placeholders/wedding_17_4.png'
        ],
        description: 'Rose Gold and Beige. Subtle luxury at its finest.',
        color: 'Rose Gold',
        fabric: 'Tissue',
        details: 'Rose gold sequins.'
    },
    {
        id: '118',
        slug: 'purple-passion',
        title: 'Purple Passion',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_18_1.png',
            '/images/placeholders/wedding_18_2.png',
            '/images/placeholders/wedding_18_3.png',
            '/images/placeholders/wedding_18_4.png'
        ],
        description: 'Deep Purple and Gold. Regal and commanding.',
        color: 'Deep Purple',
        fabric: 'Velvet',
        details: 'Heavy gold embellishments.'
    },
    {
        id: '119',
        slug: 'ice-blue-illusion',
        title: 'Ice Blue Illusion',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_19_1.png',
            '/images/placeholders/wedding_19_2.png',
            '/images/placeholders/wedding_19_3.png',
            '/images/placeholders/wedding_19_4.png'
        ],
        description: 'Ice Blue and Silver. A winter wonderland look.',
        color: 'Ice Blue',
        fabric: 'Net',
        details: 'Silver crystals and beadwork.'
    },
    {
        id: '120',
        slug: 'pastal-harmony',
        title: 'Pastel Harmony',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_20_1.png',
            '/images/placeholders/wedding_20_2.png',
            '/images/placeholders/wedding_20_3.png',
            '/images/placeholders/wedding_20_4.png'
        ],
        description: 'Mint Green and Pink. A harmonious pastel duo.',
        color: 'Mint & Pink',
        fabric: 'Organza',
        details: 'Multicolor floral threadwork.'
    },
    {
        id: '121',
        slug: 'copper-couture',
        title: 'Copper Couture',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_21_1.png',
            '/images/placeholders/wedding_21_2.png',
            '/images/placeholders/wedding_21_3.png',
            '/images/placeholders/wedding_21_4.png'
        ],
        description: 'Copper and Brown. Earthy, rich, and unique.',
        color: 'Copper',
        fabric: 'Tissue',
        details: 'Antique copper work.'
    },
    {
        id: '122',
        slug: 'nikkah-white',
        title: 'Nikkah White',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_22_1.png',
            '/images/placeholders/wedding_22_2.png',
            '/images/placeholders/wedding_22_3.png',
            '/images/placeholders/wedding_22_4.png'
        ],
        description: 'Pure White and Gold. The traditional Nikkah aesthetic.',
        color: 'White',
        fabric: 'Chiffon',
        details: 'Minimal gold borders.'
    },
    {
        id: '123',
        slug: 'peach-perfect',
        title: 'Peach Perfect',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_23_1.png',
            '/images/placeholders/wedding_23_2.png',
            '/images/placeholders/wedding_23_3.png',
            '/images/placeholders/wedding_23_4.png'
        ],
        description: 'Peach and Silver. Warm and glowing.',
        color: 'Peach',
        fabric: 'Net',
        details: 'Silver embroidery.'
    },
    {
        id: '124',
        slug: 'grey-grace',
        title: 'Grey Grace',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_24_1.png',
            '/images/placeholders/wedding_24_2.png',
            '/images/placeholders/wedding_24_3.png',
            '/images/placeholders/wedding_24_4.png'
        ],
        description: 'Grey and Silver. Modern sophistication.',
        color: 'Grey',
        fabric: 'Organza',
        details: 'Silver glitter work.'
    },
    {
        id: '125',
        slug: 'olive-oasis',
        title: 'Olive Oasis',
        category: 'Wedding',
        price: 'Price on Request',
        images: [
            '/images/placeholders/wedding_25_1.png',
            '/images/placeholders/wedding_25_2.png',
            '/images/placeholders/wedding_25_3.png',
            '/images/placeholders/wedding_25_4.png'
        ],
        description: 'Olive Green and Gold. Deep and traditional.',
        color: 'Olive Green',
        fabric: 'Raw Silk',
        details: 'Dull gold antique embroidery.'
    },
    // Formal Edit
    {
        id: '201',
        slug: 'emerald-pishwas',
        title: 'Emerald Pishwas',
        category: 'Formal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/formal_1_1.png',
            '/images/placeholders/formal_1_2.png',
            '/images/placeholders/formal_1_3.png',
            '/images/placeholders/formal_1_4.png'
        ],
        description: 'A stunning emerald green pishwas with intricate gold embroidery.',
        color: 'Emerald Green',
        fabric: 'Chiffon',
        details: 'Hand-embellished bodice and sleeves.'
    },
    {
        id: '202',
        slug: 'ivory-kalidaar',
        title: 'Ivory Kalidaar',
        category: 'Formal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/formal_2_1.png',
            '/images/placeholders/formal_2_2.png',
            '/images/placeholders/formal_2_3.png',
            '/images/placeholders/formal_2_4.png'
        ],
        description: 'Elegant ivory kalidaar with silver accents.',
        color: 'Ivory',
        fabric: 'Raw Silk',
        details: 'Silver zardozi work on the neckline.'
    },
    {
        id: '203',
        slug: 'teal-silk-set',
        title: 'Teal Silk Set',
        category: 'Formal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/formal_3_1.png',
            '/images/placeholders/formal_3_2.png',
            '/images/placeholders/formal_3_3.png',
            '/images/placeholders/formal_3_4.png'
        ],
        description: 'A rich teal silk set perfect for evening soirees.',
        color: 'Teal',
        fabric: 'Silk',
        details: 'Contemporary cut with traditional embroidery.'
    },
    {
        id: '204',
        slug: 'champagne-maxi',
        title: 'Champagne Maxi',
        category: 'Formal',
        price: 'Price on Request',
        images: [
            '/images/placeholders/formal_4_1.png',
            '/images/placeholders/formal_4_2.png',
            '/images/placeholders/formal_4_3.png',
            '/images/placeholders/formal_4_4.png'
        ],
        description: 'Flowy champagne maxi dress with sequins.',
        color: 'Champagne',
        fabric: 'Net',
        details: 'All-over sequin spray.'
    },
    // Menswear
    {
        id: '301',
        slug: 'midnight-blue-sherwani',
        title: 'Midnight Blue Sherwani',
        category: 'Menswear',
        price: 'Price on Request',
        images: [
            '/images/placeholders/mens_1_1.png',
            '/images/placeholders/mens_1_2.png',
            '/images/placeholders/mens_1_3.png',
            '/images/placeholders/mens_1_4.png'
        ],
        description: 'Classic midnight blue sherwani with antique gold buttons.',
        color: 'Midnight Blue',
        fabric: 'Jamawar',
        details: 'Structured fit with hand-finished details.'
    },
    {
        id: '302',
        slug: 'ivory-silk-kurta-set',
        title: 'Ivory Silk Kurta Set',
        category: 'Menswear',
        price: 'Price on Request',
        images: [
            '/images/placeholders/mens_2_1.png',
            '/images/placeholders/mens_2_2.png',
            '/images/placeholders/mens_2_3.png',
            '/images/placeholders/mens_2_4.png'
        ],
        description: 'Timeless ivory silk kurta set.',
        color: 'Ivory',
        fabric: 'Raw Silk',
        details: 'Subtle self-embroidery on the collar.'
    },
    {
        id: '303',
        slug: 'noir-velvet-bandhgala',
        title: 'Noir Velvet Bandhgala',
        category: 'Menswear',
        price: 'Price on Request',
        images: [
            '/images/placeholders/mens_3_1.png',
            '/images/placeholders/mens_3_2.png',
            '/images/placeholders/mens_3_3.png',
            '/images/placeholders/mens_3_4.png'
        ],
        description: 'Sophisticated black velvet bandhgala jacket.',
        color: 'Black',
        fabric: 'Velvet',
        details: 'Premium velvet with gold buttons.'
    },
    // Little Ones
    {
        id: '401',
        slug: 'miniature-pink-angrakha',
        title: 'Miniature Pink Angrakha',
        category: 'Little Ones',
        price: 'Price on Request',
        images: [
            '/images/placeholders/kids_1_1.png',
            '/images/placeholders/kids_1_2.png',
            '/images/placeholders/kids_1_3.png',
            '/images/placeholders/kids_1_4.png'
        ],
        description: 'Adorable pink angrakha for little princesses.',
        color: 'Pink',
        fabric: 'Chiffon',
        details: 'Soft lining and comfortable fit.'
    },
    {
        id: '402',
        slug: 'ivory-gold-lehenga-kids',
        title: 'Ivory & Gold Lehenga',
        category: 'Little Ones',
        price: 'Price on Request',
        images: [
            '/images/placeholders/kids_2_1.png',
            '/images/placeholders/kids_2_2.png',
            '/images/placeholders/kids_2_3.png',
            '/images/placeholders/kids_2_4.png'
        ],
        description: 'Miniature version of our classic ivory lehenga.',
        color: 'Ivory & Gold',
        fabric: 'Net',
        details: 'Lightweight embellishments for kids.'
    }
];
