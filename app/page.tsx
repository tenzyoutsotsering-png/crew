"use client";

import { useState } from "react";

type Tab = "Home" | "Crew" | "Discover" | "Events" | "Tasks" | "Moments";

const takes = [
  ["8 AM club meetings should be illegal.", "TRUE", "LIES"],
  ["The next social needs better food.", "ABSOLUTELY", "WE'RE BROKE"],
];

const moments = [
  ["Committee chaos", "📸", "peach"],
  ["Prarambh finals", "🏆", "purple"],
  ["That one meeting", "🍜", "lime"],
  ["New members night", "👋", "blue"],
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Home");
  const [organizer, setOrganizer] = useState(false);
  const [toast, setToast] = useState("");
  const [votes, setVotes] = useState<Record<number, string>>({});
  const [quest, setQuest] = useState(false);
  const [going, setGoing] = useState(false);
  const [icebreaker, setIcebreaker] = useState("Find someone you haven't talked to yet. Yes, an actual human.");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const vote = (i: number, value: string) => {
    setVotes({ ...votes, [i]: value });
    notify("Locked in. Democracy has spoken. 🗳️");
  };

  const nav = (next: Tab) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextIcebreaker = () => {
    const prompts = [
      "Find someone with the same birth month as you.",
      "Find someone who has visited another country.",
      "Ask someone what they'd build if money didn't matter.",
      "Find someone whose music taste you absolutely need to judge.",
    ];
    setIcebreaker(prompts[Math.floor(Math.random() * prompts.length)]);
    notify("New side quest unlocked. Go talk to someone 👋");
  };

  const home = (
    <>
      <div className="live-bar"><span className="live-dot" /> <b>Valora is alive</b><span>8 people are active right now</span><button onClick={() => notify("You have entered the chaos. 🫡")}>See what's happening →</button></div>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR CREW · VALORA</span>
          <h2>Your people.<br /><em>Your place.</em><br />Your thing.</h2>
          <p>Don't just join a club. Actually be part of it.</p>
          <div className="hero-actions"><button className="primary" onClick={() => notify("Welcome back to Valora. 🫡")}>Enter the crew →</button><button className="ghost" onClick={() => nav("Discover")}>Find more people</button></div>
        </div>
        <div className="hero-orbit"><div className="orbit-card one">🔥 <b>7 week streak</b></div><div className="orbit-card two">👋 <b>12 people met</b></div><div className="orbit-card three">🚀 <b>Quest active</b></div><div className="orbit-center">CREW<span>•</span></div></div>
      </section>

      <div className="quick-stats"><button onClick={() => notify("Still going after 7 weeks. Certified W. 🔥")}><b>🔥 7</b><span>week streak</span></button><button onClick={() => notify("12 people met through CREW. Keep going.")}><b>12</b><span>people met</span></button><button onClick={() => notify("340 points from actually participating. Not bad.")}><b>340</b><span>crew points</span></button></div>

      <div className="section-grid">
        <div className="stack">
          <section className="panel quest-panel">
            <div className="panel-head"><div><span className="eyebrow">CAMPUS-WIDE · 37 CREWS</span><h3>🗺️ Today's side quest</h3></div><span className="hot">LIVE</span></div>
            <div className="quest-main"><div className="quest-art">🚀</div><div className="grow"><h4>Build a tiny business</h4><p>{quest ? "You're in. First crew to submit proof wins." : "Start something real. First crew to submit proof wins."}</p><div className="chips"><span>⚡ Race</span><span>👥 Team up</span><span>🏆 Prize</span></div></div><button className="dark" onClick={() => { setQuest(true); notify("Quest accepted. Go cook. 🚀"); }}>{quest ? "You're in" : "Run it"}</button></div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><span className="eyebrow">THE CREW HAS SPOKEN</span><h3>🔥 What's the take?</h3></div><button className="text-button" onClick={() => notify("More takes coming soon 👀")}>All takes →</button></div>
            <div className="takes">{takes.map((take, i) => <div className="take" key={take[0]}><q>{take[0]}</q><div className="vote-row"><button className={votes[i] === take[1] ? "vote selected" : "vote"} onClick={() => vote(i, take[1])}>{take[1]}</button><button className={votes[i] === take[2] ? "vote selected" : "vote"} onClick={() => vote(i, take[2])}>{take[2]}</button></div></div>)}</div>
          </section>
        </div>

        <div className="stack">
          <section className="panel ice-panel"><div className="panel-head"><div><span className="eyebrow">SOCIAL XP, BUT MAKE IT REAL</span><h3>🧊 Go meet someone</h3></div><button className="text-button" onClick={nextIcebreaker}>New one</button></div><div className="ice-content"><div className="ice-icon">🧊</div><div className="grow"><h4>Today's icebreaker</h4><p>{icebreaker}</p></div></div><button className="full-button" onClick={() => notify("Icebreaker started. Your social life has been notified. 👋")}>I'm doing it →</button></section>

          <section className="duel"><div className="duel-icon">⚔️</div><div className="grow"><span className="eyebrow">STREAK ON THE LINE</span><h3>Someone wants a Duel.</h3><p>Arjun thinks he's faster than you. Suspicious.</p></div><button onClick={() => notify("Duel queued. Prepare to defend your honor. ⚡")}>Run it</button></section>

          <section className="panel"><div className="panel-head"><div><span className="eyebrow">THE LORE</span><h3>📸 Moments</h3></div><button className="text-button" onClick={() => nav("Moments")}>See all →</button></div><div className="moment-grid">{moments.map(([title, emoji, tone]) => <button key={title} className={`moment ${tone}`} onClick={() => notify(`${title} added to the lore. 📸`)}><span>{emoji}</span><b>{title}</b></button>)}</div></section>

          <section className="next-event"><div className="event-date"><b>FRI</b><strong>18</strong></div><div className="grow"><span className="eyebrow">VALORA · 4:30 PM</span><h3>Finance Summit</h3><p>Main Auditorium · 84 people invited</p></div><button onClick={() => { setGoing(!going); notify(going ? "You're off the list." : "You're in. See you there. 📅"); }}>{going ? "Going ✓" : "I'm in"}</button></section>
        </div>
      </div>
    </>
  );

  const discover = <div className="page"><span className="eyebrow">GO TOUCH GRASS, SOCIALLY</span><h2>Find your people.</h2><p className="page-sub">Communities are better when you actually know who's in them.</p><div className="discover-grid">{[["Valora","Finance & Investment","📈","84"],["Prarambh","Debate & Strategy","⚡","42"],["Campus Creators","Design, video & web","🎨","118"],["Startup Lab","Build things together","🚀","67"]].map(([name,type,emoji,count]) => <div className="discover-card" key={name}><div className="big-emoji">{emoji}</div><div className="grow"><h3>{name}</h3><p>{type}</p><small>{count} people · active today</small></div><button onClick={() => notify(`You're checking out ${name}. 👀`)}>Enter →</button></div>)}</div></div>;

  const events = <div className="page"><span className="eyebrow">STUFF ACTUALLY HAPPENING</span><h2>What's on?</h2><p className="page-sub">No spreadsheet archaeology required.</p><div className="event-list">{[["Finance Summit","FRI 18","4:30 PM","Main Auditorium","📈"],["Valora General Meeting","SAT 19","5:30 PM","Seminar Hall 2","🗣️"],["Creator Meetup","SUN 20","2:00 PM","Student Lounge","🎨"]].map(e => <div className="event-card" key={e[0]}><div className="event-emoji">{e[4]}</div><div className="grow"><span className="eyebrow">{e[1]} · {e[2]}</span><h3>{e[0]}</h3><p>{e[3]}</p></div><button onClick={() => notify(`You're on the list for ${e[0]}. 📅`)}>I'm in</button></div>)}</div></div>;

  const tasks = <div className="page"><span className="eyebrow">YES, THINGS NEED DOING</span><h2>Stuff to do.</h2><p className="page-sub">Tiny victories count.</p><div className="task-list">{["Finish event poster","Confirm speaker details","Submit Prarambh reflection","Vote on social theme"].map((task,i) => <button key={task} onClick={() => notify(i === 2 ? "Already done. Certified W. ✨" : "Task checked. One less thing haunting you.")}><span className={i===2 ? "check done" : "check"}>{i===2 ? "✓" : ""}</span><b>{task}</b><small>{i===0 ? "Today" : i===1 ? "Tomorrow" : "Friday"}</small></button>)}</div></div>;

  const crew = <div className="page"><span className="eyebrow">YOUR PEOPLE</span><h2>The crew.</h2><p className="page-sub">The people you chose to build something with.</p><div className="crew-hero"><div className="crew-avatar">📈</div><div className="grow"><span className="eyebrow">VALORA · 84 MEMBERS</span><h3>Finance & Investment</h3><p>68% participated this month · 19 moments · 7 active quests</p></div><button className="primary" onClick={() => notify("You're in Valora. 🫡")}>I'm here</button></div><div className="people-row"><div><b>👩🏻‍💻 Maya</b><span>just joined</span></div><div><b>🧑🏽‍🎨 Arjun</b><span>doing today's Quest</span></div><div><b>👨🏾‍💼 Riya</b><span>at Finance Summit</span></div></div></div>;

  const momentsPage = <div className="page"><span className="eyebrow">PROOF YOU DID STUFF</span><h2>The lore.</h2><p className="page-sub">Every meeting, win, disaster and “remember when...” in one place.</p><div className="lore-grid">{moments.concat([["The winning pitch","🚀","yellow"],["Canteen diplomacy","☕","pink"]]).map(([title,emoji,tone]) => <button key={title} className={`lore ${tone}`} onClick={() => notify(`${title}. A certified CREW moment. 📸`)}><span>{emoji}</span><h3>{title}</h3><p>Valora · recently</p></button>)}</div></div>;

  let content = tab === "Home" ? home : tab === "Crew" ? crew : tab === "Discover" ? discover : tab === "Events" ? events : tab === "Tasks" ? tasks : momentsPage;

  return <div className="app-shell">
    <aside className="sidebar"><button className="logo" onClick={() => nav("Home")}>CREW<span>•</span></button><div className="mode-switch"><button className={!organizer ? "active" : ""} onClick={() => setOrganizer(false)}>Student</button><button className={organizer ? "active" : ""} onClick={() => { setOrganizer(true); notify("Organizer mode. Time to make things happen. 🫡"); }}>Organize</button></div><nav>{(["Home","Crew","Discover","Events","Tasks","Moments"] as Tab[]).map(item => <button key={item} className={tab === item ? "active" : ""} onClick={() => nav(item)}>{item === "Crew" ? "◎" : item === "Discover" ? "✦" : item === "Events" ? "◷" : item === "Tasks" ? "✓" : item === "Moments" ? "◌" : "⌂"}<span>{item === "Crew" ? "My Crew" : item}</span></button>)}</nav><div className="profile"><div className="avatar">T</div><div><b>Tenzin</b><small>Valora · 7 🔥</small></div></div></aside>
    <main><div className="mobile-top"><button className="logo">CREW<span>•</span></button><button onClick={() => setOrganizer(!organizer)}>{organizer ? "Student" : "Organize"}</button></div><header className="top"><div><h1>{organizer ? "Make it happen." : tab === "Home" ? "Hey, Tenzin 👋" : tab === "Crew" ? "Your people." : tab === "Discover" ? "Find your people." : tab === "Events" ? "What's on?" : tab === "Tasks" ? "Stuff to do." : "The lore."}</h1><p>{organizer ? "Your crew has stuff to do. Let's cook." : "Your communities, without the corporate energy."}</p></div><button className="top-pill" onClick={() => notify("No new drama. For now. 👀")}>🔔 3</button></header>{organizer ? <div className="organizer"><section className="organizer-hero"><span className="eyebrow">ORGANIZER MODE · VALORA</span><h2>Make your community move.</h2><p>84 members · 3 events · 4 things to finish</p><button className="primary" onClick={() => notify("Event creation opened. Let's make it good.")}>Create something +</button></section><div className="organizer-grid"><div className="panel"><span className="eyebrow">RIGHT NOW</span><h3>Community pulse</h3><div className="pulse"><b>68%</b><span>event participation</span><b>41</b><span>new conversations</span><b>19</b><span>Moments shared</span></div></div><div className="panel"><span className="eyebrow">DON'T FORGET</span><h3>Stuff to do.</h3><p>Finish event poster</p><p>Confirm speaker details</p><p>Post the Finance Summit update</p><button className="dark full" onClick={() => { setOrganizer(false); nav("Tasks"); }}>See all tasks →</button></div></div></div> : content}</main><div className={toast ? "toast show" : "toast"}>{toast}</div>
  </div>;
}
