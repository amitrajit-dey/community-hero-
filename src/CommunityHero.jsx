import { useState, useMemo } from "react";
import { MapPin, Camera, ThumbsUp, CheckCircle2, Clock, AlertCircle, TrendingUp, Award, Filter, Plus, X } from "lucide-react";

const COLORS = {
  bg: "#FAF7F0",
  forest: "#1B4332",
  forestLight: "#2D6A4F",
  terracotta: "#C9622B",
  sky: "#4A90A4",
  charcoal: "#2D2D2D",
  cream: "#F1EBDD",
  border: "#DDD4BF",
};

const categoryMeta = {
  Pothole: { color: COLORS.terracotta, icon: "🕳️" },
  "Water Leak": { color: COLORS.sky, icon: "💧" },
  Streetlight: { color: "#B8860B", icon: "💡" },
  Waste: { color: "#6B7C32", icon: "🗑️" },
  Other: { color: "#8A6FB0", icon: "📍" },
};

const initialIssues = [
  { id: 1, title: "Large pothole on MG Road", category: "Pothole", status: "verified", upvotes: 34, area: "Sector 12", reported: "2 days ago", desc: "Deep pothole causing traffic to swerve, near the bus stop." },
  { id: 2, title: "Leaking pipeline near park entrance", category: "Water Leak", status: "in_progress", upvotes: 51, area: "Sector 9", reported: "5 days ago", desc: "Continuous water leak flooding the footpath every morning." },
  { id: 3, title: "Streetlight out for 2 weeks", category: "Streetlight", status: "reported", upvotes: 12, area: "Sector 12", reported: "1 day ago", desc: "Dark stretch of road, safety concern at night." },
  { id: 4, title: "Overflowing garbage bin", category: "Waste", status: "resolved", upvotes: 28, area: "Sector 7", reported: "1 week ago", desc: "Bin not collected for days, attracting strays." },
  { id: 5, title: "Broken footpath tiles", category: "Other", status: "reported", upvotes: 8, area: "Sector 9", reported: "3 hours ago", desc: "Loose tiles tripping pedestrians outside the market." },
];

const statusMeta = {
  reported: { label: "Reported", color: "#8A6FB0" },
  verified: { label: "Verified", color: COLORS.sky },
  in_progress: { label: "In progress", color: COLORS.terracotta },
  resolved: { label: "Resolved", color: COLORS.forestLight },
};

export default function CommunityHeroApp() {
  const [issues, setIssues] = useState(initialIssues);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Pothole", area: "", desc: "" });
  const [tab, setTab] = useState("feed");

  const filtered = useMemo(() => {
    if (filter === "All") return issues;
    return issues.filter(i => i.category === filter);
  }, [issues, filter]);

  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === "resolved").length,
    inProgress: issues.filter(i => i.status === "in_progress").length,
    points: issues.reduce((s, i) => s + i.upvotes, 0),
  };

  function upvote(id) {
    setIssues(is => is.map(i => i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i));
  }
  function submitIssue() {
    if (!form.title.trim() || !form.area.trim()) return;
    setIssues(is => [{
      id: Date.now(), title: form.title, category: form.category, status: "reported",
      upvotes: 1, area: form.area, reported: "just now", desc: form.desc,
    }, ...is]);
    setForm({ title: "", category: "Pothole", area: "", desc: "" });
    setShowForm(false);
  }

  const leaderboard = [
    { name: "Aanya R.", points: 142 },
    { name: "Rohan K.", points: 118 },
    { name: "You", points: 76 },
    { name: "Priya S.", points: 64 },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100%", color: COLORS.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .ch-display { font-family: 'Fraunces', serif; }
        .ch-card:hover { box-shadow: 0 4px 14px rgba(27,67,50,0.08); transform: translateY(-1px); }
        .ch-card { transition: all .15s ease; }
        .ch-btn:active { transform: scale(0.97); }
        .ch-chip { transition: all .15s ease; }
      `}</style>

      {/* Header */}
      <div style={{ background: COLORS.forest, color: "#fff", padding: "20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="ch-display" style={{ fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <MapPin size={22} /> Community Hero
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.75, marginTop: 2 }}>Hyperlocal problem solving for Gharroli, Delhi</div>
          </div>
          <button onClick={() => setShowForm(true)} className="ch-btn" style={{
            background: COLORS.terracotta, color: "#fff", border: "none", borderRadius: 10,
            padding: "10px 18px", fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <Plus size={16} /> Report issue
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 40px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
          {[{ k: "feed", label: "Issue feed" }, { k: "dashboard", label: "Impact dashboard" }, { k: "leaderboard", label: "Leaderboard" }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              background: "none", border: "none", padding: "10px 14px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              color: tab === t.k ? COLORS.forest : "#8C8676",
              borderBottom: tab === t.k ? `2px solid ${COLORS.forest}` : "2px solid transparent",
            }}>{t.label}</button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 10 }}>
            {[
              { label: "Issues reported", value: stats.total, icon: AlertCircle, color: COLORS.terracotta },
              { label: "In progress", value: stats.inProgress, icon: Clock, color: COLORS.sky },
              { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: COLORS.forestLight },
              { label: "Community points", value: stats.points, icon: TrendingUp, color: "#8A6FB0" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "16px" }}>
                <s.icon size={18} color={s.color} />
                <div className="ch-display" style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#8C8676" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "leaderboard" && (
          <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontWeight: 600 }}>
              <Award size={18} color={COLORS.terracotta} /> Top contributors this month
            </div>
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: i ? `1px solid ${COLORS.border}` : "none" }}>
                <div className="ch-display" style={{ width: 24, fontWeight: 700, color: i === 0 ? COLORS.terracotta : "#8C8676" }}>{i + 1}</div>
                <div style={{ flex: 1, fontWeight: p.name === "You" ? 700 : 500 }}>{p.name}</div>
                <div style={{ color: COLORS.forest, fontWeight: 600 }}>{p.points} pts</div>
              </div>
            ))}
          </div>
        )}

        {tab === "feed" && (
          <>
            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: "#8C8676" }}><Filter size={13} /> Filter:</span>
              {["All", ...Object.keys(categoryMeta)].map(c => (
                <button key={c} onClick={() => setFilter(c)} className="ch-chip" style={{
                  border: `1px solid ${filter === c ? COLORS.forest : COLORS.border}`,
                  background: filter === c ? COLORS.forest : "#fff",
                  color: filter === c ? "#fff" : COLORS.charcoal,
                  borderRadius: 999, padding: "6px 13px", fontSize: 12.5, cursor: "pointer", fontWeight: 500,
                }}>{c}</button>
              ))}
            </div>

            {/* Issue list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(issue => {
                const cat = categoryMeta[issue.category];
                const st = statusMeta[issue.status];
                return (
                  <div key={issue.id} className="ch-card" style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 17 }}>{cat.icon}</span>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{issue.title}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#5B5448", marginBottom: 8, lineHeight: 1.5 }}>{issue.desc}</div>
                        <div style={{ display: "flex", gap: 10, fontSize: 11.5, color: "#8C8676", alignItems: "center" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={11} /> {issue.area}</span>
                          <span>·</span>
                          <span>{issue.reported}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <span style={{
                          fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                          background: `${st.color}1A`, color: st.color, whiteSpace: "nowrap",
                        }}>{st.label}</span>
                        <button onClick={() => upvote(issue.id)} className="ch-btn" style={{
                          display: "flex", alignItems: "center", gap: 5, background: COLORS.cream, border: "none",
                          borderRadius: 999, padding: "5px 11px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: COLORS.forest,
                        }}>
                          <ThumbsUp size={13} /> {issue.upvotes}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", color: "#8C8676", padding: 40, fontSize: 13.5 }}>
                  No issues in this category yet.
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Report modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(27,67,50,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 420 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="ch-display" style={{ fontSize: 19, fontWeight: 700 }}>Report an issue</div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8C8676" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="What's the issue?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, outline: "none" }} />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, outline: "none", background: "#fff" }}>
                {Object.keys(categoryMeta).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Area / sector" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}
                style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, outline: "none" }} />
              <textarea placeholder="Describe what you see…" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={3}
                style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, outline: "none", resize: "none", fontFamily: "inherit" }} />
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: `1px dashed ${COLORS.border}`,
                borderRadius: 10, padding: "10px", fontSize: 12.5, color: "#8C8676", background: COLORS.cream, cursor: "pointer",
              }}>
                <Camera size={15} /> Attach photo (AI auto-categorizes)
              </button>
              <button onClick={submitIssue} className="ch-btn" style={{
                background: COLORS.forest, color: "#fff", border: "none", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 4,
              }}>Submit report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
