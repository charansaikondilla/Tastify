import React from 'react';
import { PhoneIcon, MapPinIcon, ShareIcon, InstagramIcon } from './Icons';

const ActionFooter: React.FC = () => {
    const actions = [
        { name: 'Call', icon: <PhoneIcon className="w-6 h-6" />, href: 'tel:+911234567890' },
        { name: 'Directions', icon: <MapPinIcon className="w-6 h-6" />, href: 'https://maps.google.com' },
        { name: 'Share', icon: <ShareIcon className="w-6 h-6" />, href: '#' }, // Share API logic can be added here
        { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, href: 'https://instagram.com' },
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 floating-footer safe-area-bottom">
            <div className="flex justify-around items-center h-14 sm:h-16 max-w-lg mx-auto px-safe">
                {actions.map((action) => (
                    <a
                        key={action.name}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-slate-600 hover:text-red-500 active:text-red-600 active:scale-95 transition-all w-1/4 py-2"
                    >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                            {action.icon}
                        </div>
                        <span className="text-[0.65rem] sm:text-xs mt-0.5 sm:mt-1 font-medium truncate max-w-full px-1">{action.name}</span>
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default ActionFooter;