"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export default function Page() {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${window.location.origin}/waitlist/success`,
                queryParams: {
                    prompt: "none",
                },
            },
        });
    }, [supabase]);

    return (
        <div className="flex justify-center items-center h-screen text-muted-foreground text-sm px-6">
            Adding you to the waitlist...
        </div>
    );
}
