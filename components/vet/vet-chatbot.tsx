"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";

const sampleQuestions = [
  "What are the symptoms of parvo?",
  "Schedule a wellness check",
  "Recommend diet for senior dogs",
  "Emergency care protocols",
];

const chatMessages = [
  {
    type: "assistant",
    message:
      "Hello! I'm your AI veterinary assistant. How can I help you today?",
  },
  {
    type: "user",
    message: "I need to schedule a wellness check for my dog",
  },
  {
    type: "assistant",
    message:
      "I'd be happy to help schedule a wellness check! I can see available appointments this week. Would you prefer morning or afternoon?",
  },
];

export function VetChatbot() {
  const [input, setInput] = useState("");

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-2">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-semibold">Rumsan Veterinary Assistant</h3>
        </div>
        <p className="text-sm text-primary-foreground/80 mt-1">
          AI-powered support for pet care
        </p>
      </div>

      <div className="p-4 space-y-4 h-[400px] overflow-y-auto bg-muted/20">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-4">
          <p className="text-xs text-muted-foreground font-medium">
            Quick questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.slice(0, 2).map((question, idx) => (
              <button
                key={idx}
                className="text-xs bg-card hover:bg-accent border border-border rounded-full px-3 py-1.5 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </Card>
  );
}
