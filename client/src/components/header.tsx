import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Scissors, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onBookNow?: () => void;
}

export function Header({ onBookNow }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isHomePage = location === "/";
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 group"
            data-testid="link-logo"
          >
            <Scissors className={cn(
              "w-6 h-6 transition-colors",
              isScrolled || !isHomePage ? "text-primary" : "text-white"
            )} />
            <span className={cn(
              "font-display text-xl uppercase tracking-wider transition-colors",
              isScrolled || !isHomePage ? "text-foreground" : "text-white"
            )}>
              Sharp Cuts
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {isHomePage && (
              <>
                <a
                  href="#services"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  )}
                  data-testid="nav-services"
                >
                  Services
                </a>
                <a
                  href="#barbers"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  )}
                  data-testid="nav-barbers"
                >
                  Our Barbers
                </a>
                <a
                  href="#booking"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  )}
                  data-testid="nav-booking"
                >
                  Book Now
                </a>
              </>
            )}
            <Link 
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors",
                isScrolled || !isHomePage ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
              )}
              data-testid="nav-admin"
            >
              Admin
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isHomePage && onBookNow && (
              <Button 
                onClick={onBookNow}
                className="hidden sm:flex"
                data-testid="button-header-book"
              >
                Book Now
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className={cn(
                  "w-5 h-5",
                  isScrolled || !isHomePage ? "text-foreground" : "text-white"
                )} />
              ) : (
                <Menu className={cn(
                  "w-5 h-5",
                  isScrolled || !isHomePage ? "text-foreground" : "text-white"
                )} />
              )}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {isHomePage && (
                <>
                  <a
                    href="#services"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </a>
                  <a
                    href="#barbers"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Barbers
                  </a>
                  <a
                    href="#booking"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Now
                  </a>
                </>
              )}
              <Link 
                href="/admin"
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
