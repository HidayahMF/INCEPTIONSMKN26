export type ChatSource = { title: string; url?: string | null; page?: string | null };

export type ChatHistoryMessage = { role: "user" | "assistant"; content: string };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  status?: string;
  sources?: ChatSource[];
  retryQuestion?: string;
};

export type ChatResponse = {
  answer: string;
  status: string;
  sources: ChatSource[];
};
