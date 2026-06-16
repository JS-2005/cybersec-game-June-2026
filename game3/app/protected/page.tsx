"use client"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Protected() {
    const router = useRouter();
    return (
        <div className="flex flex-col h-screen p-4 items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Congratulations! You had been authorized. </CardTitle>
                </CardHeader>
                <CardFooter>
                    <Button variant="default" onClick={() => router.replace('/')}>Restart the Game</Button>
                </CardFooter>
            </Card>
        </div>
    );
}