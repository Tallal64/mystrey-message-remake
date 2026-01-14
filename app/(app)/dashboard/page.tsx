"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Copy, CheckCircle2 } from "lucide-react";
import { MessageCard } from "@/components/MessageCard";

interface Message {
  id: string;
  text: string;
  date: Date;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing today?",
      date: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "Thanks for checking out my profile!",
      date: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      text: "Would love to connect and chat.",
      date: new Date(Date.now() - 86400000),
    },
  ]);

  const [acceptMessages, setAcceptMessages] = useState(true);
  const [copied, setCopied] = useState(false);

  const uniqueUrl = "https://yourdomain.com/user/alex-rodriguez";

  const handleRefresh = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: "New message loaded!",
      date: new Date(),
    };
    setMessages([newMessage, ...messages]);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(uniqueUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-base text-muted-foreground">
            Manage your messages and settings
          </p>
        </div>

        {/* Settings Section */}
        <div className="space-y-6 mb-12">
          {/* Accept Messages Toggle */}
          <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-card/30">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Accept Messages
              </h3>
              <p className="text-base text-muted-foreground">
                Allow others to send you messages
              </p>
            </div>
            <Switch
              checked={acceptMessages}
              onCheckedChange={setAcceptMessages}
            />
          </div>

          {/* Share Link Section */}
          <div className="border border-border/50 rounded-lg p-4 bg-card/30">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Your Message Link
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={uniqueUrl}
                readOnly
                className="flex-1 px-3 py-2 text-base bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                onClick={handleCopyUrl}
                size="sm"
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-transparent text-base py-6"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Messages
          </Button>
        </div>

        {/* Messages Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Messages
          </h2>
          <div className="space-y-3">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message.text}
                  date={message.date}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-base text-muted-foreground">
                  No messages yet. Share your link to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
