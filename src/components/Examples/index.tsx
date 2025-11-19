import TextSeparator from "../TextSeparator";
import ExamplesCard from "./ExamplesCard";

export default function Examples() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">

            <TextSeparator textSeparatorText="Examples" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Before & After Previews
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
                <ExamplesCard beforeImageUrl="/assets/PopularTools/BackgroundRemover.png" afterImageUrl="/assets/PopularTools/AnimeFilter.png" />
                <ExamplesCard beforeImageUrl="/assets/PopularTools/GhibliFilter.png" afterImageUrl="/assets/PopularTools/ChristmasFilter.png" />
                <ExamplesCard beforeImageUrl="/assets/PopularTools/ImageEnhancer.png" afterImageUrl="/assets/ContactUs/Background.png" />
            </div>
        </div>
    )
}