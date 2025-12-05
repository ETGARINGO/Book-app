import { Clock, ShieldCheck, Star, Award, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Convenient Booking",
    description: "Book your appointment online 24/7. Choose your preferred barber, service, and time slot.",
  },
  {
    icon: ShieldCheck,
    title: "Experienced Barbers",
    description: "Our team of skilled professionals brings decades of combined experience to every cut.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "We're committed to your satisfaction. If you're not happy, we'll make it right.",
  },
  {
    icon: Award,
    title: "Premium Products",
    description: "We use only the finest grooming products from top brands for the best results.",
  },
  {
    icon: Sparkles,
    title: "Clean Environment",
    description: "Enjoy a spotless, sanitized space where your comfort and safety come first.",
  },
  {
    icon: Users,
    title: "Welcoming Atmosphere",
    description: "Relax in our friendly, comfortable shop while getting the perfect cut.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="font-display text-4xl md:text-5xl uppercase tracking-wide mb-4"
            data-testid="text-why-title"
          >
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to providing an exceptional grooming experience that keeps you coming back.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center"
              data-testid={`feature-${index}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
