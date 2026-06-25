import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";
import { SimpleLanguageSelector } from "@/components/ui/language-selector";
import { useI18n } from "@/contexts/I18nContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t('navigation.home'), href: "#home" },
    { name: t('navigation.skills'), href: "#skills" },
    { name: t('navigation.experience'), href: "#experience" },
    { name: t('navigation.projects'), href: "#projects" },
    { name: t('navigation.contact'), href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#home")}
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              SD
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Language, Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <SimpleLanguageSelector />
            <SimpleThemeToggle />
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {t('navigation.hireMe')}
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <SimpleLanguageSelector />
            <SimpleThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {t('navigation.hireMe')} Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;