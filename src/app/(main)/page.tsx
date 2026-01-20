import { Feed } from "@/components/feed/Feed";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Feed />
    </main>
  );
}
