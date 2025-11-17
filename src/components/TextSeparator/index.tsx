import { PartitionLineLeft, PartitionLineRight } from "../Icons";


export default function TextSeparator({ textSeparatorText }: { textSeparatorText: string }) {
    return (
        <div className="flex gap-10 items-center justify-center">
            <PartitionLineLeft />
            <h2 className="text-lg text-center">{textSeparatorText}</h2>
            <PartitionLineRight />
        </div>
    )
}