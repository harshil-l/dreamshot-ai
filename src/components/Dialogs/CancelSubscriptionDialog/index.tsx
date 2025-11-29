"use client";

import { Button } from "@/components/ui/button";
import { DialogBase } from "@/components/DialogBase";
import { httpsCallable } from "firebase/functions";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { functions } from "@/firebase";
import { useAtom } from "jotai";
import { dialogAtom } from "@/atoms/dialogAtom";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";

/**
 * CancelSubscriptionDialog Component
 * 
 * Confirmation dialog for cancelling subscription.
 * Calls Firebase Function cancelSubscription to cancel at period end.
 * 
 * Note: Subscription is cancelled at period end, not immediately,
 * so user retains access until the current billing period expires.
 */
export function CancelSubscriptionDialog() {
  const [, setDialog] = useAtom(dialogAtom);
  const user = useAtomValue(userAuthAtom);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles subscription cancellation
   * Calls Firebase Function to cancel subscription at period end
   * User retains access until current billing period expires
   */
  const handleCancelSubscription = async () => {
    if (!user || user === "loading") {
      toast.error("Please login to cancel your subscription");
      return;
    }

    if (!user.subscription) {
      toast.error("No active subscription found");
      return;
    }

    setIsLoading(true);
    try {
      const cancelSubscription = httpsCallable(functions, "cancelSubscription");
      const result = (await cancelSubscription()) as {
        data: { success: boolean; message: string };
      };

      if (result.data?.success) {
        toast.success(
          "Subscription cancelled successfully. You'll retain access until the end of your billing period."
        );
        // Close dialog after successful cancellation
        setDialog([]);
        // Optionally refresh the page to update subscription status
        // window.location.reload();
      } else {
        throw new Error(result.data?.message || "Cancellation failed");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to cancel subscription. Please try again or contact support.";
      toast.error(errorMessage);
      console.error("Error cancelling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Closes the dialog without cancelling
   */
  const handleKeepSubscription = () => {
    setDialog([]);
  };

  return (
    <DialogBase
      name="cancelSubscription"
      title="Cancel Subscription"
      description="Are you sure you want to cancel your subscription?"
      headingClassName="mb-6"
      className="sm:max-w-md"
    >
      <div className="space-y-6 w-full">
        <div className=" rounded-xl bg-background/30 flex flex-col gap-4">
          <div className=" w-full  rounded-xl transition-all duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <X className="w-8 h-8 text-white border-2 border-white rounded-full p-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Cancel Subscription
                </h3>
                <p className="text-muted-foreground">
                  Are you sure you want to cancel your subscription? You&apos;ll
                  retain access until the end of your current billing period.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-6 w-full">
                <div className="w-full active:scale-95 transition-all duration-200">
                  <Button
                    variant="default"
                    onClick={handleKeepSubscription}
                    disabled={isLoading}
                    className="w-full"
                  >
                    No, Keep Subscription
                  </Button>
                </div>
                <div className="w-full p-px bg-gradient-to-r from-blue/40 to-blue active:scale-95 transition-all duration-200 rounded-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCancelSubscription}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Yes, Cancel Subscription"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
}
