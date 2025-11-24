import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useAtomValue } from "jotai";
import UserProfileIconPlaceHolder from "@/components/UserAccount/UserProfileIconPlaceHolder";
import { twMerge } from "tailwind-merge";

interface ProfileSectionProps {
    /** Callback when logout is clicked */
    onLogout: () => void;
}

/**
 * Profile section component
 * Displays user profile information and logout button
 */
export function ProfileSection({ onLogout }: ProfileSectionProps) {
    const user = useAtomValue(userAuthAtom);

    if (user === "loading" || !user) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl py-4 px-4 border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0">
                        {user?.photoURL ? (
                            <img
                                alt={`Profile picture - ${user?.photoURL || "Default avatar"}`}
                                src={user?.photoURL || `https://avatar.vercel.sh/${user?.email}`}
                                className="w-full h-full transition-all hover:scale-105 rounded-full object-cover"
                            />
                        ) : (
                            <UserProfileIconPlaceHolder email={user?.email} />
                        )}
                    </div>
                    <div>
                        <p className={twMerge("text-gray-800 font-medium sm:hidden")}>
                            {user?.email?.length && user?.email?.length > 20
                                ? user?.email?.substring(0, 20) + "..."
                                : user?.email}
                        </p>
                        <p className={twMerge("text-gray-800 font-medium hidden sm:block")}>
                            {user?.email}
                        </p>
                        <p className="text-gray-500 text-sm">Email</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="text-red-500 text-nowrap font-semibold sm:text-sm text-xs cursor-pointer underline hover:text-red-600 transition-colors duration-200"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

