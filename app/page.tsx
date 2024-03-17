import { MessageCreateForm } from "@/app/ui/components/MessageCreateForm";
import { MessageList } from "@/app/ui/components/MessageList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-4">
      {/* <MessageCreateForm /> */}
      <MessageList />
    </main>
  );
}
