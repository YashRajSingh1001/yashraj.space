import { getStravaStats, getLastActivity, formatDistance, formatDuration, formatPace } from "@/lib/strava";

export const metadata = { title: "Activity — Yash Raj Singh" };
export const revalidate = 21600;

export default async function ActivityPage() {
  const [stats, last] = await Promise.all([getStravaStats(), getLastActivity()]);

  return (
    <div className="soon" style={{ maxWidth: stats ? "none" : undefined }}>
      <div className="label page-label">§ 06 — Activity</div>
      <h1 className="h1">Designing this next.</h1>
      <p style={{ maxWidth: 560 }}>
        Now playing and top tracks from Spotify, steps and workouts from Fitbit / Google Health, and runs from Strava.
      </p>

      {stats && (
        <div className="activity-block">
          <div className="label">Strava · running</div>
          <div className="stats">
            {[
              { v: stats.ytdRuns.toString(), l: "RUNS THIS YEAR" },
              { v: formatDistance(stats.ytdDistance), l: "THIS YEAR" },
              { v: stats.allTimeRuns.toString(), l: "ALL-TIME RUNS" },
              { v: formatDistance(stats.allTimeDistance), l: "ALL-TIME" },
            ].map((s) => (
              <div key={s.l} className="stat">
                <div className="stat-v">{s.v}</div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
          {last && (
            <p className="last-run">
              Last run: <b>{last.name}</b> · {formatDistance(last.distance)} · {formatDuration(last.moving_time)} ·{" "}
              {formatPace(last.distance, last.moving_time)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
