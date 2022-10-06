// log the pageview with their URL
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? 'G-T71CQTLD91';
export const GAPageView = (url: string) => {
  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const GAEvent = ({ action, params }: { action: any; params: any }) => {
  window.gtag('event', action, {
    event_category: action,
    event_label: action,
    value: params,
  });
};
