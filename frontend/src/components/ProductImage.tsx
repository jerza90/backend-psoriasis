interface ProductImageProps {
  name: string;
  category: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

const categoryGradients: Record<string, string> = {
  'Skin Barrier & Immune': 'linear-gradient(135deg, #2a9d8f, #7ed6b5)',
  'Pelindung Kulit & Imun': 'linear-gradient(135deg, #2a9d8f, #7ed6b5)',
  'Inflammatory Response': 'linear-gradient(135deg, #e76f51, #f4a261)',
  'Tindak Balas Keradangan': 'linear-gradient(135deg, #e76f51, #f4a261)',
  'Skin Healing & Immune': 'linear-gradient(135deg, #264653, #2a9d8f)',
  'Penyembuhan Kulit & Imun': 'linear-gradient(135deg, #264653, #2a9d8f)',
  'Mast Cell & Histamine': 'linear-gradient(135deg, #e9c46a, #f4a261)',
  'Sel Mast & Histamin': 'linear-gradient(135deg, #e9c46a, #f4a261)',
  'Gut-Skin Axis': 'linear-gradient(135deg, #2a9d8f, #e9c46a)',
  'Paksi Usus-Kulit': 'linear-gradient(135deg, #2a9d8f, #e9c46a)',
  'Stress & Sleep': 'linear-gradient(135deg, #457b9d, #a8dadc)',
  'Tekanan & Tidur': 'linear-gradient(135deg, #457b9d, #a8dadc)',
  'Stress & Cortisol': 'linear-gradient(135deg, #1d3557, #457b9d)',
  'Tekanan & Kortisol': 'linear-gradient(135deg, #1d3557, #457b9d)',
  'Essential Nutrients': 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
  'Nutrien Penting': 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
};

const categoryIcons: Record<string, string> = {
  'Skin Barrier & Immune': '🛡️',
  'Pelindung Kulit & Imun': '🛡️',
  'Inflammatory Response': '🔥',
  'Tindak Balas Keradangan': '🔥',
  'Skin Healing & Immune': '✨',
  'Penyembuhan Kulit & Imun': '✨',
  'Mast Cell & Histamine': '🌸',
  'Sel Mast & Histamin': '🌸',
  'Gut-Skin Axis': '🌿',
  'Paksi Usus-Kulit': '🌿',
  'Stress & Sleep': '🌙',
  'Tekanan & Tidur': '🌙',
  'Stress & Cortisol': '🧘',
  'Tekanan & Kortisol': '🧘',
  'Essential Nutrients': '🌟',
  'Nutrien Penting': '🌟',
};

const sizeMap = {
  sm: { container: 'w-16 h-16', icon: 'text-xl', initial: 'text-sm' },
  md: { container: 'w-24 h-24', icon: 'text-3xl', initial: 'text-lg' },
  lg: { container: 'w-full h-full', icon: 'text-5xl', initial: 'text-2xl' },
  xl: { container: 'w-40 h-40', icon: 'text-6xl', initial: 'text-3xl' },
  xxl: { container: 'w-56 h-56', icon: 'text-7xl', initial: 'text-4xl' },
};

export default function ProductImage({ name, category, imageUrl, size = 'md', className = '' }: ProductImageProps) {
  const s = sizeMap[size];
  const gradient = categoryGradients[category] || 'linear-gradient(135deg, #2a9d8f, #7ed6b5)';
  const icon = categoryIcons[category] || '💊';

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${s.container} rounded-xl object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${s.container} rounded-xl flex flex-col items-center justify-center ${className}`}
      style={{ background: gradient }}
    >
      <span className={`${s.icon} mb-1`}>{icon}</span>
      <span className={`${s.initial} font-black text-white/90 leading-none`}>
        {name.charAt(0)}
      </span>
      <div className="w-3/4 h-0.5 bg-white/20 rounded-full mt-1.5" />
    </div>
  );
}
