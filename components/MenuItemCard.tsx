import React from 'react';
import type { MenuItem } from '../types';
import { Dietary } from '../types';
import { HeartIcon, StarIcon } from './Icons';

interface MenuItemCardProps {
    item: MenuItem;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onSelect: () => void;
}

const SpiceLevel: React.FC<{ level: number }> = ({ level }) => {
    if (level === 0) return null;
    return (
        <div className="flex items-center text-xs text-red-500">
            {Array.from({ length: level }).map((_, i) => (
                <span key={i}>🌶️</span>
            ))}
            <span className="ml-1 font-medium">{['Mild', 'Medium', 'Hot'][level - 1]}</span>
        </div>
    );
};

const OfferFlag: React.FC<{ flag?: string }> = ({ flag }) => {
    if (!flag) return null;
    let color = 'bg-blue-500';
    if (flag === 'Bestseller') color = 'bg-amber-500';
    if (flag === "Chef's Pick") color = 'bg-green-500';
    if (flag === 'New') color = 'bg-purple-500';
    return (
        <div className={`absolute top-3 -left-1 px-3 py-1 text-xs font-bold text-white ${color} rounded-r-full shadow-lg`}>
            {flag}
        </div>
    );
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, isFavorite, onToggleFavorite, onSelect }) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(item.id);
    };

    return (
        <div
            onClick={onSelect}
            className="relative bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:scale-[1.03] cursor-pointer flex flex-col h-full border border-slate-200 active:scale-[0.98]"
        >
            <div className="relative">
                <img 
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300" 
                    src={item.imageUrl} 
                    alt={item.name}
                    loading="lazy"
                />
                <OfferFlag flag={item.offerFlag} />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-2.5 sm:p-2 rounded-full text-white transition-all hover:bg-red-600 active:scale-95 shadow-lg"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                </button>
            </div>
            
            <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">{item.name}</h3>
                    <div className="flex items-center flex-shrink-0 bg-amber-400/10 text-amber-500 px-2 py-1 rounded-full border border-amber-400/20">
                        <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mr-0.5 sm:mr-1" />
                        <span className="text-xs sm:text-sm font-semibold">{item.rating.toFixed(1)}</span>
                    </div>
                </div>
                
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 mb-3">
                    <div className="flex items-center">
                         <span className={`w-3 h-3 rounded-full mr-1.5 border-2 ${item.dietary === Dietary.Veg ? 'bg-green-500 border-green-300/50' : 'bg-red-500 border-red-300/50'}`}></span>
                         <span className="whitespace-nowrap">{item.dietary === Dietary.Veg ? 'Veg' : 'Non-Veg'}</span>
                    </div>
                    <SpiceLevel level={item.spiceLevel} />
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-2 sm:line-clamp-3">{item.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mt-auto pt-3 border-t border-slate-100">
                     <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-600 text-xs font-medium bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">{item.category}</span>
                        <span className="text-red-500 text-xs font-medium bg-red-500/10 px-2 py-1 rounded-md whitespace-nowrap">{item.subCategory}</span>
                     </div>
                    <span className="text-xl sm:text-2xl font-bold text-red-500 whitespace-nowrap">₹{item.price}</span>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;