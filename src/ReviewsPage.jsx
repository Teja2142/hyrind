import React, { useMemo, useState } from "react";

// ReviewsPage.jsx
// Single-file React component with internal CSS (responsive masonry layout)
// - Masonry layout using CSS columns
// - 12 sample testimonial cards (easy to expand)
// - Optional video testimonials (opens in modal)
// - Filter by job role (Data, QA, BA, Dev, PM)
// - Internal CSS only (no external files)

export default function ReviewsPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [videoOpen, setVideoOpen] = useState(null); // video URL

  const roles = ["All", "Data", "QA", "BA", "Dev", "PM", "UX"];

  // sample testimonials (12). Replace or append as required.
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: "Riya Sharma",
      role: "Data",
      company: "Insight Labs",
      text: "The onboarding and mentorship were exceptional. I quickly moved from junior to contributor-level tasks, learned production best-practices and felt supported every step of the way.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "QA",
      company: "QualityWorks",
      text: "Great exposure to real-world testing scenarios — automation training and manual testing practices that actually matter in the industry.",
      avatar: "https://i.pravatar.cc/150?img=5",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // example optional video
    },
    {
      id: 3,
      name: "Sana Khan",
      role: "BA",
      company: "BridgeSolutions",
      text: "As a business analyst I found the cross-team collaboration excellent. Stakeholder communication templates and workshops were super helpful.",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: 4,
      name: "Karthik Rao",
      role: "Dev",
      company: "ByteCraft",
      text: "Challenging projects and a strong code review culture accelerated my growth — and I loved the hack-day vibes!",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 5,
      name: "Meera Iyer",
      role: "PM",
      company: "Summit Products",
      text: "Product-first thinking and autonomy made it easy to ship quick experiments and learn from real users.",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Dev",
      company: "Cloudware",
      text: "Excellent infrastructure support and clear CI/CD pipelines — my deploy anxiety is gone.",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 7,
      name: "Neha Verma",
      role: "Data",
      company: "Analytica",
      text: "Hands-on mentorship on model evaluation, feature engineering tips and an excellent data platform to experiment on.",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 8,
      name: "Rohit Desai",
      role: "QA",
      company: "TestHive",
      text: "They invested in my automation skills and helped me introduce a stable test-suite that reduced regression time by weeks.",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 9,
      name: "Priya Nair",
      role: "BA",
      company: "ClearPath",
      text: "Excellent exposure to stakeholder workshops, user-story writing, and requirements grooming sessions.",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    {
      id: 10,
      name: "Siddharth Menon",
      role: "Dev",
      company: "Nebula Tech",
      text: "Open culture and regular knowledge-sharing sessions helped me level up quickly.",
      avatar: "https://i.pravatar.cc/150?img=20",
      videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
    {
      id: 11,
      name: "Anjali Gupta",
      role: "UX",
      company: "DesignGrid",
      text: "I enjoyed collaborative design critiques and rapid prototyping support — designers had a clear voice in product decisions.",
      avatar: "https://i.pravatar.cc/150?img=25",
    },
    {
      id: 12,
      name: "Rahul Mehta",
      role: "PM",
      company: "Orion Labs",
      text: "Cross-functional trust and a strong metrics-driven approach made it easy to prioritize the right work.",
      avatar: "https://i.pravatar.cc/150?img=30",
    },
  ], []);

  const filtered = testimonials.filter((t) => {
    const matchesRole = roleFilter === "All" || t.role === roleFilter;
    const matchesSearch =
      search.trim() === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.text.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="reviews-page-root">
      <style>{`
        .reviews-page-root{ font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:24px; color:#111 }
        .header { display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px }
        .title { font-size:24px; font-weight:700 }
        .subtitle { font-size:14px; color:#666 }

        .controls { display:flex; gap:12px; align-items:center; flex-wrap:wrap }
        .search { padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0; min-width:220px }
        .filters { display:flex; gap:8px; flex-wrap:wrap }
        .filter-btn { padding:8px 12px; border-radius:999px; border:1px solid #e2e8f0; background:#fff; cursor:pointer; font-size:13px }
        .filter-btn.active { background:#111; color:#fff; border-color:#111 }

        /* masonry layout using columns */
        .masonry { column-gap:1rem }
        .card { display:inline-block; width:100%; background:#fff; border-radius:12px; padding:14px; margin:0 0 1rem; box-shadow:0 6px 18px rgba(17,24,39,0.06); break-inside:avoid; }
        .card .meta { display:flex; gap:12px; align-items:center; margin-bottom:8px }
        .avatar { width:56px; height:56px; border-radius:50%; object-fit:cover; border:2px solid #f1f5f9 }
        .meta .name { font-weight:600 }
        .meta .role { font-size:12px; color:#475569 }
        .text { font-size:14px; color:#0f172a; line-height:1.45; margin-bottom:10px }
        .company { font-size:12px; color:#475569 }
        .card .video-thumb { width:100%; border-radius:8px; overflow:hidden; cursor:pointer; margin-top:8px }
        .video-thumb img { width:100%; height:auto; display:block }

        /* empty state */
        .empty { text-align:center; color:#64748b; padding:32px }

        /* responsive column counts */
        @media (min-width: 0px){ .masonry { column-count:1 } }
        @media (min-width: 640px){ .masonry { column-count:2 } }
        @media (min-width: 1024px){ .masonry { column-count:3 } }
        @media (min-width: 1400px){ .masonry { column-count:4 } }

        /* modal for video */
        .modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(2,6,23,0.6); z-index:60 }
        .modal .inner { width:min(1100px, 96%); background:#000; border-radius:8px; overflow:hidden }
        .modal .close { position:absolute; top:16px; right:18px; background:#fff; border-radius:999px; padding:6px 8px; cursor:pointer; }

        /* toolbar small tweaks */
        .toolbar { display:flex; gap:8px; align-items:center }
        .count-badge { background:#eef2ff; color:#3730a3; padding:6px 10px; border-radius:999px; font-weight:600; font-size:13px }

      `}</style>

      <div className="header">
        <div>
          <div className="title">Reviews & Testimonials</div>
          <div className="subtitle">Real stories from people across Data, QA, Dev, BA and Product.</div>
        </div>

        <div className="controls">
          <div className="toolbar">
            <div className="count-badge">{filtered.length} results</div>
          </div>

          <input
            className="search"
            placeholder="Search by name, company or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters" role="tablist" aria-label="Filter by role">
            {roles.map((r) => (
              <button
                key={r}
                className={`filter-btn ${r === roleFilter ? "active" : ""}`}
                onClick={() => setRoleFilter(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="masonry">
        {filtered.length === 0 ? (
          <div className="empty">No testimonials match your search.</div>
        ) : (
          filtered.map((t) => (
            <article key={t.id} className="card" aria-labelledby={`t-${t.id}`}>
              <div className="meta">
                <img className="avatar" src={t.avatar} alt={`${t.name} avatar`} />
                <div>
                  <div id={`t-${t.id}`} className="name">{t.name}</div>
                  <div className="role">{t.role} • <span className="company">{t.company}</span></div>
                </div>
              </div>

              <div className="text">{t.text}</div>

              {t.videoUrl ? (
                <div
                  className="video-thumb"
                  onClick={() => setVideoOpen(t.videoUrl)}
                  role="button"
                  aria-label={`Open video testimonial from ${t.name}`}
                >
                  {/* simple thumbnail using YouTube embed pattern - if you use private videos replace with actual thumbnails */}
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(t.videoUrl)}/hqdefault.jpg`}
                    alt={`Video thumbnail for ${t.name}`}
                  />
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>

      {videoOpen ? (
        <div className="modal" onClick={() => setVideoOpen(null)}>
          <div className="inner" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setVideoOpen(null)} aria-label="Close video">✕</button>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={videoOpen}
                title="testimonial video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// small helper to extract the YouTube video id from an embed-style or url-style string
function extractYouTubeId(url) {
  // url can be an embed like https://www.youtube.com/embed/ID or a full share URL
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
      return u.pathname.split("/").pop();
    }
    // try v= param
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    // youtu.be short link
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
  } catch (e) {
    // fallback: attempt to match common patterns
    const m = url.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : "";
  }
  return "";
}
