"use client"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bot, ArrowRightIcon, Lock } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field } from "@/components/ui/field";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@/components/ui/input-group';

export default function Page() {
  // Auth state
  const [passkey, setPasskey] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const router = useRouter();

  // Chat state
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([{ role: 'bot', text: 'Alpha Insecure Assistant is ready to help.' }]);
  const [loadingChat, setLoadingChat] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoadingAuth(true);
    if (passkey === 'helloworld2026') {
      router.push('protected');
    } else {
      alert('Invalid Passkey');
    }
    setLoadingAuth(false);
  }

  async function generate(e: any) {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    if (!prompt) return;

    setMessages(prev => [...prev, { role: 'user', text: prompt }]);
    setLoadingChat(true);
    e.target.prompt.value = '';

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.message || 'No response received. Please try again.' }]);
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Failed to connect to the AI. Please check your connection and try again.' }]);
    } finally {
      setLoadingChat(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-5xl shadow-xl border-t-4 border-t-primary overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {/* Chat Interface Section */}
          <div className="flex flex-col h-[600px]">
            <CardHeader className="bg-white pb-4 border-b">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                  <Image src="/ai-assistant.png" alt="Bot Logo" width={40} height={40} className="rounded-full" />
                </div>
                <div>
                  <CardTitle className="text-xl">Alpha Insecure Assistant</CardTitle>
                  <CardDescription>AI system managing Alpha Insecure 1.0</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              <div className="flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`p-4 rounded-xl shadow-sm border max-w-[90%] ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-tr-sm border-blue-600' : 'bg-white border-gray-100 self-start rounded-tl-sm'}`}>
                    <p className={`whitespace-pre-wrap ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>{msg.text}</p>
                  </div>
                ))}
                {loadingChat && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 self-start flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-white border-t p-4">
              <form onSubmit={generate} className="w-full">
                <InputGroup>
                  <InputGroupTextarea 
                    placeholder="Ask something..." 
                    id="prompt" 
                    name="prompt" 
                    className="min-h-[44px] resize-none"
                    disabled={loadingChat}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="default"
                      className="rounded-full w-10 h-10 p-0 flex items-center justify-center mr-1"
                      type="submit"
                      disabled={loadingChat}
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </CardFooter>
          </div>

          {/* Authentication Section */}
          <div className="flex flex-col items-center justify-center p-8 bg-white">
            <div className="w-full max-w-sm space-y-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Image src="/ICON.png" alt="Logo" width={120} height={120} className="drop-shadow-md" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  ALPHA INSECURE 1.0
                </h1>
                <p className="text-gray-500">
                  Please enter your passkey to authorize access.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <FieldGroup>
                  <Field>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        type="password" 
                        placeholder="Enter Passkey" 
                        value={passkey} 
                        onChange={(e) => setPasskey(e.target.value)}
                        className="pl-10 h-12 text-lg"
                        required
                      />
                    </div>
                  </Field>
                  <Field>
                    <Button 
                      type="submit" 
                      disabled={loadingAuth}
                      className="w-full h-12 text-lg font-medium transition-all"
                    >
                      {loadingAuth ? 'AUTHORIZING...' : 'AUTHORIZE'}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}