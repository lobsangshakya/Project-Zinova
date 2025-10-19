const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-primary-foreground/80">
          © {new Date().getFullYear()} Zinova – Building a sustainable future
        </p>
      </div>
    </footer>
  );
};

export default Footer;