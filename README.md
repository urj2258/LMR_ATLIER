# LMR ATELIER | Luxury Pakistani Couture

![LMR ATELIER Banner](https://placehold.co/1200x400/121212/bd870a?text=LMR+ATELIER)

> **Handcrafted Luxury Karhai - A heritage of artisanal excellence.**

**LMR ATELIER** is a high-end digital boutique dedicated to the fine art of Pakistani couture. This platform bridges the gap between traditional craftsmanship and modern digital accessibility, bringing the exquisite "Karhai" work of our heritage directly to a global audience.

---

## 🌟 The Vision

*“Honoring the past, dressing the future.”*

This project is a labor of love, born from the desire to expand a lifelong commitment to the fashion business. By digitalizing the atelier, we are ensuring that the intricate handcrafted details and the heritage of our artisans are preserved and celebrated in the modern era.

---

## ✨ Features

### 🏛️ Exquisite Collections
- **Bridal Edit**: Timeless elegance and grandeur for the modern bride.
- **Wedding Edit**: Sophisticated silhouettes for every festive ceremony.
- **Formal Edit**: Luxury evening wear featuring intricate hand-embellishment.
- **Menswear**: Traditional Sherwanis and Kurtas with a contemporary edge.
- **Little Ones**: Delightful miniature couture for the youngest members of the family.

### 🖼️ Visual Experience
- **High-Definition Galleries**: Immersive product views powered by **Cloudinary**.
- **Dynamic Interaction**: Hover effects for fabric detail and smooth mobile swipers.
- **Resilient UI**: Intelligent image sanitization ensures no broken icons, falling back to an elegant placeholder for coming-soon items.

### 🔐 Secure Administration
- **Admin Portal**: A dedicated workspace for catalog management.
- **Product Editor**: Full-featured UI to manage titles, prices, descriptions, and dynamic slugs.
- **Gallery Manager**: Drag-and-drop image reordering, primary thumbnail selection, and multi-file uploads.

### 💬 Direct Consultations
- **WhatsApp Integration**: Every product page features a direct link to our consultants, pre-filled with the product's SKU and title for seamless inquiry.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [Framer Motion](https://www.framer.com/motion/)
- **Database/Auth**: [Firebase](https://firebase.google.com/) (Realtime Database & Admin SDK)
- **Media**: [Cloudinary](https://cloudinary.com/) (Image hosting & transformation)
- **Utilities**: [Slugify](https://www.npmjs.com/package/slugify) (Canonical URL generation)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 20.x or higher
- **Python**: 3.8+ (for data management scripts)
- **Firebase Project**: Service account keys required for server-side operations.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/urj2258/LMR_ATLIER.git
   cd LMR_ATLIER
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Install Python requirements**:
   ```bash
   pip install requests
   ```

4. **Configuration**:
   Ensure your environment variables are configured for Firebase, Cloudinary, and Admin access.

5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📦 Data Management

The project includes a suite of Python scripts to manage the product catalog directly from local asset folders.

### Automated Image Resync
If images are updated in your local product directory, run the resync utility (requires administrative authorization):
```powershell
python scripts/resync_product_images.py --live
```

### Script Directory:
- `upload_products.py`: Initial migration from folder structure to database.
- `resync_product_images.py`: Updates existing products with full gallery uploads.
- `prune_products_not_in_folders.py`: Cleans the database of junk or test entries.
- `migrate_slugs.py`: Normalizes all product URLs to the latest canonical format.

---

## 📁 Project Structure

```text
├── public/             # Static assets (logo, placeholders)
├── scripts/            # Python data & migration tools
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # UI Components (Storefront & Admin)
│   ├── utils/          # Database, Slugify, & Image helpers
│   └── styles/         # Global design tokens & CSS
├── .gitignore          # Configured to ignore large asset folders (LMR/)
└── next.config.ts      # Optimized Next.js configuration
```

---

## 🎨 Admin Portal

The Admin Portal is accessible at `/admin`. It provides a "portal within a portal" experience:
- **Dashboard**: High-level stats on products and categories.
- **Product Management**: Full CRUD operations with a premium editing interface.
- **Category Management**: Organize collections and sub-collections.

---

*Crafted with passion for LMR ATELIER.*
