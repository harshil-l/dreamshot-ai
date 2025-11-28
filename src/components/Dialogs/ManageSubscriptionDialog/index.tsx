"use client";

import { CardIcon } from "../../Icons";
import { Button } from "@/components/ui/button";
import { functions } from "@/firebase";
import { httpsCallable } from "firebase/functions";
import { X } from "lucide-react";
import { DialogBase } from "@/components/DialogBase";
import toast from "react-hot-toast";
import { dialogAtom } from "@/atoms/dialogAtom";
import { useAtom } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useState } from "react";

/**
 * ManageSubscriptionDialog Component
 * 
 * Provides options to manage subscription:
 * - Change payment method via Stripe Customer Portal
 * - Cancel subscription
 * 
 * Uses Firebase Function getStripeCustomerPortalUrl to generate portal session
 */
export function ManageSubscriptionDialog() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const [user] = useAtom(userAuthAtom);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles opening Stripe Customer Portal for payment method management
   * Redirects user to Stripe portal where they can update payment methods
   */
  const handleUpdateSubscription = async () => {
    if (!user || user === "loading") {
      toast.error("Please login to manage your subscription");
      return;
    }

    if (!user.subscription?.priceId) {
      toast.error("No active subscription found");
      return;
    }

    setIsLoading(true);
    try {
      const createPortalSession = httpsCallable(
        functions,
        "getStripeCustomerPortalUrl"
      );
      const { data } = (await createPortalSession({
        returnUrl: window.location.href,
        priceId: user.subscription.priceId,
      })) as { data: { url: string } };

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Invalid portal URL received");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to open customer portal. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating portal session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Opens the cancel subscription dialog
   * Adds cancelSubscription to the dialog stack
   */
  const handleOpenCancelDialog = () => {
    setDialog([...dialog, "cancelSubscription"]);
  };

  return (
    <DialogBase
      name="manageSubscription"
      title="Manage Subscription"
      description="Manage your subscription settings and payment methods"
      headingClassName="mb-6"
      className="sm:max-w-lg"
    >
      <div className="space-y-6 w-full">
        <div className="p-6 rounded-xl bg-white/10 flex flex-col gap-4">
          <div className=" w-full  rounded-xl active:scale-95 transition-all duration-200">
            <Button
              onClick={handleUpdateSubscription}
              disabled={isLoading}
              variant="default"
              className="w-full flex items-center justify-center gap-2 p-px rounded-xl"
            >
              <CardIcon className="w-5 h-5" />
              {isLoading ? "Loading..." : "Change Payment Method"}
            </Button>
          </div>
          <div className=" w-full transition-all duration-200 rounded-xl">
            <Button
              onClick={handleOpenCancelDialog}
              variant="outline"
              className="w-full bg-white/10 flex items-center justify-center gap-2 rounded-xl"
            >
              <X className="w-5 h-5 border border-white rounded-full" />
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
    </DialogBase>
  );
}
