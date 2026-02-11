import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-12 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    <div className="space-y-6">
                        <Link href="/" className="flex flex-col items-start group">
                            <span className="text-4xl md:text-6xl font-serif tracking-[0.2em] leading-tight text-white uppercase group-hover:text-gold-champagne transition-colors">
                                LMR
                            </span>
                            <span className="text-[12px] md:text-[14px] font-sans tracking-[0.6em] text-gold-champagne uppercase -mt-2 ml-1 font-bold">
                                ATELIER
                            </span>
                        </Link>
                        <p className="text-sm opacity-70 leading-relaxed max-w-xs font-light">
                            Redefining luxury since 1996. A legacy of unmatched heritage and artisanal excellence in Pakistani couture.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-gold-champagne text-xs font-bold uppercase tracking-[0.2em]">Collections</h3>
                        <ul className="space-y-4 text-sm font-light opacity-80">
                            <li><Link href="/wedding" className="hover:text-gold-champagne transition-colors">Wedding Edit</Link></li>
                            <li><Link href="/bridal" className="hover:text-gold-champagne transition-colors">Bridal Edit</Link></li>
                            <li><Link href="/menswear" className="hover:text-gold-champagne transition-colors">Menswear</Link></li>
                            <li><Link href="/little-ones" className="hover:text-gold-champagne transition-colors">Little Ones</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-gold-champagne text-xs font-bold uppercase tracking-[0.2em]">Customer Care</h3>
                        <ul className="space-y-4 text-sm font-light opacity-80">
                            <li><Link href="/size-chart" className="hover:text-gold-champagne transition-colors">Size Chart</Link></li>
                            <li><Link href="/custom-orders" className="hover:text-gold-champagne transition-colors">Custom Orders</Link></li>
                            <li><Link href="/contact" className="hover:text-gold-champagne transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-gold-champagne text-xs font-bold uppercase tracking-[0.2em]">Follow Us</h3>
                        <div className="flex items-center gap-6 opacity-80">
                            <a href="#" className="hover:text-gold-champagne transition-colors">Instagram</a>
                            <a href="#" className="hover:text-gold-champagne transition-colors">Facebook</a>
                            <a href="https://wa.me/YOUR_NUMBER" className="flex items-center gap-2 text-gold-champagne hover:opacity-80 transition-opacity">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.397.015 12.03c0 2.12.553 4.189 1.603 6l-1.706 6.23 6.374-1.671a11.782 11.782 0 005.76 1.51h.005c6.636 0 12.032-5.396 12.035-12.032a11.762 11.762 0 00-3.483-8.503z" />
                                </svg>
                                <span className="text-[10px] uppercase tracking-widest font-bold">WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col items-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">
                        © {new Date().getFullYear()} LMR ATELIER. Handcrafted in Pakistan.
                    </p>
                </div>
            </div>
        </footer>
    );
}
