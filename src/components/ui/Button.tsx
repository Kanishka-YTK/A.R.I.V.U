import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', magnetic = true, ...props }, ref) => {

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-rajdhani font-semibold transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ring-offset-bio-black',
                    magnetic && 'btn-magnetic',
                    {
                        'bg-bio-green text-bio-black hover:bg-bio-emerald hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]': variant === 'primary',
                        'bg-bio-gold text-bio-black hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(240,192,64,0.4)]': variant === 'secondary',
                        'bg-bio-black/60 border border-bio-green/30 text-bio-green hover:border-bio-green/70 hover:bg-bio-green/10 backdrop-blur-md': variant === 'glass',
                        'hover:bg-bio-green/10 hover:text-bio-green text-bio-cream': variant === 'ghost',
                        'bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30': variant === 'danger',
                        'h-9 px-4 text-sm tracking-wide': size === 'sm',
                        'h-11 px-6 text-base tracking-wider': size === 'md',
                        'h-14 px-8 text-lg tracking-widest uppercase': size === 'lg',
                        'h-11 w-11': size === 'icon',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
