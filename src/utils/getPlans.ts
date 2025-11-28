import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Plan } from "@/types";
import { STATIC_FEATURES } from "@/constants/static.content.constants";

/**
 * Raw plan data structure from Firestore
 * Matches the actual Firestore document structure
 */
interface FirestorePlan {
  id: number;
  index: number;
  name: string;
  period: "month" | "year";
  price: number;
  discountPrice?: number;
  priceSuffix?: string;
  credits: number;
  isHighlight?: boolean;
  priceId: string;
  sandboxPriceId?: string;
  stripePriceId?: string;
}

/**
 * Maps Firestore plan name to Plan type name
 * Converts lowercase Firestore names to the expected Plan name format
 * 
 * @param name - The plan name from Firestore (e.g., "basic", "pro", "vip")
 * @returns The corresponding PlanNameT value
 */
const mapPlanName = (name: string): Plan["name"] => {
  const nameMap: Record<string, Plan["name"]> = {
    "basic": "Starter",
    "pro": "Professional",
    "vip": "Enterprise",
  };

  // Return mapped name or capitalize first letter as fallback
  return nameMap[name.toLowerCase()] || (name.charAt(0).toUpperCase() + name.slice(1)) as Plan["name"];
};

/**
 * Maps Firestore period to Plan duration
 * Converts "month" → "monthly" and "year" → "annually"
 * 
 * @param period - The period from Firestore ("month" or "year")
 * @returns The corresponding PlanDuration value
 */
const mapPeriodToDuration = (period: "month" | "year"): "monthly" | "annually" => {
  return period === "month" ? "monthly" : "annually";
};

/**
 * Generates a description for a plan based on its name and duration
 * 
 * @param name - The plan name
 * @param duration - The billing duration
 * @returns A descriptive string for the plan
 */
const generatePlanDescription = (name: string, duration: "monthly" | "annually"): string => {
  const period = duration === "monthly" ? "month" : "year";
  return `Our ${name} plan gives you access to all premium features for ${period}ly billing.`;
};

/**
 * Fetches plans from Firestore and transforms them to match the Plan type
 * Retrieves plans from the global/plans document
 * 
 * Transforms Firestore plan structure to match the expected Plan type:
 * - Maps period ("month"/"year") to duration ("monthly"/"annually")
 * - Converts id from number to string for both id and planId
 * - Maps plan name to expected format
 * - Generates description based on plan details
 * - Adds static features array
 * 
 * @returns Array of Plan objects or undefined if not found
 * @throws Error if Firestore operation fails
 */
export const getPlans = async (): Promise<Plan[] | undefined> => {
  try {
    const plansDoc = await getDoc(doc(db, "global", "plans"));

    if (!plansDoc.exists()) {
      console.warn("Plans document does not exist in Firestore");
      return undefined;
    }

    const plansData = plansDoc.data();
    const firestorePlans = plansData?.plans as FirestorePlan[] | undefined;

    if (!firestorePlans || !Array.isArray(firestorePlans)) {
      console.warn("Plans data is not an array or is missing");
      return undefined;
    }

    // Transform Firestore plans to Plan type
    const transformedPlans: Plan[] = firestorePlans.map((plan) => {
      const duration = mapPeriodToDuration(plan.period);
      const mappedName = mapPlanName(plan.name);

      return {
        // Convert id from number to string and use as both id and planId
        id: String(plan.id),
        planId: String(plan.id),

        // Map name to expected format
        name: mappedName,

        // Generate description based on plan details
        description: generatePlanDescription(plan.name, duration),

        // Map period to duration
        duration: duration,

        // Direct field mappings
        price: plan.price,
        credits: plan.credits,
        priceId: plan.priceId,

        // Optional fields with defaults
        discountPrice: plan.discountPrice,
        isFeatured: plan.isHighlight || false,
        priceSuffix: plan.priceSuffix || "$",

        // Use static features for all plans (as per current implementation)
        features: STATIC_FEATURES,
      };
    });

    return transformedPlans;
  } catch (error) {
    console.error("Error fetching plans from Firestore:", error);
    throw error;
  }
};
