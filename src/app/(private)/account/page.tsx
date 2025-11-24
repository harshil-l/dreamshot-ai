"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { dialogAtom } from "@/atoms/dialogAtom";
import DeleteAccountDialog from "@/components/Dialogs/DeleteAccountDialog";
import ClearDataDialog from "@/components/Dialogs/ClearDataDialog";
import LogoutDialog from "@/components/Dialogs/LogOutDialog";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "./components/ProfileSection";
import { SubscriptionSection } from "./components/SubscriptionSection";
import { SettingsSection } from "./components/SettingsSection";

export default function AccountPage() {
  const [user] = useAtom(userAuthAtom);
  const [, setDialogType] = useAtom(dialogAtom);
  const [showPaymentSettings, setShowPaymentSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Don't redirect if still loading
    if (user !== "loading" && !user) {
      setDialogType(["login"]);
      return;
    }
  }, [user, router, setDialogType]);

  const handleClearData = () => {
    setDialogType(["clearData"]);
  };

  const handleManageSubscription = () => {
    setShowPaymentSettings(true);
  };

  const handleDeleteAccount = () => {
    setDialogType(["deleteAccount"]);
  };

  const handleLogout = () => {
    setDialogType(["logout"]);
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center pt-20">
        <Header />
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-4">
          <h2 className="text-2xl font-bold text-black">Login to Continue</h2>
          <Button
            onClick={() => setDialogType(["login"])}
            className="px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (user === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">
          <svg
            className="h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col items-center sm:justify-center justify-start flex-1 sm:pt-8 pt-4 pb-8">
        {showPaymentSettings ? (
          <div className="text-gray-800 max-w-2xl w-full px-4">
            <button
              onClick={() => setShowPaymentSettings(false)}
              className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <h1 className="text-lg font-medium text-gray-800">Manage Subscription</h1>
            </button>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600">Subscription management coming soon...</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 space-y-4 max-w-2xl w-full px-4">
            {/* Header */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 mb-2"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <h1 className="text-lg font-medium text-gray-800">My Account</h1>
            </button>

            {/* Profile Section */}
            <ProfileSection onLogout={handleLogout} />

            {/* Subscription Section */}
            <SubscriptionSection onManageSubscription={handleManageSubscription} />

            {/* Settings Section */}
            <SettingsSection
              onClearData={handleClearData}
              onDeleteAccount={handleDeleteAccount}
            />

            {/* Dialogs */}
            <DeleteAccountDialog />
            <ClearDataDialog />
            <LogoutDialog />
          </div>
        )}
      </div>
    </div>
  );
}
