export interface Preset {
    id: string;
    name: string;
    label: string;
    image: string;
    icon: string;
    promptTemplate: string;
}

export const PHOTO_PRESETS: Preset[] = [
    {
        id: 'rooftop',
        name: 'Tinder Rooftop',
        label: 'Urban Vibe',
        icon: '🌆',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A professional cinematic portrait of @USER_TRIGGER, standing on a modern city rooftop at sunset, blurred skyline background, soft golden hour lighting, 85mm lens, high fashion editorial dating profile photo, highly detailed face"
    },
    {
        id: 'beach',
        name: 'Beach Sunset',
        label: 'Summer Feel',
        icon: '🌅',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A candid lifestyle portrait of @USER_TRIGGER on a beautiful sandy beach at golden hour, ocean waves in the background, casual stylish summer clothing, wind subtly blowing hair, warm cinematic lighting, looking directly at camera, 50mm lens, Tinder profile photo"
    },
    {
        id: 'coffee',
        name: 'Coffee Shop Candid',
        label: 'Cozy & Warm',
        icon: '☕',
        image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A candid lifestyle shot of @USER_TRIGGER sitting in an aesthetic hipster coffee shop, holding a ceramic coffee cup, smiling naturally, bokeh background with warm indoor lighting, stylish casual outfit, photorealistic dating app photo"
    },
    {
        id: 'gym',
        name: 'Gym Lifestyle',
        label: 'Fit & Active',
        icon: '🏋️',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A high-quality fitness portrait of @USER_TRIGGER taking a break at a modern luxury gym, slight sweat, athletic stylish gym wear, dramatic gym lighting, black mood tones, strong jawline, confident posture, fitness model photography"
    },
    {
        id: 'travel',
        name: 'Travel Street',
        label: 'Adventurous',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "An adventurous travel portrait of @USER_TRIGGER walking down a cobblestone street in Europe, wearing fashionable streetwear, shallow depth of field, natural sunlight, cinematic street photography, confident and approachable smile"
    },
    {
        id: 'luxury',
        name: 'Luxury Restaurant',
        label: 'Fine Dining',
        icon: '🥂',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "An elegant evening portrait of @USER_TRIGGER sitting at a table in a Michelin-star luxury restaurant, dressed in sharp smart-casual evening wear, glass of wine on table, dim romantic ambient lighting, soft focus background, high-end dating profile photo"
    },
    {
        id: 'night_city',
        name: 'Night City',
        label: 'Neon Nights',
        icon: '🌙',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A stylish night portrait of @USER_TRIGGER walking in a busy metropolitan city, illuminated by colorful neon street lights, cyberpunk cyberpunk aesthetic, wearing a fashionable jacket, shallow depth of field, cinematic night photography"
    },
    {
        id: 'studio',
        name: 'Studio Portrait',
        label: 'Professional',
        icon: '📸',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
        promptTemplate: "A clean professional studio headshot of @USER_TRIGGER, dramatic Rembrandt lighting, dark grey seamless background, looking directly at the camera with a subtle confident smirk, highly detailed, 85mm portrait lens, GQ magazine style"
    }
];
