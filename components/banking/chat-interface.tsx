"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ChatMessage,
  clearChatHistory,
  saveChatHistory,
  useChatIndustryMutation,
} from "@/queries/chatQuery";
import Markdown from "react-markdown";
import { toastUtils } from "@/lib/toast-utils";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface ChatInterfaceProps {
  className?: string;
}

// Quick questions to display
const quickQuestions = [
  "How do I open a bank account?",
  "What are your loan interest rates?",
  "What documents are required for KYC?",
  "How can I reset my mobile banking password?",
];

export function ChatInterface({ className }: ChatInterfaceProps) {
  const createWelcomeMessage = (): ChatMessage => ({
    id: "welcome",
    role: "assistant",
    content: "Hello! I'm your Rumsan AI Assistant.",
    timestamp: new Date(),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    createWelcomeMessage(),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const industryChatMutation = useChatIndustryMutation();

  // Clear chat history on page refresh/mount
  useEffect(() => {
    clearChatHistory();
    // Reset messages to only show welcome message
    setMessages([createWelcomeMessage()]);
  }, []);
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleQuickQuestion = async (question: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await industryChatMutation.mutateAsync({
        query: question,
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
        confidence: response.confidence,
        processingTime: response.processingTime,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (error) {
      console.error("Chat error:", error);

      toastUtils.generic.error(
        "Failed to get response",
        error instanceof Error ? error.message : "Unknown error"
      );

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await industryChatMutation.mutateAsync({
        query: input.trim(),
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
        confidence: response.confidence,
        processingTime: response.processingTime,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);

      saveChatHistory(finalMessages);
      // toastUtils.generic.success("Response received");
    } catch (error) {
      console.error("Chat error:", error);

      toastUtils.generic.error(
        "Failed to get response",
        error instanceof Error ? error.message : "Unknown error"
      );

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card
      className={`w-full max-w-md border border-border bg-card shadow-lg ${
        className || ""
      }`}
    >
      <div className="mb-4 p-4 flex items-center gap-2 border-b border-border pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full ">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Rumsan Banking Assistant
          </h3>
          <p className="text-xs text-muted-foreground">
            Ask about our banking services here
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="h-80 w-full p-4 pr-2">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-accent text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 p-4 bg-white">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">
                    Rumsan AI
                  </span>
                  <span className="text-xs text-gray-500">thinking...</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      <div className="px-6 py-3 bg-muted/30 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          Quick Questions:
        </p>
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 -mx-6 px-6">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-background border border-border hover:border-primary hover:bg-primary/5 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
          <Textarea
            ref={textareaRef}
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent text-sm outline-none resize-none"
          />

          <Button
            size="icon"
            variant="ghost"
            disabled={isLoading}
            className="h-8 w-8 shrink-0"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="px-4 py-3 pb-4 text-center text-xs text-muted-foreground">
        This information is for informational and educational purposes only.
      </p>
    </Card>
  );
}
