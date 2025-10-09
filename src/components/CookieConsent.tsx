"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield, Settings } from "lucide-react";

interface CookieConsentProps {
  companyName?: string;
  privacyPolicyUrl?: string;
}

export function CookieConsent({
  companyName = "Yusril Prayoga Portfolio",
  privacyPolicyUrl = "/privacy-policy",
}: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing banner for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error("Failed to parse cookie consent");
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    saveCookieConsent(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(necessaryOnly);
    saveCookieConsent(necessaryOnly);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCustomPreferences = () => {
    saveCookieConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCookieConsent = (prefs: typeof preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());

    // Dispatch custom event for other components to listen
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: prefs })
    );

    // Enable/disable tracking based on preferences
    if (prefs.analytics) {
      // Enable Google Analytics or other analytics
      console.log("Analytics enabled");
    }
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log("Marketing cookies enabled");
    }
    if (prefs.functional) {
      // Enable functional cookies
      console.log("Functional cookies enabled");
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner - Higher z-index to appear above sidebar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 bg-white dark:bg-gray-900 border-t-2 border-orange-500 shadow-2xl animate-slide-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              <Cookie className="w-8 h-8 text-orange-500" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🍪 We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. By clicking &ldquo;Accept All&rdquo;, you
                consent to our use of cookies.{" "}
                <a
                  href={privacyPolicyUrl}
                  className="text-orange-500 hover:text-orange-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={acceptNecessary}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal - Even higher z-index */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Cookie Preferences
                  </h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                Manage your cookie preferences. You can enable or disable
                different types of cookies below.
              </p>

              {/* Necessary Cookies */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Necessary Cookies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Essential for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          analytics: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Marketing Cookies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Used to track visitors and display relevant ads.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          marketing: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Functional Cookies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          functional: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
