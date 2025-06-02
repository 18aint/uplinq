import { useEffect } from 'react';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// Enhanced Analytics utility functions
export const Analytics = {
  // Track page views
  trackPageView: (pageTitle: string, pagePath: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-L6FK65B70Q', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath
      });
    }
  },

  // Track conversion events
  trackConversion: (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'conversion',
        event_label: eventData?.label || '',
        value: eventData?.value || 0,
        currency: eventData?.currency || 'GBP',
        ...eventData
      });
    }

    // Also track in Clarity if available
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName);
    }
  },

  // Track quote form submissions
  trackQuoteSubmission: (projectType: string, budget: string, timeline: string) => {
    Analytics.trackConversion('quote_submission', {
      project_type: projectType,
      budget_range: budget,
      timeline: timeline,
      label: 'Quote Form Completed'
    });
  },

  // Track contact form submissions
  trackContactSubmission: (source: string = 'contact_form') => {
    Analytics.trackConversion('contact_submission', {
      source: source,
      label: 'Contact Form Completed'
    });
  },

  // Track pricing interactions
  trackPricingInteraction: (action: string, planName: string, price?: string) => {
    Analytics.trackConversion('pricing_interaction', {
      action: action, // 'view_plan', 'click_cta', 'start_checkout'
      plan_name: planName,
      plan_price: price,
      label: `Pricing - ${action}`
    });
  },

  // Track chat interactions
  trackChatInteraction: (action: string, context?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_interaction', {
        event_category: 'engagement',
        action: action, // 'open', 'message_sent', 'close'
        context: context || '',
        label: 'Chat Widget'
      });
    }
  },

  // Track calculator usage
  trackCalculatorUsage: (totalPrice: number, selectedFeatures: string[]) => {
    Analytics.trackConversion('calculator_usage', {
      calculated_price: totalPrice,
      selected_features: selectedFeatures.join(','),
      label: 'Pricing Calculator Used'
    });
  },

  // Track scroll depth for engagement
  trackScrollDepth: (percentage: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        value: percentage,
        label: `Scrolled ${percentage}%`
      });
    }
  },

  // Track external link clicks
  trackExternalLink: (url: string, linkText: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'external_link_click', {
        event_category: 'navigation',
        external_url: url,
        link_text: linkText,
        label: 'External Link'
      });
    }
  },

  // Track file downloads
  trackDownload: (fileName: string, fileType: string) => {
    Analytics.trackConversion('file_download', {
      file_name: fileName,
      file_type: fileType,
      label: 'Resource Download'
    });
  }
};

// Hook for automatic scroll depth tracking
export const useScrollDepthTracking = () => {
  useEffect(() => {
    let maxScrollDepth = 0;
    const trackingThresholds = [25, 50, 75, 90, 100];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track specific thresholds
        trackingThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
            trackedDepths.add(threshold);
            Analytics.trackScrollDepth(threshold);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Component for page-specific analytics initialization
interface AnalyticsProviderProps {
  pageTitle: string;
  pagePath: string;
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  pageTitle,
  pagePath,
  children
}) => {
  useScrollDepthTracking();

  useEffect(() => {
    Analytics.trackPageView(pageTitle, pagePath);
  }, [pageTitle, pagePath]);

  return <>{children}</>;
};

export default Analytics; 