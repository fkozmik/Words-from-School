const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
  success: 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white',
  completed: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
  danger: 'bg-red-500/80 hover:bg-red-600 text-white',
  warning: 'bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white',
  secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
  letter: 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl',
  ghost: 'bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white',
  menuItem: 'bg-transparent hover:bg-white/20 text-white text-left',
};

const sizes = {
  sm: 'px-4 py-2 text-base',
  md: 'px-8 py-4 text-xl',
  lg: 'px-10 py-8 text-4xl',
  icon: 'p-6',
  iconSm: 'p-3',
  menu: 'px-4 py-3',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  pulse = false,
  className = '',
  ...props
}) => {
  const noScale = variant === 'ghost' || variant === 'menuItem';
  const baseClasses = `font-bold ${noScale ? '' : 'hover:scale-105'} transition-all touch-manipulation select-none flex items-center gap-2 ${variant === 'menuItem' ? '' : 'justify-center'}`;
  const roundedClasses = { full: 'rounded-full', '2xl': 'rounded-2xl', xl: 'rounded-xl' };
  const roundedClass = roundedClasses[rounded] || 'rounded-full';
  const pulseClass = pulse ? 'animate-pulse' : '';
  const scaleClass = size === 'lg' || size === 'icon' ? 'hover:scale-110 active:scale-95' : '';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${roundedClass} ${pulseClass} ${scaleClass} ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
