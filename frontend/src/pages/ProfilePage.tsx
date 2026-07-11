import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Upload, Loader2, CheckCircle2, AlertCircle, Camera, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { uploadImage, updateUserAvatar } from '../api/client';

export default function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) return <Navigate to="/login" replace />;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Only JPEG and PNG images are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be 10MB or smaller.');
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const url = await uploadImage(file);
      const updated = await updateUserAvatar(user.id, url);
      setUser({
        ...user,
        avatarUrl: updated.avatarUrl,
      });
      setMessage(t('profile.saved'));
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await updateUserAvatar(user.id, '');
      setUser({
        ...user,
        avatarUrl: updated.avatarUrl,
      });
      setMessage(t('profile.removed'));
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove avatar.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="bg-gray-50/80 min-h-[calc(100vh-4rem)]">
        <div className="max-w-[600px] mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center">
                <User size={24} className="text-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ink">{t('profile.title')}</h1>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>

            {message && (
              <div className="flex items-center gap-2 text-sm text-green font-medium bg-green-50 rounded-xl px-4 py-3">
                <CheckCircle2 size={16} />
                {message}
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500 font-medium bg-red-50 rounded-xl px-4 py-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted mb-3 block">
                  {t('profile.avatar')}
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full bg-green/10 flex items-center justify-center overflow-hidden border-2 border-gray-100">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={32} className="text-green/60" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Loader2 size={24} className="animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="button-base button-primary gap-2 text-sm"
                    >
                      <Upload size={16} />
                      {uploading ? t('profile.uploading') : t('profile.upload')}
                    </button>
                    {user.avatarUrl && (
                      <button
                        onClick={handleRemoveAvatar}
                        disabled={uploading}
                        className="button-base button-ghost gap-2 text-sm text-rose block w-full"
                      >
                        {t('profile.remove')}
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted mt-3">{t('profile.hint')}</p>
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted block">
                  {t('profile.name')}
                </label>
                <p className="text-sm text-ink font-medium">{user.fullName || '—'}</p>

                <label className="text-xs font-bold uppercase tracking-widest text-muted block">
                  {t('profile.username')}
                </label>
                <p className="text-sm text-ink font-medium">{user.username}</p>

                <label className="text-xs font-bold uppercase tracking-widest text-muted block">
                  {t('profile.email')}
                </label>
                <p className="text-sm text-ink font-medium">{user.email}</p>

                <label className="text-xs font-bold uppercase tracking-widest text-muted block">
                  {t('profile.role')}
                </label>
                <p className="text-sm text-ink font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-rose font-medium hover:bg-rose/5 rounded-lg px-4 py-2.5 transition-colors w-full justify-center border border-rose/20"
            >
              <LogOut size={16} />
              {t('auth.logout')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
