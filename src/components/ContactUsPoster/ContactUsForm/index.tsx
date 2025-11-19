import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ContactUsForm() {
    return (
        <Card className="w-full max-w-sm">
            <CardContent>
                <form className="flex flex-col gap-6">
                    {/* Name Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="message">Enter Your Message</Label>
                        <textarea
                            id="message"
                            data-slot="input"
                            className={cn(
                                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[120px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            )}
                            placeholder="Type your message..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
