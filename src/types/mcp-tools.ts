// types/mcp-tools.ts
export interface MCPTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export const availableMCPTools: MCPTool[] = [
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the web for information',
    icon: '🔍',
    enabled: false,
  },
  {
    id: 'code-execution',
    name: 'Code Execution',
    description: 'Run code snippets safely',
    icon: '💻',
    enabled: false,
  },
  {
    id: 'file-system',
    name: 'File System',
    description: 'Read/write files (disabled for security)',
    icon: '📁',
    enabled: false,
  },
  {
    id: 'portfolio-data',
    name: 'Portfolio Data',
    description: 'Access portfolio information',
    icon: '📊',
    enabled: true, // Always enabled
  },
];
