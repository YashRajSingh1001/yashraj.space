export type Status = "done" | "progress" | "todo";

export interface Goal {
  title: string;
  status: Status;
  doneDate?: string;
  note?: string;
}

export interface Category {
  name: string;
  color: string;
  goals: Goal[];
}

const todo = (title: string): Goal => ({ title, status: "todo" });

export const categories: Category[] = [
  {
    name: "Travel",
    color: "var(--c-blue)",
    goals: [
      todo("Watch an F1 race live"),
      todo("Visit Japan"),
      todo("See the northern lights"),
      todo("Backpack solo for 2 weeks"),
      todo("Road trip across Rajasthan"),
      todo("Ladakh by road"),
      todo("Watch F1 at Monaco"),
      todo("Swiss Alps by train"),
      todo("Sunrise at Angkor Wat"),
      todo("Visit 10 countries"),
      todo("Spiti Valley"),
    ],
  },
  {
    name: "Fitness",
    color: "var(--c-green)",
    goals: [
      { title: "Run a half marathon", status: "progress" },
      todo("Run a full marathon"),
      todo("Sub-50 minute 10K"),
      todo("Trek to Everest Base Camp"),
      todo("Complete a triathlon"),
      todo("Run 1,000 km in a year"),
      todo("20 pull-ups in one go"),
      todo("Play in a badminton tournament"),
      todo("Hit a VO2 max of 60+"),
      todo("Run an international marathon major"),
      todo("Learn to surf"),
      todo("100 push-ups in one go"),
      todo("Cycle 250 km in a day"),
      todo("Run a 100 km ultramarathon"),
    ],
  },
  {
    name: "Skills",
    color: "var(--c-purple)",
    goals: [
      todo("Learn the ukulele"),
      todo("Conversational in a fourth language"),
      todo("Ship a product used by 10,000 people"),
      todo("Learn photography properly"),
      { title: "Read 100 books before 30", status: "progress" },
      { title: "Write consistently for a year", status: "progress" },
      todo("Drive a manual car"),
      todo("Learn horse riding"),
      todo("Speak at a tech conference"),
      todo("An open-source repo with 1,000 stars"),
      todo("Swim comfortably in open water"),
      todo("Build and train an LLM from scratch"),
      todo("Learn options trading"),
      todo("A top-10% Kaggle finish"),
      todo("Cook 10 signature dishes"),
      todo("Work abroad for a year"),
      todo("Publish a research paper"),
      todo("Turn something I built into my full-time work"),
    ],
  },
  {
    name: "Experiences",
    color: "var(--c-orange)",
    goals: [
      todo("Get scuba certified"),
      todo("A world-class music festival"),
      todo("Paragliding"),
      todo("Drive a race car on a track"),
      todo("Go on an African safari"),
      todo("A 10-day silent retreat"),
      todo("All England Open in Birmingham"),
      todo("Hot-air balloon in Cappadocia"),
      todo("An F1 garage / pit tour"),
      todo("Experience the Kumbh Mela"),
      todo("Watch a meteor shower"),
    ],
  },
  {
    name: "Creative",
    color: "var(--c-pink)",
    goals: [
      todo("Grow @yashraj.decodes to 100K"),
      todo("Start a podcast"),
      todo("Publish a short story"),
      todo("Make a short film"),
      todo("Design and print my own merch"),
      todo("Publish a book"),
      todo("Build something with my hands"),
      todo("An Instagram reel with 1M views"),
      todo("Write and record a song"),
    ],
  },
  {
    name: "Personal",
    color: "var(--c-yellow)",
    goals: [
      todo("90 days without social media"),
      { title: "Write a letter at 25, open it at 30", status: "todo", note: "Who I hope I've become, and advice I don't want future me to forget." },
      todo("Join the 5 AM club"),
      todo("Earn from a side project"),
      todo("Take my parents on a trip abroad"),
      todo("Buy my own home"),
      todo("Mentor someone younger"),
      todo("Host a dinner for people I love"),
      todo("Donate meaningfully"),
      todo("Plant 100 trees"),
      todo("Make at least ₹1 lakh profit on a single swing trade"),
      todo("Gift my parents a premium car"),
      todo("Own a BMW"),
      todo("Be proud of who I am at 29"),
    ],
  },
];

// The list is 100 long; the slots not yet filled are things I'll figure out on the way.
export const TARGET = 100;

const all = categories.flatMap((c) => c.goals);
export const goalCounts = {
  total: all.length,
  open: Math.max(0, TARGET - all.length),
  done: all.filter((g) => g.status === "done").length,
  progress: all.filter((g) => g.status === "progress").length,
};
