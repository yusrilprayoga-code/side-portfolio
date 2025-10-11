import React from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'You are offline',
  description: 'No internet connection available',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated WiFi Off Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-gray-800 rounded-full p-6 border border-red-500/30">
              <WifiOff className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8">
          It looks like you&apos;ve lost your internet connection. 
          Some features may not be available until you&apos;re back online.
        </p>

        {/* Connection Status */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-8 border border-gray-700">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>No Internet Connection</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-gray-700"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Tips */}
        <div className="mt-8 text-left">
          <p className="text-sm text-gray-500 mb-3 font-medium">
            Troubleshooting Tips:
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Check your WiFi or mobile data connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Try turning airplane mode off</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Restart your router if using WiFi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Previously visited pages may still work</span>
            </li>
          </ul>
        </div>

        {/* Fun Animation */}
        <div className="mt-8 text-xs text-gray-600">
          <p>Lost in the digital void... 🌌</p>
        </div>
      </div>
    </div>
  );
}
