

export interface DashboardPopularTool {
    title: string;
    imageUrl: string;
}

export interface DashboardOurFeature {
    title: string;
    description: string;
    imageUrl: string;
}

export interface DashboardTestimonial {
    title: string;
    subTitle: string;
    description: string;
    imageUrl: string;
}

export interface DashboardInspiration {
    imageUrl: string;
}

export type PlanDuration = "monthly" | "annually";

export type PlanNameT = "Starter" | "Professional" | "Enterprise";

export type Plan = {
    name: PlanNameT;
    description: string;
    price: number;
    duration: PlanDuration;
    credits: number;
    features: string[];

    //   priceId?: string;
    //   discountPrice?: number;
    //   id: string;
    //   maxDurationSeconds: number;
};
