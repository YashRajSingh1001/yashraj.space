import PageHead from "@/components/PageHead";
import TimelineList from "@/components/TimelineList";
import { milestones } from "@/data/timeline";

export const metadata = { title: "Timeline — Yash Raj Singh" };

export default function TimelinePage() {
  return (
    <div className="page page-narrow">
      <PageHead
        label="§ 03 — Timeline"
        title="Timeline"
        count={milestones.length}
        sub="When and what I did, since graduating in 2022."
      />
      <TimelineList />
    </div>
  );
}
