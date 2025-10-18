import React from 'react';

const Hero: React.FC = () => {
    const scrollToMenu = () => {
        document.getElementById('ai-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="relative h-96 sm:h-[28rem] text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                style={{ backgroundImage: "url('https://picsum.photos/seed/restaurant-dark/1200/800')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 safe-area-top">
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg">
                        <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                           Tastify
                           <span className="absolute -inset-1 animate-text-shimmer"></span>
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-700 mt-2 max-w-md mx-auto drop-shadow-sm px-4">
                        Discover flavors that tell a story. Welcome to a new era of taste.
                    </p>
                </div>

                <div className="mt-6 sm:mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={scrollToMenu}
                        className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full shadow-lg shadow-red-500/30 transition-all transform hover:scale-105"
                    >
                        View Full Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;