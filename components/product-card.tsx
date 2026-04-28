import Link from 'next/link';
import { ArrowRight, Package2, MessageSquare } from 'lucide-react';
import { Product } from '@/lib/supabase';

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0] || 'https://images.pexels.com/photos/37116937/pexels-photo-37116937.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-brand hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-orange-50 block">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-semibold text-gray-800 px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> In Stock
        </span>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {product.categories?.name && (
          <p className="text-[11px] font-semibold text-brand uppercase tracking-wider mb-1">
            {product.categories.name}
          </p>
        )}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug text-[15px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">{product.price_range || 'Ask Price'}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Package2 className="w-3.5 h-3.5" /> MOQ: <span className="font-semibold text-gray-700">{product.min_order}</span>
        </div>
        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="text-center text-xs font-semibold px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-brand hover:text-brand transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/products/${product.slug}#quote`}
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 bg-brand hover:bg-orange-600 text-white rounded-md transition-colors"
          >
            <MessageSquare className="w-3 h-3" /> Inquiry
          </Link>
        </div>
        <p className="mt-2 text-[11px] text-gray-400 italic text-center">Yes! I am interested</p>
      </div>
    </div>
  );
}
