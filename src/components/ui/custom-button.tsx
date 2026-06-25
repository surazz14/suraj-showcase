import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  className, 
  variant = 'default', 
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-button text-button-foreground hover:bg-button/90 shadow-lg hover:shadow-glow transition-all duration-300';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'outline':
        return 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  return (
    <Button
      className={cn(getVariantClasses(), className)}
      {...props}
    />
  );
};
