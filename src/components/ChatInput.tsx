'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Brain, 
  Settings, 
  ChevronDown, 
  Zap,
  Info,
  X,
} from 'lucide-react';
import { AIModel, availableModels, defaultModel } from '@/types/ai-models';
import { MCPTool, availableMCPTools } from '@/types/mcp-tools';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  remainingThinking: number;
  isThinkingEnabled: boolean;
  setIsThinkingEnabled: (value: boolean) => void;
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;
  enabledTools: string[];
  setEnabledTools: (tools: string[]) => void;
}

export default function ChatInput({
  input,
  setInput,
  onSend,
  isGenerating,
  textareaRef,
  remainingThinking,
  isThinkingEnabled,
  setIsThinkingEnabled,
  selectedModel,
  setSelectedModel,
  enabledTools,
  setEnabledTools,
}: ChatInputProps) {
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const toggleTool = (toolId: string) => {
    if (enabledTools.includes(toolId)) {
      setEnabledTools(enabledTools.filter(id => id !== toolId));
    } else {
      setEnabledTools([...enabledTools, toolId]);
    }
  };

  return (
    <div className="relative border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Top Bar - Settings & Model Selector */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center justify-between gap-2">
          {/* Model Selector */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors w-full max-w-xs"
            >
              <span className="text-lg">{selectedModel.icon}</span>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedModel.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedModel.provider}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showModelSelector ? 'rotate-180' : ''}`} />
            </button>

            {/* Model Dropdown */}
            {showModelSelector && (
              <div className="absolute top-full left-0 mt-1 w-full max-w-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModelSelector(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      selectedModel.id === model.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{model.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {model.name}
                          {model.supportsThinking && (
                            <Brain className="w-3 h-3 text-purple-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {model.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
              showSettings ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
            {/* Thinking Toggle */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Thinking Process
                  </span>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    remainingThinking > 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {remainingThinking}/3 left today
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isThinkingEnabled}
                    onChange={(e) => setIsThinkingEnabled(e.target.checked)}
                    disabled={remainingThinking === 0 || !selectedModel.supportsThinking}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-purple-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                </label>
              </div>
              {!selectedModel.supportsThinking && (
                <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>Selected model doesn&apos;t support thinking process</span>
                </div>
              )}
              {remainingThinking === 0 && (
                <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>Thinking limit reached. Resets tomorrow at midnight.</span>
                </div>
              )}
            </div>

            {/* MCP Tools */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  MCP Tools
                </span>
              </div>
              <div className="space-y-2">
                {availableMCPTools.map((tool) => (
                  <label
                    key={tool.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      enabledTools.includes(tool.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } ${tool.id === 'portfolio-data' ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={enabledTools.includes(tool.id)}
                      onChange={() => toggleTool(tool.id)}
                      disabled={tool.id === 'portfolio-data'} // Always enabled
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-lg">{tool.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {tool.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {tool.description}
                      </div>
                    </div>
                    {tool.id === 'portfolio-data' && (
                      <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        Always On
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isThinkingEnabled
                  ? "Ask me anything... (with thinking process)"
                  : "Ask me anything..."
              }
              rows={1}
              disabled={isGenerating}
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-40 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {isThinkingEnabled && remainingThinking > 0 && (
              <div className="absolute right-3 top-3 flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Brain className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                  {remainingThinking}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onSend}
            disabled={isGenerating || input.trim() === ''}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
