"use client";
import { useEffect } from "react";
import sdk from "@farcaster/miniapp-sdk";

export default function AppInitializer() {
    useEffect(() => {
        const signalReady = async () => {
            try {
                console.log("AppInitializer: Attempting to call sdk.actions.ready()...");

                // Check if we are in a Farcaster environment (optional but good for debugging)
                // For now, just call ready() directly as per docs.

                // Add a small delay to ensure the DOM is fully painted if needed
                setTimeout(async () => {
                    await sdk.actions.ready();
                    console.log("AppInitializer: sdk.actions.ready() called successfully.");
                }, 500);

            } catch (error) {
                console.error("AppInitializer: Failed to call ready()", error);
            }
        };

        signalReady();
    }, []);

    return null;
}
