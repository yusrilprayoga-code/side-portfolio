// types/ai-models.ts
export type AIGateway = "openrouter" | "nvidia";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  supportsThinking: boolean;
  icon: string;
  gateway: AIGateway;
  /** Extra body params some models require (e.g. NVIDIA reasoning knobs). */
  requestOverrides?: Record<string, unknown>;
}

// Fast, reliable OpenRouter models first (all verified working); the NVIDIA
// NIM models are last because their shared free endpoint can queue for minutes.
export const availableModels: AIModel[] = [
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT OSS 20B (Free)",
    provider: "OpenAI",
    description: "Fast and free — recommended default",
    maxTokens: 2048,
    supportsThinking: false,
    icon: "🚀",
    gateway: "openrouter",
  },
  {
    id: "x-ai/grok-4.3",
    name: "Grok 4.3",
    provider: "xAI",
    description: "Fast and capable (uses OpenRouter credits)",
    maxTokens: 2048,
    supportsThinking: false,
    icon: "⚡",
    gateway: "openrouter",
  },
  {
    id: "z-ai/glm-5.1",
    name: "GLM 5.1",
    provider: "Z.AI (OpenRouter)",
    description: "Flagship model, great for writing (uses credits)",
    maxTokens: 2048,
    supportsThinking: false,
    icon: "🧠",
    gateway: "openrouter",
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen3 Coder (Free)",
    provider: "Qwen",
    description: "Specialized coding model, free",
    maxTokens: 2048,
    supportsThinking: false,
    icon: "💻",
    gateway: "openrouter",
  },
  {
    id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    name: "Nemotron 3 Nano",
    provider: "NVIDIA",
    description: "Reasoning model w/ visible thinking (slow, can queue)",
    // Bounded so a portfolio answer can't spend minutes reasoning
    maxTokens: 3072,
    supportsThinking: true,
    icon: "🟩",
    gateway: "nvidia",
    requestOverrides: {
      top_p: 0.95,
      reasoning_budget: 1536,
      chat_template_kwargs: { enable_thinking: true },
    },
  },
  {
    id: "z-ai/glm-5.2",
    name: "GLM 5.2 (NVIDIA)",
    provider: "Z.AI (NVIDIA NIM)",
    description: "Newest GLM, but the NVIDIA endpoint often queues",
    maxTokens: 3072,
    supportsThinking: false,
    icon: "🧪",
    gateway: "nvidia",
  },
];

// A free model is the default so the chatbot works even with no OpenRouter
// credit balance; paid (Grok/GLM) and NVIDIA models stay opt-in.
export const defaultModel =
  availableModels.find((m) => m.id === "openai/gpt-oss-20b:free") ??
  availableModels[0];
