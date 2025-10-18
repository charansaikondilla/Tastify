import React from 'react';
import type { MenuItem } from '../types';
import { Dietary } from '../types';
import { HeartIcon, StarIcon, XMarkIcon } from './Icons';

interface ItemDetailModalProps {
    item: MenuItem;
    isFavorite: boolean;
    onClose: () => void;
    onToggleFavorite: (id: number) => void;
}

const SpiceLevelDetail: React.FC<{ level: number }> = ({ level }) => {
    if (level === 0) return <div className="text-slate-500">Non-Spicy</div>;
    return (
        <div className="flex items-center space-x-1 text-red-500">
            {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`text-2xl ${i < level ? 'opacity-100' : 'opacity-20'}`}>🌶️</span>
            ))}
            <span className="ml-2 font-medium">{['Mild', 'Medium', 'Hot'][level - 1]}</span>
        </div>
    );
};


const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, isFavorite, onClose, onToggleFavorite }) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(item.id);
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm modal-overlay"
            onClick={onClose}
        >
            <div
                className="bg-white border border-slate-200 rounded-2xl w-full max-w-md max-h-[92vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl shadow-slate-900/10 relative animate-fade-in modal-content"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative">
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-56 sm:h-64 object-cover rounded-t-2xl" 
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/40 backdrop-blur-sm p-2.5 sm:p-2 rounded-full text-white hover:bg-black/60 active:scale-95 transition-all z-10 shadow-lg"
                    >
                        <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 -mt-12 sm:-mt-16 relative z-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">{item.name}</h2>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 text-slate-700">
                        <div className="flex items-center flex-wrap gap-2 sm:gap-4">
                            <div className="flex items-center bg-amber-400/10 text-amber-500 px-2 py-1 rounded-full border border-amber-400/20">
                                <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mr-1" />
                                <span className="text-sm sm:text-base font-semibold">{item.rating.toFixed(1)}</span>
                            </div>
                             <div className="flex items-center">
                                 <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full mr-1.5 sm:mr-2 border-2 ${item.dietary === Dietary.Veg ? 'bg-green-500 border-green-300/50' : 'bg-red-500 border-red-300/50'}`}></span>
                                 <span className="font-medium text-xs sm:text-sm">{item.dietary === Dietary.Veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                            </div>
                        </div>
                        <span className="text-2xl sm:text-3xl font-bold text-red-500">₹{item.price}</span>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{item.description}</p>
                    
                    <div className="bg-slate-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-slate-200">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-500 mb-2">Spice Level</h4>
                        <SpiceLevelDetail level={item.spiceLevel} />
                    </div>

                    <button
                        onClick={handleFavoriteClick}
                        className={`w-full flex items-center justify-center py-3 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg transition-all active:scale-95 ${
                            isFavorite
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                    >
                        <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ItemDetailModal;