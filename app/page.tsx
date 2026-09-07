"use client";

import { useState } from "react";

const moments = [
  { title: "Committee chaos", emoji: "📸" },
  { title: "Prarambh finals", emoji: "🏆" },
  { title: "That one meeting 😂", emoji: "🍜" },
];

export default function Home() {
  const [active, setActive] = useState("Home");
  const [mode, setMode] = useState<"student" | "organizer">("student");
  const [toastMessage, setToastMessage] = useState("");
  const [votes, setVotes] = useState<Record<number, string>>({});
  const [duelOpen, setDuelOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);
  const [reaction, setReaction] = useState<number | null>(null);
  const [targetPosition, setTargetPosition] = useState({ left: 45, top: 50 });

  const toast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2600);
  };

  const vote = (poll: number, option: string) => {
    setVotes((current) => ({ ...current, [poll]: option }));
    toast("Vote locked in. Democracy has spoken. 🗳️");
  };

  const startGame = () => {
    setGameStarted(true);
    setReaction(null);
    setTargetVisible(false);
    window.setTimeout(() => {
      setTargetPosition({ left: 8 + Math.random() * 74, top: 10 + Math.random() * 64 });
      setTargetVisible(true);
      (window as any).__crewDuelStarted = performance.now();
    }, 700 + Math.random() * 1100);
  };

  const hitTarget = () => {
    const startedAt = (window as any).__crewDuelStarted;
    if (!startedAt) return;
    const ms = Math.round(performance.now() - startedAt);
    (window as any).__crewDuelStarted = null;
    setReaction(ms);
    setTargetVisible(false);
    setGameStarted(false);
    toast(ms < 350 ? `🔥 ${ms}ms — streak saved!` : `${ms}ms — Arjun is still talking trash. 😭`);
  };

  const closeDuel = () => {
    setDuelOpen(false);
    setGameStarted(false);
    setTargetVisible(false);
    setReaction(null);
    (window as any).__crewDuelStarted = null;
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">CREW<span /></div>
        <div className="mode-switch">
          <button className={mode === "student" ? "active" : ""} onClick={() => setMode("student")}>Student</button>
          <button className={mode === "organizer" ? "active" : ""} onClick={() => setMode("organizer")}>Organizer</button>
        </div>
        <nav className="nav">
          {[["Home", "⌂"], ["My Crew", "◉"], ["Discover", "✦"], ["Tasks", "✓"], ["Events", "◷"], ["Moments", "◌"]].map(([item, icon]) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}><span>{icon}</span>{item}</button>
          ))}
        </nav>
        <div className="profile"><div className="avatar">T</div><div><b>Tenzin</b><div className="small">3 active crews</div></div></div>
      </aside>

      <main>
        <div className="mobile-top"><div className="mobile-logo">CREW<span /></div><button className="pill" onClick={() => toast("Notifications are suspiciously quiet today. 🔔")}>✦ 4 updates</button></div>
        <div className="top">
          <div><h1>Good evening, Tenzin 👋</h1><div className="sub">Your people, your plans, your thing.</div></div>
          <button className="pill desktop-pill" onClick={() => toast("Notifications are suspiciously quiet today. 🔔")}>✦ 4 updates</button>
        </div>

        {mode === "student" ? <div className="grid">
          <section>
            <div className="card hero">
              <div className="eyebrow">YOUR CREW · VALORA</div>
              <h2>Make something worth remembering.</h2>
              <p>3 tasks, 1 event and a new quest are waiting for your crew.</p>
              <button className="cta" onClick={() => toast("Opening the crew space ✨")}>Enter Valora →</button>
            </div>
            <div className="stats">
              <div className="stat"><b>🔥 7</b><span>week streak</span></div>
              <div className="stat"><b>12</b><span>people met</span></div>
              <div className="stat"><b>340</b><span>crew points</span></div>
            </div>
            <div className="card spaced">
              <div className="section-title"><h3>🗺️ Today&apos;s quest</h3><span className="link">Campus-wide</span></div>
              <div className="quest"><div className="quest-icon">🚀</div><div><h4>Build a tiny business</h4><p>Start something real. First crew to submit proof wins.</p></div><button onClick={() => toast("Quest accepted. Go make capitalism nervous. 🚀")}>Accept</button></div>
            </div>
            <div className="card spaced">
              <div className="section-title"><h3>🔥 Takes</h3><span className="link">See all</span></div>
              <div className="takes">
                <div className="take"><q>8 AM club meetings should be illegal.</q><div className="vote-row"><button className={votes[1] === "TRUE" ? "vote selected" : "vote"} onClick={() => vote(1, "TRUE")}>TRUE</button><button className={votes[1] === "LIES" ? "vote selected" : "vote"} onClick={() => vote(1, "LIES")}>LIES</button></div></div>
                <div className="take"><q>Our next social needs better food.</q><div className="vote-row"><button className={votes[2] === "ABSOLUTELY" ? "vote selected" : "vote"} onClick={() => vote(2, "ABSOLUTELY")}>ABSOLUTELY</button><button className={votes[2] === "BROKE" ? "vote selected" : "vote"} onClick={() => vote(2, "BROKE")}>WE&apos;RE BROKE</button></div></div>
              </div>
            </div>
          </section>

          <section>
            <div className="card">
              <div className="section-title"><h3>🧊 Break the ice</h3><span className="link">New activity</span></div>
              <div className="ice"><div className="ice-orb">🧊</div><div><h4>Find your unexpected twin</h4><p>Find someone you&apos;ve never spoken to. Discover one thing you both love.</p></div><button className="action" onClick={() => toast("Icebreaker started. Go meet someone 👋")}>Start</button></div>
            </div>
            <div className="duel-banner"><div className="fire">⚔️</div><div><b>Keep your 7-week streak</b><div className="small dark-small">Duel a CREW member.</div></div><button onClick={() => setDuelOpen(true)}>Duel</button></div>
            <div className="card spaced">
              <div className="section-title"><h3>📸 Moments</h3><span className="link">View memories</span></div>
              <div className="moments">{moments.map((moment) => <div className="moment" key={moment.title}><span>{moment.emoji} {moment.title}</span></div>)}</div>
            </div>
            <div className="card spaced">
              <div className="section-title"><h3>⚡ Coming up</h3><span className="link">Calendar</span></div>
              <div className="quest"><div className="quest-icon">🎤</div><div><h4>Finance Summit</h4><p>Friday · 4:30 PM · Main Auditorium</p></div><button onClick={() => toast("Added to your schedule 📅")}>I&apos;m in</button></div>
            </div>
          </section>
        </div> : <div className="organizer-view">
          <div className="card organizer-hero"><div className="eyebrow">ORGANIZER MODE · VALORA</div><h2>Make your community move.</h2><p>84 members, 16 tasks and 2 events are in motion.</p><button className="cta" onClick={() => toast("New event flow opened ✨")}>Create event +</button></div>
          <div className="stats"><div className="stat"><b>84</b><span>members</span></div><div className="stat"><b>78%</b><span>participation</span></div><div className="stat"><b>16</b><span>open tasks</span></div></div>
          <div className="grid equal-grid"><div className="card"><div className="section-title"><h3>📅 Next event</h3><span className="link">Tomorrow</span></div><h4>Valora General Meeting</h4><p>5:30 PM · Seminar Hall 2</p><button className="dark-button" onClick={() => toast("Event manager opened")}>Manage event</button></div><div className="card"><div className="section-title"><h3>✓ Committee tasks</h3><span className="link">4 due today</span></div><div className="task-row">✓ Finish event poster <span>Today</span></div><div className="task-row">✓ Confirm speakers <span>Tomorrow</span></div><div className="task-row">○ Publish Takes poll <span>Friday</span></div></div></div>
        </div>}
      </main>

      {toastMessage && <div className="toast show">{toastMessage}</div>}

      {duelOpen && <div className="modal" onClick={closeDuel}><div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {!gameStarted && !targetVisible && reaction === null ? <>
          <div className="eyebrow">CREW DUEL · REACTION</div><h2>Challenge someone.</h2><p className="sub">Pick a crew mate, then try to beat their reaction time.</p>
          <div className="duel-player"><div className="avatar">A</div><div><b>Arjun</b><small>Valora · 5 day streak</small></div><button onClick={startGame}>Challenge</button></div>
          <div className="duel-player"><div className="avatar alt">S</div><div><b>Sonam</b><small>Valora · 9 day streak</small></div><button onClick={startGame}>Challenge</button></div>
          <button className="close" onClick={closeDuel}>Not now</button>
        </> : <>
          <div className="eyebrow">CREW DUEL · REACTION</div><h2>{reaction !== null ? `${reaction}ms` : "Get ready..."}</h2><p className="sub">{reaction !== null ? "One more round. Your crew is watching. 👀" : "Tap the target the moment it appears."}</p>
          <div className="duel-game">{targetVisible && <button className="target" style={{ left: `${targetPosition.left}%`, top: `${targetPosition.top}%` }} onClick={hitTarget}>TAP!</button>}{!targetVisible && <button className="game-btn" onClick={startGame}>{reaction !== null ? "Rematch" : "Start duel"}</button>}</div>
          <button className="close" onClick={closeDuel}>Close</button>
        </>}
      </div></div>}
    </div>
  );
}
