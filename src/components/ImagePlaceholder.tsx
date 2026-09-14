import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: '16:9' | '4:3' | '3:2' | '4:5' | '1:1' | '16:10' | '3:4';
  className?: string;
  dark?: boolean;
}

export function ImagePlaceholder({ label, aspectRatio = '3:2', className, dark = false }: ImagePlaceholderProps) {
  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    '4:5': 'aspect-[4/5]',
    '1:1': 'aspect-square',
    '16:10': 'aspect-[16/10]',
    '3:4': 'aspect-[3/4]',
  };

  return (
    <div 
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        'relative overflow-hidden flex items-center justify-center rounded-sm',
        aspectClasses[aspectRatio],
        dark ? 'bg-brand-teal/10' : 'bg-brand-eucalyptus/20',
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 hover:opacity-10 transition-opacity duration-[2000ms]"
      />
      <div className="absolute inset-0 border border-brand-teal/10 rounded-sm pointer-events-none" />
      <span className={cn(
        'text-center px-6 font-display italic tracking-wide text-lg md:text-xl pointer-events-none',
        dark ? 'text-brand-teal' : 'text-brand-espresso/60'
      )}>
        {label}
      </span>
    </div>
  );
}
