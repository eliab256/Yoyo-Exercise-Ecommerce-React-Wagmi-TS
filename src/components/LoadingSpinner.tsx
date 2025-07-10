interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    className?: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'blue-500', className = '' }) => {
    const sizeClasses = {
        xs: 'w-[20%] h-[20%] border-[1px]',
        sm: 'w-[40%] h-[40%] border-[2px]',
        md: 'w-[60%] h-[60%] border-[3px]',
        lg: 'w-[80%] h-[80%] border-[4px]',
        xl: 'w-full h-full border-[5px]',
    };

    return (
        <div
            className={`
        ${sizeClasses[size]} 
        border-gray-200 
        border-t-${color} 
        rounded-full 
        animate-spin
        ${className}
      `}
        />
    );
};

export default LoadingSpinner;
