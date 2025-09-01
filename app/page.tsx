import { Hero115 } from "@/components/hero";
import { Navbar1 } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { url } from "inspector";
import { HomeIcon } from "lucide-react";

// msgkit-transparent.png

export default function Page() {
    return (
        <div className="flex flex-col size-full">
            <div className="mx-auto max-w-7xl size-full px-6 border-x border-dashed">
                <Navbar1 />
            </div>
            <Separator />
            <div className="max-w-7xl mx-auto size-full px-6 border-x border-dashed">
                <Hero115
                    heading="The easiest way to personalize your community"
                    description="Create rich and interactive messages in minutes."
                    button={{ text: "Join Waitlist", url: "/waitlist" }}
                    trustText="No email required!"
                    // trustText="Join 3 others already on the waitlist!"
                />
            </div>
            <Separator />
            <div className="max-w-7xl mx-auto size-full p-6 border-x border-dashed text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <div>© {new Date().getFullYear()} Message Kit - All rights reserved</div>
                <div className="flex gap-4">
                    <a href="/legal">Privacy Policy</a>
                    <a href="/legal">Terms of Service</a>
                </div>
            </div>
        </div>
    );
}
