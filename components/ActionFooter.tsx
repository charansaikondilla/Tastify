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
        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-t border-slate-200">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {actions.map((action) => (
                    <a
                        key={action.name}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-slate-600 hover:text-red-500 transition-colors w-1/4"
                    >
                        {action.icon}
                        <span className="text-xs mt-1 font-medium">{action.name}</span>
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default ActionFooter;