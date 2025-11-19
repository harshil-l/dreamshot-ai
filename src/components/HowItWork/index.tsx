import TextSeparator from "../TextSeparator";
import HowItWorkCard from "./HowItWorkCard";

export default function HowItWork() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="How It Work" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                How Our AI Transforms Your <br />
                Photos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
                <HowItWorkCard />
                <HowItWorkCard />
                <HowItWorkCard />
            </div>
        </div>
    )
}