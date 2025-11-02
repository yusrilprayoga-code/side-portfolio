// types/ai-models.ts
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  supportsThinking: boolean;
  icon: string;
}

export const availableModels: AIModel[] = [
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    description: 'Advanced reasoning with thinking process',
    maxTokens: 8192,
    supportsThinking: true,
    icon: '🧠',
  },
  {
    id: 'x-ai/grok-code-fast-1',
    name: 'Grok Code Fast',
    provider: 'xAI',
    description: 'Fast coding assistant by xAI',
    maxTokens: 4096,
    supportsThinking: false,
    icon: '⚡',
  },
  {
    id: 'openai/gpt-oss-20b:free',
    name: 'GPT OSS 20B',
    provider: 'OpenAI',
    description: 'Open source model, efficient',
    maxTokens: 4096,
    supportsThinking: false,
    icon: '🚀',
  },
  {
    id: 'qwen/qwen3-coder:free',
    name: 'Qwen3 Coder',
    provider: 'Qwen',
    description: 'Specialized coding model, free',
    maxTokens: 8192,
    supportsThinking: false,
    icon: '💻',
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'Latest Gemini, very fast',
    maxTokens: 8192,
    supportsThinking: false,
    icon: '✨',
  },
];

export const defaultModel = availableModels[1]; // Default to Grok (current model)
