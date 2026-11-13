type IconProps = { className?: string };

export function ArrowIcon({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckIcon({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none"><path d="m4 10 3.5 3.5L16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function MenuIcon({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

export function CloseIcon({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.56 7.48L3.5 20.5l1.25-4.26A8.5 8.5 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8.35 7.5c.16-.37.32-.37.54-.38h.46c.14 0 .36.05.55.45.2.48.7 1.7.76 1.82.06.12.1.27.02.43-.08.16-.12.27-.24.41-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.23.61 1 1.31 1.62.9.8 1.65 1.05 1.89 1.17.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14-.2.55-1.15 1.06-1.59 1.12-.4.06-.9.09-1.45-.08-.34-.11-.78-.26-1.35-.5-2.38-1.03-3.92-3.43-4.04-3.59-.12-.16-.97-1.29-.97-2.46 0-1.16.61-1.74.83-1.98Z" fill="currentColor" /></svg>;
}
