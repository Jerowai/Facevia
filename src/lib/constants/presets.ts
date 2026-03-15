export interface Preset {
    id: string;
    name: string;
    label: string;
    image: string;
    icon: string;
    promptTemplate: string;
    isTrending?: boolean;
    isRecommended?: boolean;
}

export const PHOTO_PRESETS: Preset[] = [
    {
        id: 'rooftop',
        name: 'Tinder Rooftop',
        label: 'Sunset',
        icon: '🌆',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A professional cinematic portrait of @USER_TRIGGER, standing on a modern city rooftop at sunset, blurred skyline background, soft golden hour lighting, 85mm lens, high fashion editorial dating profile photo, highly detailed face",
        isTrending: true
    },
    {
        id: 'beach',
        name: 'Beach Sunset',
        label: 'Nature',
        icon: '🌅',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A candid lifestyle portrait of @USER_TRIGGER on a beautiful sandy beach at golden hour, ocean waves in the background, casual stylish summer clothing, wind subtly blowing hair, warm cinematic lighting, looking directly at camera, 50mm lens, Tinder profile photo",
        isRecommended: true
    },
    {
        id: 'coffee',
        name: 'Cafe Lifestyle',
        label: 'Casual',
        icon: '☕',
        image: 'https://images.unsplash.com/photo-1512152329560-c9e9b042f72a?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A candid lifestyle shot of @USER_TRIGGER sitting in an aesthetic hipster coffee shop, holding a ceramic coffee cup, smiling naturally, bokeh background with warm indoor lighting, stylish casual outfit, photorealistic dating app photo"
    },
    {
        id: 'night_city',
        name: 'Night City',
        label: 'Urban',
        icon: '🌙',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A stylish night portrait of @USER_TRIGGER walking in a busy metropolitan city, illuminated by colorful neon street lights, cyberpunk cyberpunk aesthetic, wearing a fashionable jacket, shallow depth of field, cinematic night photography"
    },
    {
        id: 'luxury',
        name: 'Luxury Dinner',
        label: 'Premium',
        icon: '🥂',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "An elegant evening portrait of @USER_TRIGGER sitting at a table in a Michelin-star luxury restaurant, dressed in sharp smart-casual evening wear, glass of wine on table, dim romantic ambient lighting, soft focus background, high-end dating profile photo",
        isRecommended: true
    },
    {
        id: 'travel',
        name: 'Travel Shot',
        label: 'Adventure',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "An adventurous travel portrait of @USER_TRIGGER walking down a cobblestone street in Europe, wearing fashionable streetwear, shallow depth of field, natural sunlight, cinematic street photography, confident and approachable smile",
        isTrending: true
    },
    {
        id: 'gym',
        name: 'Gym',
        label: 'Fitness',
        icon: '🏋️',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A high-quality fitness portrait of @USER_TRIGGER taking a break at a modern luxury gym, slight sweat, athletic stylish gym wear, dramatic gym lighting, black mood tones, strong jawline, confident posture, fitness model photography"
    },
    {
        id: 'restaurant',
        name: 'Restaurant',
        label: 'Social',
        icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A social lifestyle portrait of @USER_TRIGGER at an upscale restaurant, natural social setting, soft ambient lighting, high quality dating profile photo"
    }
];
