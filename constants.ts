import type { MenuItem, Offer, Category, SubCategory } from './types';
import { Dietary } from './types';

export const CATEGORIES: (Category | 'All')[] = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

export const SUB_CATEGORIES_MAP: Record<Category, (SubCategory | 'All')[]> = {
    'Starters': ['All', 'Tandoori', 'Soups'],
    'Main Course': ['All', 'Biryani', 'Curries', 'Chinese', 'Breads'],
    'Desserts': ['All', 'Cakes', 'Traditional'],
    'Drinks': ['All', 'Hot', 'Cold'],
};


export const OFFERS: Offer[] = [
    { 
        id: 1, 
        title: "Biryani Feast", 
        description: "An unbeatable combo for the discerning palate. Perfect for sharing.", 
        imageUrl: 'https://picsum.photos/seed/deal-biryani/800/600',
        items: ['Chicken Biryani', 'Mandi', 'Soft Drinks'],
        originalPrice: 750,
        discountedPrice: 599
    },
    { 
        id: 2, 
        title: "Tandoori Platter", 
        description: "A sizzling selection of our best tandoori starters.", 
        imageUrl: 'https://picsum.photos/seed/deal-tandoori/800/600',
        items: ['Paneer Tikka', 'Tandoori Chicken', 'Seekh Kebab'],
        originalPrice: 850,
        discountedPrice: 699
    },
    { 
        id: 3, 
        title: "Curry & Bread Combo", 
        description: "Your favorite curry paired with our freshly baked naan.", 
        imageUrl: 'https://picsum.photos/seed/deal-curry/800/600',
        items: ['Butter Chicken', 'Garlic Naan (x2)'],
        originalPrice: 480,
        discountedPrice: 399
    },
];

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        category: 'Starters',
        subCategory: 'Tandoori',
        name: 'Masala Papad',
        price: 80,
        description: 'Crispy papad topped with a spicy and tangy mixture of onions, tomatoes, and spices.',
        imageUrl: 'https://picsum.photos/seed/papad/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 1,
        rating: 4.2,
        offerFlag: 'Bestseller'
    },
    {
        id: 2,
        category: 'Starters',
        subCategory: 'Tandoori',
        name: 'Paneer Tikka',
        price: 250,
        description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
        imageUrl: 'https://picsum.photos/seed/paneer/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 2,
        rating: 4.8,
        offerFlag: "Chef's Pick"
    },
    {
        id: 3,
        category: 'Starters',
        subCategory: 'Soups',
        name: 'Tomato Soup',
        price: 150,
        description: 'A creamy and tangy soup made from fresh, ripe tomatoes and aromatic herbs.',
        imageUrl: 'https://picsum.photos/seed/tomatosoup/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.5,
    },
    {
        id: 4,
        category: 'Main Course',
        subCategory: 'Curries',
        name: 'Dal Makhani',
        price: 280,
        description: 'A classic North Indian dish made with black lentils, red kidney beans, butter, and cream.',
        imageUrl: 'https://picsum.photos/seed/dal/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 1,
        rating: 4.9,
        offerFlag: 'Bestseller'
    },
    {
        id: 5,
        category: 'Main Course',
        subCategory: 'Curries',
        name: 'Butter Chicken',
        price: 380,
        description: 'Grilled chicken cooked in a smooth, buttery, and creamy tomato-based gravy.',
        imageUrl: 'https://picsum.photos/seed/butterchicken/400/300',
        dietary: Dietary.NonVeg,
        spiceLevel: 1,
        rating: 4.9,
        offerFlag: "Chef's Pick"
    },
    {
        id: 6,
        category: 'Main Course',
        subCategory: 'Biryani',
        name: 'Chicken Biryani',
        price: 350,
        description: 'Aromatic basmati rice cooked with succulent chicken and a blend of exotic spices.',
        imageUrl: 'https://picsum.photos/seed/biryani/400/300',
        dietary: Dietary.NonVeg,
        spiceLevel: 2,
        rating: 4.8,
    },
    {
        id: 7,
        category: 'Main Course',
        subCategory: 'Chinese',
        name: 'Hakka Noodles',
        price: 220,
        description: 'Stir-fried noodles with a mix of fresh vegetables in a savory soy-based sauce.',
        imageUrl: 'https://picsum.photos/seed/noodles/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 1,
        rating: 4.4,
    },
    {
        id: 8,
        category: 'Main Course',
        subCategory: 'Breads',
        name: 'Garlic Naan',
        price: 100,
        description: 'Soft, fluffy Indian bread topped with fresh garlic and butter, baked in a tandoor.',
        imageUrl: 'https://picsum.photos/seed/naan/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.7,
    },
    {
        id: 9,
        category: 'Desserts',
        subCategory: 'Traditional',
        name: 'Gulab Jamun',
        price: 120,
        description: 'Soft, melt-in-your-mouth milk-solid-based sweets soaked in a fragrant sugar syrup.',
        imageUrl: 'https://picsum.photos/seed/gulabjamun/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.9,
        offerFlag: 'Bestseller'
    },
    {
        id: 10,
        category: 'Desserts',
        subCategory: 'Cakes',
        name: 'Chocolate Lava Cake',
        price: 180,
        description: 'A decadent chocolate cake with a gooey, molten chocolate center.',
        imageUrl: 'https://picsum.photos/seed/lavacake/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.8,
        offerFlag: 'New'
    },
    {
        id: 11,
        category: 'Drinks',
        subCategory: 'Hot',
        name: 'Masala Chai',
        price: 60,
        description: 'A classic Indian spiced tea that is aromatic and flavorful.',
        imageUrl: 'https://picsum.photos/seed/chai/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.7,
    },
    {
        id: 12,
        category: 'Drinks',
        subCategory: 'Cold',
        name: 'Mango Lassi',
        price: 140,
        description: 'A refreshing yogurt-based drink blended with sweet mango pulp.',
        imageUrl: 'https://picsum.photos/seed/lassi/400/300',
        dietary: Dietary.Veg,
        spiceLevel: 0,
        rating: 4.9,
        offerFlag: 'Special'
    }
];