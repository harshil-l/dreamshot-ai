import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

// Use local assets for faster loading and better performance
// Images are stored in /public/assets/TrustedByTile/
const AVATAR_IMAGES = [
    "/assets/TrustedByTile/1.png",
    "/assets/TrustedByTile/2.png",
    "/assets/TrustedByTile/3.png",
    "/assets/TrustedByTile/4.png",
]

const AVATAR_ALTS = ["@shadcn", "@maxleiter", "@evilrabbit", "@user"]
const AVATAR_FALLBACKS = ["CN", "LR", "ER", "U"]

export default function TrustedByTile() {
    return (
        <div>
            <div className="border rounded-full shadow-md mt-22 h-10 px-3 bg-white flex items-center justify-between w-fit mx-auto hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <div className="*:data-[slot=avatar]:ring-background flex items-center -space-x-2 *:data-[slot=avatar]:size-6 *:data-[slot=avatar]:ring-2">
                    {AVATAR_IMAGES.map((src, index) => (
                        <Avatar key={index}>
                            <AvatarImage
                                src={src}
                                alt={AVATAR_ALTS[index]}
                                loading="eager"
                            />
                            <AvatarFallback>{AVATAR_FALLBACKS[index]}</AvatarFallback>
                        </Avatar>
                    ))}
                    <div className="pl-3 text-sm text-gray-500 font-semibold">Trusted by 3+ million users</div>
                </div>
            </div>
        </div>
    )
}