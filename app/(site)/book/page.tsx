import BookForm from "@/components/BookForm";

export const metadata = {
  title: "Book a Consultation",
  description: "Request a consultation with the clinic.",
};

export default function BookPage() {
  return (
    // Navbar is h-20, so the remaining viewport is what gets centred.
    <main className="flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center bg-brand-black px-6 py-24 lg:px-10 lg:py-32">
      <BookForm />
    </main>
  );
}
