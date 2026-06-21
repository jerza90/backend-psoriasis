import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Save, ArrowLeft, RefreshCw, MoveUpRight } from 'lucide-react';
import {
  createAdminTestimonial,
  deleteAdminTestimonial,
  listAdminTestimonials,
  updateAdminTestimonial,
  type AdminTestimonialInput,
  type AdminTestimonialProgressInput,
  type TestimonialResponse,
} from '../api/client';

type ProgressDraft = {
  dateLabel: string;
  title: string;
  description: string;
  notes: string;
  tipsText: string;
  imagesText: string;
  productTagsText: string;
  detailsJson: string;
  sortOrder: number;
};

type TestimonialDraft = Omit<AdminTestimonialInput, 'progressHistory'> & {
  id?: number;
  progressDraft: ProgressDraft[];
};

function blankProgressDraft(): ProgressDraft {
  return {
    dateLabel: '',
    title: '',
    description: '',
    notes: '',
    tipsText: '',
    imagesText: '',
    productTagsText: '',
    detailsJson: '{}',
    sortOrder: 0,
  };
}

function blankDraft(): TestimonialDraft {
  return {
    name: '',
    location: '',
    conditionDuration: '',
    categories: [],
    summary: '',
    initialQuote: '',
    resultQuote: '',
    featured: false,
    avatarUrl: '',
    lang: 'ms',
    sortOrder: 0,
    status: 'active',
    affiliateId: null,
    progressDraft: [blankProgressDraft()],
  };
}

function splitList(text: string) {
  return text
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(text: string) {
  return text
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseDetails(jsonText: string) {
  if (!jsonText.trim()) return {};
  try {
    return JSON.parse(jsonText);
  } catch {
    return {};
  }
}

function parseProductTags(text: string) {
  return splitLines(text).map((line) => {
    const [name, slug] = line.split('|').map((part) => part.trim());
    return slug ? { name, slug } : { name };
  });
}

function draftFromTestimonial(t: TestimonialResponse): TestimonialDraft {
  return {
    id: t.id,
    affiliateId: null,
    name: t.name,
    location: t.location || '',
    conditionDuration: t.conditionDuration || '',
    categories: t.categories || [],
    summary: t.summary || '',
    initialQuote: t.initialQuote || '',
    resultQuote: t.resultQuote || '',
    featured: t.featured,
    avatarUrl: t.avatarUrl || '',
    lang: t.lang || 'ms',
    sortOrder: 0,
    status: 'active',
    progressDraft: (t.progressHistory?.length ? t.progressHistory : [null]).map((entry, index) => {
      if (!entry) return blankProgressDraft();
      return {
        dateLabel: entry.dateLabel || '',
        title: entry.title || '',
        description: entry.description || '',
        notes: entry.notes || '',
        tipsText: (entry.tips || []).join('\n'),
        imagesText: (entry.images || []).join('\n'),
        productTagsText: (entry.productTags || [])
          .map((tag) => tag.slug ? `${tag.name}|${tag.slug}` : tag.name)
          .join('\n'),
        detailsJson: JSON.stringify(entry.details || {}, null, 2),
        sortOrder: index,
      };
    }),
  };
}

function draftToPayload(draft: TestimonialDraft): AdminTestimonialInput {
  return {
    affiliateId: draft.affiliateId ?? null,
    name: draft.name.trim(),
    location: draft.location.trim(),
    conditionDuration: draft.conditionDuration.trim(),
    categories: draft.categories,
    summary: draft.summary.trim(),
    initialQuote: draft.initialQuote.trim(),
    resultQuote: draft.resultQuote.trim(),
    featured: draft.featured,
    avatarUrl: draft.avatarUrl.trim(),
    lang: draft.lang.trim().slice(0, 2).toLowerCase() || 'ms',
    sortOrder: draft.sortOrder,
    status: draft.status.trim() || 'active',
    progressHistory: draft.progressDraft.map((item, index) => ({
      dateLabel: item.dateLabel.trim(),
      title: item.title.trim(),
      description: item.description.trim(),
      notes: item.notes.trim(),
      tips: splitLines(item.tipsText),
      images: splitLines(item.imagesText),
      productTags: parseProductTags(item.productTagsText),
      details: parseDetails(item.detailsJson),
      sortOrder: item.sortOrder ?? index,
    })) as AdminTestimonialProgressInput[],
  };
}

export default function AdminTestimonialsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<TestimonialResponse[]>([]);
  const [selected, setSelected] = useState<TestimonialDraft>(blankDraft());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = useMemo(() => typeof selected.id === 'number', [selected.id]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await listAdminTestimonials();
      setItems(data);
      if (!selected.id && data.length > 0) {
        setSelected(draftFromTestimonial(data[0]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const payload = draftToPayload(selected);
      const saved = selected.id
        ? await updateAdminTestimonial(selected.id, payload)
        : await createAdminTestimonial(payload);
      setSelected(draftFromTestimonial(saved));
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this testimonial?')) return;
    setSaving(true);
    setError(null);
    try {
      await deleteAdminTestimonial(id);
      setSelected(blankDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
    } finally {
      setSaving(false);
    }
  }

  function updateProgress(index: number, patch: Partial<ProgressDraft>) {
    setSelected((current) => {
      const next = [...current.progressDraft];
      next[index] = { ...next[index], ...patch };
      return { ...current, progressDraft: next };
    });
  }

  return (
    <div className="min-h-screen">
      <div className="container-main py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-green transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="clamp-heading-md">Testimonial Admin</h1>
            <p className="text-muted mt-2">
              Manage healing stories, progress steps, and featured cards from one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelected(blankDraft())}
              className="button-base button-secondary gap-2"
            >
              <Plus size={16} />
              New
            </button>
            <button
              onClick={() => void refresh()}
              className="button-base button-secondary gap-2"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose/30 bg-rose/5 p-4 text-rose text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
          <aside className="glass-card rounded-2xl p-4">
            <h2 className="font-bold mb-3">Stories</h2>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
              {loading && <p className="text-sm text-muted">Loading...</p>}
              {!loading && items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(draftFromTestimonial(item))}
                  className={`w-full text-left rounded-xl p-3 transition-all border ${
                    selected.id === item.id
                      ? 'bg-green/10 border-green/30'
                      : 'border-white/10 hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-muted">{item.lang.toUpperCase()} · {item.location}</div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${item.featured ? 'bg-gold/15 text-gold' : 'bg-white/40 text-muted'}`}>
                      {item.featured ? 'Featured' : 'Story'}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-2 line-clamp-2">{item.summary}</p>
                </button>
              ))}
              {!loading && items.length === 0 && (
                <p className="text-sm text-muted">No testimonials yet.</p>
              )}
            </div>
          </aside>

          <main className="glass-card rounded-2xl p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="font-bold text-lg">{isEditing ? 'Edit testimonial' : 'Create testimonial'}</h2>
                <p className="text-sm text-muted">Fill the profile, then add the journey steps below.</p>
              </div>
              <div className="flex items-center gap-2">
                {selected.id && (
                  <button
                    onClick={() => void handleDelete(selected.id!)}
                    className="button-base button-secondary gap-2 text-rose"
                    disabled={saving}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
                <button
                  onClick={() => void handleSave()}
                  className="button-base button-primary gap-2"
                  disabled={saving}
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" value={selected.name} onChange={(v) => setSelected({ ...selected, name: v })} />
              <Field label="Avatar URL" value={selected.avatarUrl} onChange={(v) => setSelected({ ...selected, avatarUrl: v })} />
              <Field label="Location" value={selected.location} onChange={(v) => setSelected({ ...selected, location: v })} />
              <Field label="Condition duration" value={selected.conditionDuration} onChange={(v) => setSelected({ ...selected, conditionDuration: v })} />
              <Field label="Language" value={selected.lang} onChange={(v) => setSelected({ ...selected, lang: v })} />
              <Field label="Sort order" value={String(selected.sortOrder)} onChange={(v) => setSelected({ ...selected, sortOrder: Number(v) || 0 })} type="number" />
              <Field label="Status" value={selected.status} onChange={(v) => setSelected({ ...selected, status: v })} />
              <Field label="Categories (comma separated)" value={selected.categories.join(', ')} onChange={(v) => setSelected({ ...selected, categories: splitList(v) })} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <Textarea label="Summary" value={selected.summary} onChange={(v) => setSelected({ ...selected, summary: v })} />
              <Textarea label="Initial quote" value={selected.initialQuote} onChange={(v) => setSelected({ ...selected, initialQuote: v })} />
              <Textarea label="Result quote" value={selected.resultQuote} onChange={(v) => setSelected({ ...selected, resultQuote: v })} />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-bold">Progress steps</h3>
              <button
                onClick={() => setSelected({ ...selected, progressDraft: [...selected.progressDraft, blankProgressDraft()] })}
                className="button-base button-secondary gap-2 text-sm"
              >
                <Plus size={14} />
                Add step
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {selected.progressDraft.map((step, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-white/35 p-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="font-semibold text-sm">Step {index + 1}</div>
                    <button
                      onClick={() => setSelected({
                        ...selected,
                        progressDraft: selected.progressDraft.filter((_, i) => i !== index),
                      })}
                      className="text-xs text-rose hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Date label" value={step.dateLabel} onChange={(v) => updateProgress(index, { dateLabel: v })} />
                    <Field label="Sort order" value={String(step.sortOrder)} onChange={(v) => updateProgress(index, { sortOrder: Number(v) || 0 })} type="number" />
                  </div>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    <Field label="Title" value={step.title} onChange={(v) => updateProgress(index, { title: v })} />
                    <Textarea label="Description" value={step.description} onChange={(v) => updateProgress(index, { description: v })} />
                    <Textarea label="Notes" value={step.notes} onChange={(v) => updateProgress(index, { notes: v })} />
                    <Textarea label="Tips, one per line" value={step.tipsText} onChange={(v) => updateProgress(index, { tipsText: v })} />
                    <Textarea label="Images, one per line" value={step.imagesText} onChange={(v) => updateProgress(index, { imagesText: v })} />
                    <Textarea label="Product tags, one per line as name|slug" value={step.productTagsText} onChange={(v) => updateProgress(index, { productTagsText: v })} />
                    <Textarea label="Details JSON" value={step.detailsJson} onChange={(v) => updateProgress(index, { detailsJson: v })} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={selected.featured}
                  onChange={(e) => setSelected({ ...selected, featured: e.target.checked })}
                />
                Featured story
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <MoveUpRight size={12} />
                Changes save back to the backend API
              </span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-3 py-2 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-white/10 bg-white/60 px-3 py-2 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10"
      />
    </label>
  );
}
