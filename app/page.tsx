"use client";

import { useState } from "react";

const crews = [
  { name: "Valora", type: "Finance society", members: 84, color: "violet", emoji: "◈" },
  { name: "Photography Club", type: "Creative community", members: 126, color: "orange", emoji: "✦" },
  { name: "Campus Founders", type: "Startup community", members: 58, color: "blue", emoji: "↗" },
];

const moments = [
  { title: "First Valora meeting", meta: "32 members · yesterday", emoji: "📸" },
  { title: "Parakram finals", meta: "18 members · 4 days ago", emoji: "🏆" },
  { title: "Committee dinner", meta: "11 members · last week", emoji: "🍜" },
];

export default function Home() {
  const [active, setActive] = useState("Home");
  const [mode, setMode] = useState<"student" | "organizer">("student");
  const [liked, setLiked] = useState<number | null>(null);
  const [duelOpen, setDuelOpen] = useState(false);
  const [duelResult, setDuelResult] = useState(false);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">C</span><span>CREW</span></div>
        <div className="mode-switch">
          <button className={mode === "student" ? "active" : ""} onClick={() => setMode("student")}>Student</button>
          <button className={mode === "organizer" ? "active" : ""} onClick={() => setMode("organizer")}>Organizer</button>
        </div>
        <nav>
          {["Home", "Discover", "My Crews", "Moments"].map((item) => (
            <button key={item} className={active === item ? "nav-item active" : "nav-item"} onClick={() => setActive(item)}>
              <span>{item === "Home" ? "⌂" : item === "Discover" ? "⌕" : item === "My Crews" ? "◎" : "▧"}</span>{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-profile"><div className="avatar">T</div><div><strong>Tenzin</strong><small>Student</small></div><span>•••</span></div>
          <div className="sidebar-note">Your communities, without the chaos.</div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">C</span> CREW</div>
          <div className="search">⌕ <span>Search crews, events, people...</span></div>
          <div className="top-actions"><button className="icon-button">⌘</button><button className="profile-dot">T</button></div>
        </header>

        <div className="page-wrap">
          <section className="hero">
            <div>
              <p className="eyebrow">{mode === "student" ? "YOUR CREW, YOUR SPACE" : "ORGANIZER MODE"}</p>
              <h1>Good evening, Tenzin <span>✦</span></h1>
              <p className="hero-copy">Find your people. Get things done. Make the moments worth remembering.</p>
            </div>
            <button className="primary-button" onClick={() => setActive("Discover")}>Explore communities <span>↗</span></button>
          </section>

          {mode === "student" ? (
            <>
              <section className="stats-row">
                <div className="stat"><span>Active crews</span><strong>4</strong><small>+1 this month</small></div>
                <div className="stat"><span>Events joined</span><strong>12</strong><small>3 this week</small></div>
                <div className="stat"><span>Meet streak</span><strong>7 <i>days</i></strong><small>Keep it alive 🔥</small></div>
              </section>

              <div className="grid two-one">
                <section className="card quest-card">
                  <div className="section-head"><div><span className="label orange-label">CREW QUEST</span><h2>Make something people remember.</h2></div><span className="quest-icon">⚡</span></div>
                  <p>Start a tiny business with your crew. Pitch it, build it, and see what happens.</p>
                  <div className="quest-meta"><span>⏱ 3 days left</span><span>👥 8 crews joined</span><button>Join quest ↗</button></div>
                </section>

                <section className="card duel-card">
                  <div className="section-head"><div><span className="label">MEET STREAK</span><h2>Quick Duel</h2></div><span className="duel-flash">↯</span></div>
                  <p>Keep your streak going. Challenge someone from your crew.</p>
                  <div className="streak-line"><strong>7</strong><span>day streak</span><em>+1 today</em></div>
                  <button className="dark-button" onClick={() => { setDuelOpen(true); setDuelResult(false); }}>Challenge a crew mate</button>
                </section>
              </div>

              <section className="section-block">
                <div className="section-title"><div><span className="label">YOUR CREWS</span><h2>Places you belong.</h2></div><button onClick={() => setActive("My Crews")}>See all ↗</button></div>
                <div className="crew-grid">
                  {crews.map((crew) => <article className="crew-card" key={crew.name}>
                    <div className={`crew-logo ${crew.color}`}>{crew.emoji}</div>
                    <div className="crew-info"><h3>{crew.name}</h3><p>{crew.type}</p><span>{crew.members} members</span></div><button className="more">•••</button>
                  </article>)}
                </div>
              </section>

              <div className="grid equal">
                <section className="card takes-card">
                  <div className="section-head"><div><span className="label">TAKES</span><h2>What does the crew think?</h2></div><span className="poll-mark">?</span></div>
                  <p className="poll-question">Best late-night campus food?</p>
                  {["Momos, obviously 🥟", "Maggi supremacy 🍜", "Whatever is still open 🌙"].map((option, index) => <button key={option} className={liked === index ? "poll-option selected" : "poll-option"} onClick={() => setLiked(index)}><span>{option}</span><b>{[48, 31, 21][index]}%</b></button>)}
                </section>

                <section className="card ice-card">
                  <div className="section-head"><div><span className="label">ICEBREAKER</span><h2>Break the awkward silence.</h2></div><span className="ice-icon">✺</span></div>
                  <p>Find someone who has visited another country. You have 2 minutes.</p>
                  <div className="ice-footer"><span>👥 8–30 people</span><button className="outline-button">Start icebreaker</button></div>
                </section>
              </div>

              <section className="section-block moments-section">
                <div className="section-title"><div><span className="label">MOMENTS</span><h2>Your crew's story.</h2></div><button onClick={() => setActive("Moments")}>Open archive ↗</button></div>
                <div className="moments-grid">{moments.map((moment) => <article className="moment" key={moment.title}><div className="moment-image">{moment.emoji}</div><h3>{moment.title}</h3><p>{moment.meta}</p></article>)}</div>
              </section>
            </>
          ) : (
            <section className="organizer-dashboard">
              <div className="dashboard-banner"><div><span className="label">ORGANIZER DASHBOARD</span><h2>Valora is moving.</h2><p>32 members active this week. 2 events coming up.</p></div><button className="primary-button">Create event +</button></div>
              <div className="stats-row"><div className="stat"><span>Members</span><strong>84</strong><small>+12 this month</small></div><div className="stat"><span>Participation</span><strong>78%</strong><small>+9% vs last month</small></div><div className="stat"><span>Tasks open</span><strong>16</strong><small>4 due today</small></div></div>
              <div className="grid equal"><section className="card"><span className="label">NEXT EVENT</span><h2>Valora General Meeting</h2><p>Tomorrow · 5:30 PM · Seminar Hall 2</p><button className="dark-button">Manage event</button></section><section className="card"><span className="label">TASKS</span><h2>Committee to-do</h2><div className="task"><span className="check">✓</span>Finish event poster <small>Today</small></div><div className="task"><span className="check">✓</span>Confirm speakers <small>Tomorrow</small></div><div className="task"><span className="empty-check"></span>Publish Takes poll <small>Friday</small></div></section></div>
            </section>
          )}
        </div>
      </section>

      {duelOpen && <div className="modal-backdrop" onClick={() => setDuelOpen(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>{!duelResult ? <><div className="modal-symbol">↯</div><span className="label">QUICK DUEL</span><h2>Challenge someone.</h2><p>Pick a crew mate and settle a 30-second reaction battle.</p><div className="duel-player"><div className="avatar">A</div><div><strong>Arjun</strong><small>Valora · 5 day streak</small></div><button onClick={() => setDuelResult(true)}>Challenge</button></div><div className="duel-player"><div className="avatar alt">S</div><div><strong>Sonam</strong><small>Valora · 9 day streak</small></div><button onClick={() => setDuelResult(true)}>Challenge</button></div><button className="close-button" onClick={() => setDuelOpen(false)}>Not now</button></> : <><div className="result-symbol">✦</div><span className="label">DUEL SENT</span><h2>Let the rivalry begin.</h2><p>Your streak is safe for now. Your crew mate has been challenged.</p><button className="primary-button full" onClick={() => setDuelOpen(false)}>Back to CREW</button></>}</div></div>}
    </main>
  );
}
