import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import AvailableCredits from "@/components/UserAccount/AvailableCredits";
import { CrossArrowIcon } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

interface SubscriptionSectionProps {
    /** Callback when manage subscription is clicked */
    onManageSubscription: () => void;
}

/**
 * Subscription section component
 * Displays subscription information, upgrade banner, and plan details
 */
export function SubscriptionSection({ onManageSubscription }: SubscriptionSectionProps) {
    const user = useAtomValue(userAuthAtom);
    const router = useRouter();

    if (user === "loading" || !user) {
        return null;
    }

    const getSubscriptionName = () => {
        if (!user?.subscription) return "Upgrade for faster generations & more credits";
        const planId = Number(user.subscription.planId);
        if (planId === 1 || planId === 4) return "Basic Active Plan";
        if (planId === 2 || planId === 5) return "Standard Active Plan";
        if (planId === 3 || planId === 6) return "Premium Active Plan";
        return "Free Plan";
    };

    const getDateTitle = (isCancelled: boolean) => {
        if (isCancelled) return "Plan ends on";
        return "Renews on";
    };

    const getIsCancelledAfterTag = () => {
        if (!user?.subscription) return "Upgrade for faster generations & more credits";
        return "Upgrade for faster generations & more credits";
    };

    return (
        <>
            {/* Upgrade Banner */}
            {!user?.subscription || user?.subscription?.isCancelled ? (
                <button
                    onClick={() => router.push("/price")}
                    className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
                >
                    <div className="aspect-video w-full rounded-2xl overflow-hidden">
                        <img
                            src="/assets/home/ourTools/1.png"
                            alt="Upgrade Banner"
                            className="w-full h-full rounded-2xl object-cover"
                        />
                    </div>
                    <div className="absolute bottom-3 left-0 right-0 px-3">
                        <div className="flex items-end justify-between">
                            <h3 className="text-black md:block hidden font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-4 border border-white/5 rounded-xl">
                                {user?.subscription?.isCancelled
                                    ? getIsCancelledAfterTag()
                                    : getSubscriptionName()}
                            </h3>
                            <h3 className="text-black md:hidden block font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-4 border border-white/5 rounded-xl">
                                Upgrade
                            </h3>
                            <div className="text-black font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-1.5 border border-white/5 rounded-xl hover:bg-white/30 transition-all duration-300">
                                <CrossArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                            </div>
                        </div>
                    </div>
                </button>
            ) : null}

            {/* Plan Section */}
            <div className="bg-white rounded-2xl py-4 px-4 border border-gray-100">
                <div
                    className={twMerge(
                        "flex items-center justify-between",
                        user?.subscription && !user?.subscription?.isCancelled
                            ? "border-b border-gray-200 pb-4"
                            : ""
                    )}
                >
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm font-medium">
                            {user?.subscription ? getSubscriptionName() : "Free Plan"}
                        </h3>
                        <p className="md:text-sm text-xs text-gray-500 mt-1">
                            {user?.subscription
                                ? `${getDateTitle(user?.subscription?.isCancelled || false)} ${new Date(
                                    Number(user.subscription.renewsAt) * 1000
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}`
                                : "You have no active subscription"}
                        </p>
                    </div>
                    <div className="md:block hidden ml-4">
                        <AvailableCredits credits={user?.credits ?? 0} compact removeBG />
                    </div>
                    <div className="md:hidden block ml-4">
                        <AvailableCredits
                            credits={user?.credits ?? 0}
                            compact
                            className="py-2"
                        />
                    </div>
                </div>
                {user?.subscription && !user?.subscription?.isCancelled && (
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex-1">
                            <h3 className="text-gray-800 text-sm font-medium">
                                Thanks for subscribing to Dreamshot{" "}
                                {Number(user?.subscription?.planId) === 1 ||
                                    Number(user?.subscription?.planId) === 4
                                    ? "Basic"
                                    : Number(user?.subscription?.planId) === 2 ||
                                        Number(user?.subscription?.planId) === 5
                                        ? "Standard"
                                        : "Premium"}!
                            </h3>
                            <p className="md:text-sm text-xs text-gray-500 mt-1">
                                Explore your new Pro features.{" "}
                                <button
                                    onClick={() => {
                                        router.push("/price");
                                    }}
                                    className="text-gray-800 text-sm cursor-pointer underline hover:text-gray-600 transition-colors duration-200"
                                >
                                    Learn more
                                </button>
                            </p>
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={onManageSubscription}
                                className="flex items-center cursor-pointer transition-all duration-100"
                            >
                                <span className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200">
                                    Manage
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

