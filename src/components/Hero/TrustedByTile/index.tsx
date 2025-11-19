import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function TrustedByTile() {
    return (
        <div>
            <div className="border rounded-full shadow-md h-10 px-3 bg-white flex items-center justify-between w-fit mx-auto hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <div className="*:data-[slot=avatar]:ring-background flex items-center -space-x-2 *:data-[slot=avatar]:size-6 *:data-[slot=avatar]:ring-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/maxleiter.png"
                            alt="@maxleiter"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://avatars.githubusercontent.com/u/236955371?s=400&u=cb6559f66aaa4b668a0890d3509f9fcdc2d12666&v=4"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div className="pl-3 text-sm text-gray-500 font-semibold">Trusted by 3+ million users</div>
                </div>
            </div>
        </div>
    )
}