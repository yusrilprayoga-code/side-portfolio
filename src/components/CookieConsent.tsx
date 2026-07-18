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
      <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t-2 border-line bg-bg p-4 animate-slide-up md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              <Cookie className="h-8 w-8 text-accent" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-tight">
                We value your privacy
              </h3>
              <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted">
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. By clicking &ldquo;Accept All&rdquo;, you
                consent to our use of cookies.{" "}
                <a
                  href={privacyPolicyUrl}
                  className="text-fg underline decoration-2 underline-offset-4 hover:decoration-accent"
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
                  className="border-2 border-line bg-fg px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-bg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptNecessary}
                  className="border-2 border-line px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-fg transition-colors hover:bg-fg hover:text-bg"
                >
                  Necessary Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 border-2 border-line px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={acceptNecessary}
              className="flex-shrink-0 p-2 text-muted transition-colors hover:text-fg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal - Even higher z-index */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-fg/60 p-4 animate-fade-in">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border-2 border-line bg-bg shadow-brutal-lg"
            data-lenis-prevent>
            {/* Header */}
            <div className="sticky top-0 border-b-2 border-line bg-bg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                    Cookie Preferences
                  </h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-muted transition-colors hover:text-fg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-muted">
                Manage your cookie preferences. You can enable or disable
                different types of cookies below.
              </p>

              {/* Necessary Cookies */}
              <div className="border-2 border-line p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="mb-1 font-display font-bold uppercase tracking-wide">
                      Necessary Cookies
                    </h3>
                    <p className="text-sm text-muted">
                      Essential for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-5 w-5 accent-[#ff3d00] disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-2 border-line p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="mb-1 font-display font-bold uppercase tracking-wide">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-muted">
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
                      className="h-5 w-5 cursor-pointer accent-[#ff3d00]"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-2 border-line p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="mb-1 font-display font-bold uppercase tracking-wide">
                      Marketing Cookies
                    </h3>
                    <p className="text-sm text-muted">
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
                      className="h-5 w-5 cursor-pointer accent-[#ff3d00]"
                    />
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-2 border-line p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="mb-1 font-display font-bold uppercase tracking-wide">
                      Functional Cookies
                    </h3>
                    <p className="text-sm text-muted">
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
                      className="h-5 w-5 cursor-pointer accent-[#ff3d00]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t-2 border-line bg-bg p-6">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="border-2 border-line px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-fg transition-colors hover:bg-fg hover:text-bg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="border-2 border-line bg-fg px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-bg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
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
