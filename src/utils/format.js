export const formatViews = (n = 0) => {
  n = Number(n) || 0;
  if (n < 1000) return `${n}`;
  if (n < 1e6) return `${(n / 1e3).toFixed(n < 1e4 ? 1 : 0)}K`;
  if (n < 1e9) return `${(n / 1e6).toFixed(1)}M`;
  return `${(n / 1e9).toFixed(1)}B`;
};

export const formatDuration = (s = 0) => {
  s = Math.max(0, Math.floor(Number(s) || 0));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return h ? `${h}:${mm}:${String(ss).padStart(2,"0")}` : `${mm}:${String(ss).padStart(2,"0")}`;
};

export const timeAgo = (iso) => {
  if (!iso) return "recently";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";
  const diff = Math.max(0, Date.now() - then) / 1000;
  const steps = [[60,"second"],[60,"minute"],[24,"hour"],[7,"day"],[4.345,"week"],[12,"month"],[Infinity,"year"]];
  let v = diff, unit = "second";
  for (const [step,name] of steps) {
    if (v < step) { unit = name; break; }
    v /= step; unit = name;
  }
  const r = Math.floor(v);
  return `${r} ${unit}${r === 1 ? "" : "s"} ago`;
};
