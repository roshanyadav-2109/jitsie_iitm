export default function Footer() {
  return (
    <footer className="border-t border-foreground py-8">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} JITSIE IIT Madras. All rights reserved.
      </div>
    </footer>
  );
}
