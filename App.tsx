import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { MenuItem, Category, Offer, SubCategory } from './types';
import { Dietary } from './types';
import { fetchMenuData } from './services/menuService';
import Hero from './components/Hero';
import OfferHighlight from './components/OfferHighlight';
import FilterBar from './components/FilterBar';
import MenuGrid from './components/MenuGrid';
import ActionFooter from './components/ActionFooter';
import ItemDetailModal from './components/ItemDetailModal';
import Loader from './components/Loader';
import AISearch from './components/AISearch';
import EmberfallOverlay from './components/EmberfallOverlay';
import { SearchIcon } from './components/Icons';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [allItems, setAllItems] = useState<MenuItem[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
    const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | 'All'>('All');
    const [activeDietary, setActiveDietary] = useState<Dietary>(Dietary.All);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
    const [aiRecommendedIds, setAiRecommendedIds] = useState<number[] | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { menu, offers: fetchedOffers } = await fetchMenuData();
                setAllItems(menu);
                setOffers(fetchedOffers);
            } catch (error) {
                console.error("Failed to fetch menu data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();

        const savedFavorites = localStorage.getItem('tastifyFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tastifyFavorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const handleAiSearch = async () => {
        if (!searchQuery.trim() || isAiLoading) return;
        
        setIsAiLoading(true);
        setAiRecommendedIds(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const simplifiedMenu = allItems.map(({ id, name, description, category, subCategory, dietary, spiceLevel }) => 
                ({ id, name, description, category, subCategory, dietary, spiceLevel }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on my request: "${searchQuery}", please recommend dishes from the following menu: ${JSON.stringify(simplifiedMenu)}. Return the IDs of the recommended dishes.`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            recommended_ids: {
                                type: Type.ARRAY,
                                description: 'List of recommended menu item IDs.',
                                items: { type: Type.NUMBER }
                            }
                        },
                        required: ['recommended_ids'],
                    }
                }
            });

            const responseJson = JSON.parse(response.text);
            if (responseJson.recommended_ids) {
                setAiRecommendedIds(responseJson.recommended_ids);
            }

        } catch (error) {
            console.error("AI search failed:", error);
            // Optionally, show an error to the user
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleFilterChange = useCallback((category: Category | 'All', subCategory: SubCategory | 'All', dietary: Dietary) => {
        setActiveCategory(category);
        setActiveSubCategory(subCategory);
        setActiveDietary(dietary);
        setAiRecommendedIds(null); // Clear AI results when manual filters are used
    }, []);

    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    }, []);

    const filteredItems = useMemo(() => {
        if (aiRecommendedIds !== null) {
            const recommendedSet = new Set(aiRecommendedIds);
            return allItems.filter(item => recommendedSet.has(item.id));
        }

        return allItems.filter(item => {
            const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
            const subCategoryMatch = activeCategory === 'All' || activeSubCategory === 'All' || item.subCategory === activeSubCategory;
            const dietaryMatch = activeDietary === Dietary.All || item.dietary === activeDietary;
            const searchMatch = searchQuery.trim() === '' ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && subCategoryMatch && dietaryMatch && searchMatch;
        });
    }, [allItems, activeCategory, activeSubCategory, activeDietary, searchQuery, aiRecommendedIds]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <EmberfallOverlay />
            <main className="pb-16 sm:pb-20 relative z-10">
                <Hero />
                <OfferHighlight offers={offers} />
                <AISearch 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    onAiSearch={handleAiSearch}
                    isLoading={isAiLoading}
                />
                 {aiRecommendedIds !== null && (
                    <div className="px-4 mb-4 text-center animate-fade-in-up">
                        <h2 className="text-xl font-bold text-slate-800">✨ AI Recommendations</h2>
                        <button 
                            onClick={() => setAiRecommendedIds(null)}
                            className="mt-1 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                        >
                           Clear Results
                        </button>
                    </div>
                )}
                <FilterBar
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    activeDietary={activeDietary}
                    onFilterChange={handleFilterChange}
                    disabled={aiRecommendedIds !== null}
                />
                <MenuGrid
                    items={filteredItems}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onSelectItem={setSelectedItem}
                    isAiFiltered={aiRecommendedIds !== null}
                />
            </main>
            <ActionFooter />
            {selectedItem && (
                <ItemDetailModal
                    item={selectedItem}
                    isFavorite={favorites.includes(selectedItem.id)}
                    onClose={() => setSelectedItem(null)}
                    onToggleFavorite={toggleFavorite}
                />
            )}
        </div>
    );
};

export default App;