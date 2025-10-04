export type Message = {
  role: "user" | "bot";
  content: string;
  thinking?: string; // DeepSeek thinking process
};
