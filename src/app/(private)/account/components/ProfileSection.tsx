import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useAtomValue } from "jotai";
import UserProfileIconPlaceHolder from "@/components/UserAccount/UserProfileIconPlaceHolder";

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
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl py-4 sm:py-5 px-4 sm:px-5 border border-blue-200/50 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300">
            {/* Mobile Layout - Horizontal */}
            <div className="flex sm:hidden items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 shrink-0 ring-2 ring-blue-200/50 rounded-full p-0.5 shadow-md shadow-blue-100/50">
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
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-gray-800 font-semibold text-sm truncate">
                            {user?.email}
                        </p>
                        <p className="text-blue-600/70 text-xs font-medium mt-0.5">Email</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="text-red-500 text-xs font-semibold cursor-pointer border border-red-500 hover:border-red-600 bg-red-200/30 hover:text-red-600 transition-colors duration-200 hover:bg-red-200/50 px-2 py-1 rounded-md shrink-0"
                >
                    Log out
                </button>
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 ring-2 ring-blue-200/50 rounded-full p-0.5 shadow-md shadow-blue-100/50">
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
                        <p className="text-gray-800 font-semibold">
                            {user?.email}
                        </p>
                        <p className="text-blue-600/70 text-sm font-medium mt-0.5">Email</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="text-red-500 text-sm font-semibold cursor-pointer border border-red-500 hover:border-red-600 bg-red-200/30 hover:text-red-600 transition-colors duration-200 hover:bg-red-200/50 px-3 py-2 rounded-md"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

