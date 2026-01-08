import { motion } from 'framer-motion';
import { ShoppingBag, Home, Coffee, Truck } from 'lucide-react';

export const PartnerTicker = () => {
    const partners = [
        { name: 'Rentomojo', offer: '50% off Furniture', icon: Home },
        { name: 'Zomato', offer: 'Free Gold Membership', icon: Coffee },
        { name: 'Urban Company', offer: '₹500 off Cleaning', icon: ShoppingBag },
        { name: 'Porter', offer: '20% off Moving', icon: Truck },
        { name: 'Amazon Books', offer: 'Buy 1 Get 1', icon: ShoppingBag },
    ];

    // Duplicate for infinite loop
    const tickerItems = [...partners, ...partners, ...partners];

    return (
        <div className="py-4 overflow-hidden border-y border-gray-100">
            <div className="relative flex items-center h-10">
                <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {tickerItems.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <div key={i} className="flex items-center gap-3 text-ink-400 hover:text-primary transition-colors cursor-pointer">
                                <Icon size={18} className="text-primary/70" />
                                <span className="font-bold uppercase tracking-wider text-sm">{p.name}</span>
                                <span className="text-xs bg-primary/5 px-2 py-1 rounded text-primary-600 font-medium border border-primary/10">{p.offer}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};
