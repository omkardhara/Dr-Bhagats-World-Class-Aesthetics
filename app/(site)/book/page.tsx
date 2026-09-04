import BookForm from "@/components/BookForm";

export const metadata = {
  title: "Book a Consultation",
  description: "Request a consultation with the clinic.",
};

export default function BookPage() {
  return (
    // The navbar is fixed rather than in flow, so the top padding clears it
    // instead of subtracting its height from the viewport.
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-48">
      <BookForm />
    </main>
  );
}
