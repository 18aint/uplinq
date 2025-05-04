import { FC } from 'react';

export const ClipboardIcon: FC<{className?: string}> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="7" y="4" width="10" height="16" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M9 4V2h6v2" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const WebIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const StoreIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M4 7h16l-1.5 9.5a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 7z" strokeWidth={2} stroke="currentColor" />
    <path d="M9 22V12h6v10" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const LandingIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M4 10h16" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const MobileIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="7" y="2" width="10" height="20" rx="2" strokeWidth={2} stroke="currentColor" />
    <circle cx="12" cy="18" r="1" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const UserIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="8" r="4" strokeWidth={2} stroke="currentColor" />
    <path d="M4 20v-1a7 7 0 0114 0v1" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const CMSIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M4 9h16" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const PaymentsIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="2" y="7" width="20" height="10" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M2 11h20" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const ChatIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const NotificationIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const AdminIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M16 3v4M8 3v4" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const ReportingIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M8 16v-4M12 16v-8M16 16v-2" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const ComplexityIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 6v6l4 2" strokeWidth={2} stroke="currentColor" />
    <circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const TimelineIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" />
    <path d="M12 6v6l4 2" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const SEOIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" />
    <path d="M8 12l2 2 4-4" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const AnalyticsIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M8 16v-4M12 16v-8M16 16v-2" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const MaintenanceIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 8v4l3 3" strokeWidth={2} stroke="currentColor" />
    <circle cx="12" cy="12" r="10" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const ContentIcon: FC<{className?: string}> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M8 8h8M8 12h8M8 16h4" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const EditIcon: FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const RemoveIcon: FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} stroke="currentColor" />
  </svg>
);

export const EmailIcon: FC<{className?: string}> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} stroke="currentColor" />
    <path d="M3 7l9 6 9-6" strokeWidth={2} stroke="currentColor" />
  </svg>
); 