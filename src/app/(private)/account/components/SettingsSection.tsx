import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/firebase";
import toast from "react-hot-toast";

interface SettingsSectionProps {
    /** Callback when clear data is clicked */
    onClearData: () => void;
    /** Callback when delete account is clicked */
    onDeleteAccount: () => void;
}

/**
 * Settings section component
 * Displays account settings: email updates, change password, clear data, delete account
 */
export function SettingsSection({ onClearData, onDeleteAccount }: SettingsSectionProps) {
    const [emailUpdates, setEmailUpdates] = useState(true);
    const { sendPasswordResetLink } = useAuth();

    const handleChangePassword = async () => {
        toast.promise(sendPasswordResetLink(auth.currentUser?.email || ""), {
            loading: "Sending reset link...",
            success: "Reset link sent to your email",
            error: "Failed to send reset link",
        });
    };

    return (
        <div className="bg-white rounded-2xl px-4 border border-gray-100">
            <div className="flex items-center justify-between py-5">
                <div className="flex-1">
                    <h3 className="text-gray-800 text-sm md:text-base font-medium">
                        Get Email Updates
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Receive offers, tips, and news straight to your inbox.
                    </p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
            </div>

            <div className="border-t border-gray-200">
                <div className="flex items-center justify-between py-5">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-medium">
                            Change Password
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Choose a new password to stay secure.
                        </p>
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200 ml-4"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="flex items-center justify-between py-5">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-medium">
                            Clear All Data
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                            This will delete your creation history.
                        </p>
                    </div>
                    <button
                        onClick={onClearData}
                        className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200 ml-4"
                    >
                        Clear Data
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="flex items-center justify-between pt-5 pb-4">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-medium">
                            Delete Account
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Permanently delete your account.
                        </p>
                    </div>
                    <button
                        onClick={onDeleteAccount}
                        className="text-red-500 text-nowrap font-medium sm:text-sm text-xs cursor-pointer underline hover:text-red-600 transition-colors duration-200 ml-4"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

