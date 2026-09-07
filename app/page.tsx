"use client";

import { useState } from "react";

type Mode = "student" | "organizer";
type ActivePage = "Home" | "My Crew" | "Discover" | "Tasks" | "Events" | "Moments";

const navItems: [ActivePage, string][] = [
  ["Home", "⌂"],
  ["My Crew", "◉"],
  ["Discover", "✦"],
  ["Tasks", "✓"],
  ["Events", "◷"],
  ["Moments", "◌"],
];

const crews = [
  { name: "Valora", type: "Finance & Investment", members: 84, emoji: "📈", joined: true },
  { name: "Prarambh", type: "Debate & strategy", members: 42, emoji: "⚡", joined: true },
  { name: "Campus Creators", type: "Design, video & web", members: 118, emoji: "🎨", joined: false },
  { name: "Startup Lab", type: "Build things together", members: 67, emoji: "🚀", joined: false },
];

const initialTasks = [
  { id: 1, title: "Finish event poster", crew: "Valora", due: "Today", done: false },
  { id: 2, title: "Confirm speaker details", crew: "Valora", due: "Tomorrow", done: false },
  { id: 3, title: "Submit Prarambh reflection", crew: "Prarambh", due: "Friday", done: true },
  { id: 4, title: "Vote on social theme", crew: "Valora", due: "Friday", done: false },
];

const events = [
  { id: 1, title: "Finance Summit", crew: "Valora", date: "Friday · 4:30 PM", place: "Main Auditorium", emoji: "🎤", attending: false },
  { id: 2, title: "Committee General Meeting", crew: "Valora", date: "Tomorrow · 5:30 PM", place: "Seminar Hall 2", emoji: "📋", attending: true },
  { id: 3, title: "Creator Meetup", crew: "Campus Creators", date: "Sat · 2:00 PM", place: "Student Lounge", emoji: "🎨", attending: false },
];

const moments = [
  { title: "Committee chaos", meta: "Valora · 2 days ago", emoji: "📸", tone: "peach" },
  { title: "Prarambh finals", meta: "Prarambh · 1 week ago", emoji: "🏆", tone: "purple" },
  { title: "That one meeting 😂", meta: "Valora · 2 weeks ago", emoji: "🍜", tone: "lime" },
  { title: "New members night", meta: "Valora · 3 weeks ago", emoji: "👋", tone: "blue" },
  { title: "The winning pitch", meta: "Prarambh · 1 month ago", emoji: "🚀", tone: "yellow" },
  { title: "Canteen diplomacy", meta: "Valora · 1 month ago", emoji: "☕", tone: "pink" },
];

const icebreakers = [
  "Find someone who has visited another country.",
  "Find someone with the same birth month as you.",
  "Two Truths & a Lie. Find three people and guess the lie.",
  "Find someone whose first job was completely unexpected.",
  "Ask someone what they would build if money did not matter.",
];

export default function Home() {
  const [active, setActive] = useState<ActivePage>("Home");
  const [mode, setMode] = useState<Mode>("student");
  const [toastMessage, setToastMessage] = useState("");
  const [votes, setVotes] = useState<Record<number, string>>({});
  const [joinedCrews, setJoinedCrews] = useState<string[]>(["Valora", "Prarambh"]);
  const [tasks, setTasks] = useState(initialTasks);
  const [eventAttendance, setEventAttendance] = useState<Record<number, boolean>>({ 2: true });
  const [questAccepted, setQuestAccepted] = useState(false);
  const [icebreaker, setIcebreaker] = useState(icebreakers[0]);
  const [modal, setModal] = useState<"duel" | "crew" | "moment" | "event" | "quest" | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<(typeof moments)[number] | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);
  const [reaction, setReaction] = useState<number | null>(null);
  const [targetPosition, setTargetPosition] = useState({ left: 45, top: 50 });

  const toast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2600);
  };

  const navigate = (page: ActivePage) => {
    setActive(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const vote = (poll: number, option: string) => {
    setVotes((current) => ({ ...current, [poll]: option }));
    toast("Vote locked in. Democracy has spoken. 🗳️");
  };

  const joinCrew = (name: string) => {
    if (joinedCrews.includes(name)) {
      navigate("My Crew");
      return;
    }
    setJoinedCrews((current) => [...current, name]);
    toast(`You joined ${name}. Welcome to the crew. 👋`);
  };

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
    const task = tasks.find((item) => item.id === id);
    if (task) toast(task.done ? "Task reopened." : "Task completed. Tiny victory. ✨");
  };

  const toggleEvent = (id: number) => {
    setEventAttendance((current) => ({ ...current, [id]: !current[id] }));
    toast(eventAttendance[id] ? "Removed from your schedule." : "You're in. See you there. 📅");
  };

  const newIcebreaker = () => {
    const next = icebreakers[Math.floor(Math.random() * icebreakers.length)];
    setIcebreaker(next);
    toast("New icebreaker ready. Go talk to an actual human. 👋");
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
    setModal(null);
    setGameStarted(false);
    setTargetVisible(false);
    setReaction(null);
    (window as any).__crewDuelStarted = null;
  };

  const openMoment = (moment: (typeof moments)[number]) => {
    setSelectedMoment(moment);
    setModal("moment");
  };

  const studentHome = (
    <div className="grid">
      <section>
        <div className="card hero">
          <div className="eyebrow">YOUR CREW · VALORA</div>
          <h2>Make something worth remembering.</h2>
          <p>3 tasks, 1 event and a new quest are waiting for your crew.</p>
          <button className="cta" onClick={() => setModal("crew")}>Enter Valora →</button>
        </div>
        <div className="stats">
          <button className="stat stat-button" onClick={() => toast("Your 7-week participation streak is alive. 🔥")}><b>🔥 7</b><span>week streak</span></button>
          <button className="stat stat-button" onClick={() => toast("You've met 12 people through CREW.")}><b>12</b><span>people met</span></button>
          <button className="stat stat-button" onClick={() => toast("340 crew points earned from participation.")}><b>340</b><span>crew points</span></button>
        </div>
        <div className="card spaced clickable-card" onClick={() => setModal("quest")}>
          <div className="section-title"><h3>🗺️ Today&apos;s quest</h3><span className="link">Campus-wide</span></div>
          <div className="quest"><div className="quest-icon">🚀</div><div><h4>Build a tiny business</h4><p>{questAccepted ? "You accepted it. First crew to submit proof wins." : "Start something real. First crew to submit proof wins."}</p></div><button onClick={(e) => { e.stopPropagation(); setQuestAccepted(true); toast("Quest accepted. Go make capitalism nervous. 🚀"); }}>{questAccepted ? "Accepted" : "Accept"}</button></div>
        </div>
        <div className="card spaced">
          <div className="section-title"><h3>🔥 Takes</h3><button className="link-button" onClick={() => navigate("My Crew")}>See all</button></div>
          <div className="takes">
            <div className="take"><q>8 AM club meetings should be illegal.</q><div className="vote-row"><button className={votes[1] === "TRUE" ? "vote selected" : "vote"} onClick={() => vote(1, "TRUE")}>TRUE</button><button className={votes[1] === "LIES" ? "vote selected" : "vote"} onClick={() => vote(1, "LIES")}>LIES</button></div></div>
            <div className="take"><q>Our next social needs better food.</q><div className="vote-row"><button className={votes[2] === "ABSOLUTELY" ? "vote selected" : "vote"} onClick={() => vote(2, "ABSOLUTELY")}>ABSOLUTELY</button><button className={votes[2] === "BROKE" ? "vote selected" : "vote"} onClick={() => vote(2, "BROKE")}>WE&apos;RE BROKE</button></div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="card clickable-card" onClick={newIcebreaker}>
          <div className="section-title"><h3>🧊 Break the ice</h3><button className="link-button" onClick={(e) => { e.stopPropagation(); newIcebreaker(); }}>New activity</button></div>
          <div className="ice"><div className="ice-orb">🧊</div><div><h4>Find your unexpected twin</h4><p>{icebreaker}</p></div><button className="action" onClick={(e) => { e.stopPropagation(); toast("Icebreaker started. Go meet someone 👋"); }}>Start</button></div>
        </div>
        <div className="duel-banner"><div className="fire">⚔️</div><div><b>Keep your 7-week streak</b><div className="small dark-small">Duel a CREW member.</div></div><button onClick={() => setModal("duel")}>Duel</button></div>
        <div className="card spaced">
          <div className="section-title"><h3>📸 Moments</h3><button className="link-button" onClick={() => navigate("Moments")}>View memories</button></div>
          <div className="moments">{moments.slice(0, 3).map((moment) => <button className={`moment ${moment.tone}`} key={moment.title} onClick={() => openMoment(moment)}><span>{moment.emoji} {moment.title}</span></button>)}</div>
        </div>
        <div className="card spaced clickable-card" onClick={() => navigate("Events")}>
          <div className="section-title"><h3>⚡ Coming up</h3><button className="link-button" onClick={(e) => { e.stopPropagation(); navigate("Events"); }}>Calendar</button></div>
          <div className="quest"><div className="quest-icon">🎤</div><div><h4>Finance Summit</h4><p>Friday · 4:30 PM · Main Auditorium</p></div><button onClick={(e) => { e.stopPropagation(); toggleEvent(1); }}>{eventAttendance[1] ? "Going" : "I&apos;m in"}</button></div>
        </div>
      </section>
    </div>
  );

  const pageContent = () => {
    if (mode === "organizer") {
      return (
        <div className="organizer-view">
          <div className="card organizer-hero"><div className="eyebrow">ORGANIZER MODE · VALORA</div><h2>Make your community move.</h2><p>84 members, {tasks.filter((t) => !t.done).length} open tasks and 2 events are in motion.</p><button className="cta" onClick={() => setModal("event")}>Create event +</button></div>
          <div className="stats"><button className="stat stat-button" onClick={() => navigate("My Crew")}><b>84</b><span>members</span></button><button className="stat stat-button" onClick={() => toast("Participation is at 78% this month.")}><b>78%</b><span>participation</span></button><button className="stat stat-button" onClick={() => navigate("Tasks")}><b>{tasks.filter((t) => !t.done).length}</b><span>open tasks</span></button></div>
          <div className="grid equal-grid"><div className="card clickable-card" onClick={() => navigate("Events")}><div className="section-title"><h3>📅 Next event</h3><span className="link">Tomorrow</span></div><h4>Valora General Meeting</h4><p>5:30 PM · Seminar Hall 2</p><button className="dark-button" onClick={(e) => { e.stopPropagation(); setModal("event"); }}>Manage event</button></div><div className="card"><div className="section-title"><h3>✓ Committee tasks</h3><button className="link-button" onClick={() => navigate("Tasks")}>View all</button></div>{tasks.slice(0, 3).map((task) => <button className="task-row task-button" key={task.id} onClick={() => toggleTask(task.id)}>{task.done ? "✓" : "○"} {task.title}<span>{task.due}</span></button>)}</div></div>
          <div className="card spaced"><div className="section-title"><h3>📊 Community pulse</h3><span className="link">This month</span></div><div className="pulse-grid"><div><b>68%</b><span>attended an event</span></div><div><b>41</b><span>new conversations</span></div><div><b>19</b><span>Moments shared</span></div><div><b>7</b><span>active quests</span></div></div></div>
        </div>
      );
    }

    if (active === "Home") return studentHome;

    if (active === "My Crew") return (
      <div className="page-stack">
        <div className="page-heading"><div><div className="eyebrow">YOUR COMMUNITIES</div><h2>My Crews</h2><p>Places where you actually know people, rather than merely following them.</p></div><button className="primary-button" onClick={() => navigate("Discover")}>+ Find a crew</button></div>
        <div className="crew-grid">{crews.filter((crew) => joinedCrews.includes(crew.name)).map((crew) => <button className="crew-card" key={crew.name} onClick={() => setModal("crew")}><div className="crew-symbol">{crew.emoji}</div><div><span className="tag">ACTIVE</span><h3>{crew.name}</h3><p>{crew.type}</p><small>{crew.members} members · Active today</small></div><span className="arrow">→</span></button>)}</div>
        <div className="card dark-community"><div><span className="eyebrow">YOUR SOCIAL LOOP</span><h3>Join → meet → participate → remember.</h3><p>CREW gets better when you show up, not when you scroll forever.</p></div><button onClick={() => setModal("duel")}>Play something →</button></div>
        <div className="card"><div className="section-title"><h3>🔥 Recent Takes</h3><span className="link">Valora</span></div><div className="take-feed"><div><b>Should committee socials have a budget?</b><span>73% YES · 27% absolutely yes</span></div><div><b>Best place to study on campus?</b><span>Library is winning by a suspicious margin.</span></div></div></div>
      </div>
    );

    if (active === "Discover") return (
      <div className="page-stack">
        <div className="page-heading"><div><div className="eyebrow">DISCOVER</div><h2>Find your people.</h2><p>Communities around things you want to do, build, learn and obsess over.</p></div><button className="pill" onClick={() => toast("Showing communities around you.")}>Near me ✦</button></div>
        <div className="discover-grid">{crews.map((crew) => { const joined = joinedCrews.includes(crew.name); return <div className="discover-card" key={crew.name}><div className="discover-top"><div className="crew-symbol">{crew.emoji}</div><span>{crew.members} members</span></div><h3>{crew.name}</h3><p>{crew.type}</p><div className="discover-meta"><span>Events weekly</span><span>•</span><span>Active today</span></div><button className={joined ? "joined-button" : "primary-button"} onClick={() => joinCrew(crew.name)}>{joined ? "Joined ✓" : "Join crew"}</button></div>; })}</div>
        <div className="card discover-banner"><div><span className="eyebrow">CREW QUEST</span><h3>Not sure where you fit?</h3><p>Try a campus-wide quest and meet people while doing something.</p></div><button onClick={() => setModal("quest")}>Explore quests →</button></div>
      </div>
    );

    if (active === "Tasks") return (
      <div className="page-stack">
        <div className="page-heading"><div><div className="eyebrow">YOUR WORK</div><h2>Tasks</h2><p>Things that need doing, without the 47-message WhatsApp thread.</p></div><button className="primary-button" onClick={() => toast("New task composer opened. ✨")}>+ Add task</button></div>
        <div className="task-layout"><div className="card task-list"><div className="section-title"><h3>{tasks.filter((t) => !t.done).length} open</h3><span className="link">This week</span></div>{tasks.map((task) => <button className={`full-task ${task.done ? "done" : ""}`} key={task.id} onClick={() => toggleTask(task.id)}><span className="check">{task.done ? "✓" : ""}</span><span className="task-copy"><b>{task.title}</b><small>{task.crew} · due {task.due}</small></span><span className="task-arrow">›</span></button>)}</div><div className="card task-side"><span className="eyebrow">TEAM MOMENTUM</span><b className="big-number">{Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)}%</b><p>of your current tasks are complete.</p><div className="progress"><span style={{ width: `${(tasks.filter((t) => t.done).length / tasks.length) * 100}%` }} /></div><button className="dark-button" onClick={() => toast("Nice. Keep the momentum going. 🔥")}>Keep going</button></div></div>
      </div>
    );

    if (active === "Events") return (
      <div className="page-stack">
        <div className="page-heading"><div><div className="eyebrow">WHAT&apos;S HAPPENING</div><h2>Events</h2><p>Plans worth leaving your room for.</p></div><button className="primary-button" onClick={() => setModal("event")}>+ Create event</button></div>
        <div className="event-list">{events.map((event) => <div className="event-card" key={event.id}><div className="event-date"><b>{event.date.split(" · ")[0]}</b><span>{event.date.split(" · ")[1]}</span></div><div className="event-icon">{event.emoji}</div><div className="event-info"><span className="tag">{event.crew}</span><h3>{event.title}</h3><p>📍 {event.place}</p></div><button className={eventAttendance[event.id] ? "joined-button" : "primary-button"} onClick={() => toggleEvent(event.id)}>{eventAttendance[event.id] ? "Going ✓" : "I&apos;m in"}</button></div>)}</div>
      </div>
    );

    return (
      <div className="page-stack">
        <div className="page-heading"><div><div className="eyebrow">SHARED HISTORY</div><h2>Moments</h2><p>The stuff your community will still talk about later.</p></div><button className="primary-button" onClick={() => toast("Moment composer opened. 📸")}>+ Add moment</button></div>
        <div className="moments-large">{moments.map((moment) => <button className={`moment-large ${moment.tone}`} key={moment.title} onClick={() => openMoment(moment)}><span className="moment-big-emoji">{moment.emoji}</span><div><b>{moment.title}</b><small>{moment.meta}</small></div><span className="arrow">↗</span></button>)}</div>
      </div>
    );
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="logo logo-button" onClick={() => navigate("Home")}>CREW<span /></button>
        <div className="mode-switch"><button className={mode === "student" ? "active" : ""} onClick={() => { setMode("student"); setActive("Home"); }}>Student</button><button className={mode === "organizer" ? "active" : ""} onClick={() => { setMode("organizer"); setActive("Home"); }}>Organizer</button></div>
        <nav className="nav">{navItems.map(([item, icon]) => <button key={item} className={active === item ? "active" : ""} onClick={() => navigate(item)}><span>{icon}</span>{item}</button>)}</nav>
        <div className="profile"><div className="avatar">T</div><div><b>Tenzin</b><div className="small">{joinedCrews.length} active crews</div></div></div>
      </aside>

      <main>
        <div className="mobile-top"><button className="mobile-logo logo-button" onClick={() => navigate("Home")}>CREW<span /></button><button className="pill" onClick={() => toast("You have 4 updates waiting. 🔔")}>✦ 4 updates</button></div>
        <div className="top"><div><h1>{active === "Home" ? "Good evening, Tenzin 👋" : active}</h1><div className="sub">{active === "Home" ? "Your people, your plans, your thing." : "Your people. Your place. Your thing."}</div></div><button className="pill desktop-pill" onClick={() => toast("You have 4 updates waiting. 🔔")}>✦ 4 updates</button></div>
        {pageContent()}
      </main>

      {toastMessage && <div className="toast show">{toastMessage}</div>}

      {modal === "crew" && <div className="modal" onClick={() => setModal(null)}><div className="modal-card modal-left" onClick={(e) => e.stopPropagation()}><div className="modal-topline"><span className="crew-symbol">📈</span><button className="close-icon" onClick={() => setModal(null)}>×</button></div><span className="tag">YOUR CREW</span><h2>Valora</h2><p className="sub">Finance & Investment · 84 members</p><div className="crew-tabs"><button className="active">Overview</button><button onClick={() => navigate("Events")}>Events</button><button onClick={() => navigate("Moments")}>Moments</button></div><div className="crew-action-grid"><button onClick={() => toast("You opened the Valora conversation. 💬")}>💬 <b>Chat</b><small>18 new messages</small></button><button onClick={() => setModal("duel")}>⚔️ <b>Play</b><small>Start a duel</small></button><button onClick={() => navigate("Tasks")}>✓ <b>Tasks</b><small>{tasks.filter((t) => !t.done).length} open</small></button><button onClick={() => setModal("quest")}>🚀 <b>Quest</b><small>1 active</small></button></div><div className="modal-note">Next up: Finance Summit · Friday 4:30 PM</div></div></div>}

      {modal === "quest" && <div className="modal" onClick={() => setModal(null)}><div className="modal-card" onClick={(e) => e.stopPropagation()}><div className="quest-big">🚀</div><span className="tag">CAMPUS-WIDE QUEST</span><h2>Build a tiny business</h2><p className="sub">Start something real. Make a tiny product or service, then submit proof before another crew beats you to it.</p><div className="quest-rules"><span>⏱ 48 hours</span><span>👥 Solo or crew</span><span>🏆 Recognition + points</span></div><button className="primary-button wide" onClick={() => { setQuestAccepted(true); setModal(null); toast("Quest accepted. Your crew is officially on the board. 🚀"); }}>{questAccepted ? "Quest accepted ✓" : "Accept quest"}</button><button className="close wide-close" onClick={() => setModal(null)}>Maybe later</button></div></div>}

      {modal === "event" && <div className="modal" onClick={() => setModal(null)}><div className="modal-card modal-left" onClick={(e) => e.stopPropagation()}><div className="modal-topline"><div><span className="eyebrow">EVENT MANAGER</span><h2>Create something people attend.</h2></div><button className="close-icon" onClick={() => setModal(null)}>×</button></div><label>Event name<input defaultValue="Valora Social Night" /></label><label>Date & time<input defaultValue="Friday · 6:00 PM" /></label><label>Location<input defaultValue="Student Lounge" /></label><label>Description<textarea defaultValue="A low-pressure social for the crew." /></label><button className="primary-button wide" onClick={() => { setModal(null); navigate("Events"); toast("Event draft created. Now make people show up. 📅"); }}>Create event</button></div></div>}

      {modal === "moment" && selectedMoment && <div className="modal" onClick={() => setModal(null)}><div className="modal-card moment-modal" onClick={(e) => e.stopPropagation()}><button className="close-icon floating-close" onClick={() => setModal(null)}>×</button><div className={`moment-preview ${selectedMoment.tone}`}><span>{selectedMoment.emoji}</span><b>{selectedMoment.title}</b></div><h2>{selectedMoment.title}</h2><p className="sub">{selectedMoment.meta}</p><div className="moment-actions"><button onClick={() => toast("Moment saved to your crew history. 📌")}>📌 Save</button><button onClick={() => toast("Sharing stays inside your crew. 🔒")}>🔒 Private</button></div></div></div>}

      {modal === "duel" && <div className="modal" onClick={closeDuel}><div className="modal-card" onClick={(e) => e.stopPropagation()}>{!gameStarted && !targetVisible && reaction === null ? <><div className="eyebrow">CREW DUEL · REACTION</div><h2>Challenge someone.</h2><p className="sub">Pick a crew mate, then try to beat their reaction time.</p><div className="duel-player"><div className="avatar">A</div><div><b>Arjun</b><small>Valora · 5 day streak</small></div><button onClick={startGame}>Challenge</button></div><div className="duel-player"><div className="avatar alt">S</div><div><b>Sonam</b><small>Valora · 9 day streak</small></div><button onClick={startGame}>Challenge</button></div><button className="close" onClick={closeDuel}>Not now</button></> : <><div className="eyebrow">CREW DUEL · REACTION</div><h2>{reaction !== null ? `${reaction}ms` : "Get ready..."}</h2><p className="sub">{reaction !== null ? "One more round. Your crew is watching. 👀" : "Tap the target the moment it appears."}</p><div className="duel-game">{targetVisible && <button className="target" style={{ left: `${targetPosition.left}%`, top: `${targetPosition.top}%` }} onClick={hitTarget}>TAP!</button>}{!targetVisible && <button className="game-btn" onClick={startGame}>{reaction !== null ? "Rematch" : "Start duel"}</button>}</div><button className="close" onClick={closeDuel}>Close</button></>}</div></div>}
    </div>
  );
}
