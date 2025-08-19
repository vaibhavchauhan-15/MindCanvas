import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevated = false,
  ...props
}) => {
  return (
    <div 
      className={`card p-6 ${elevated ? 'shadow-lg' : 'shadow-md'} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
