import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Separator } from "./components/ui/separator";
import { 
  Star, 
  ArrowRight, 
  ShoppingBag, 
  Car, 
  GraduationCap, 
  Utensils, 
  Phone, 
  Mail, 
  MapPin,
  Check,
  Crown,
  Clock,
  Shield,
  Users,
  Heart,
  Sparkles
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-gold" />
            <span className="text-2xl font-display font-bold text-white">Nicholas</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-white/80 hover:text-gold transition-colors">Services</Link>
            <Link to="/membership" className="text-white/80 hover:text-gold transition-colors">Membership</Link>
            <Link to="/nutrimeal" className="text-white/80 hover:text-gold transition-colors">NutriMeal</Link>
            <Link to="/about" className="text-white/80 hover:text-gold transition-colors">About</Link>
            <Link to="/contact" className="text-white/80 hover:text-gold transition-colors">Contact</Link>
          </div>
          
          <Link to="/book">
            <Button className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6">
              Book a Concierge
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Crown className="h-8 w-8 text-gold" />
              <span className="text-2xl font-display font-bold">Nicholas</span>
            </div>
            <p className="text-white/70 mb-4">
              Your time is luxury. Let us handle the rest.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-gold" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-white/70">
              <li>Elite Shopping</li>
              <li>Errands & Drop-offs</li>
              <li>Grocery Delivery</li>
              <li>Student Assistance</li>
              <li>NutriMeal Program</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Membership</h4>
            <ul className="space-y-2 text-white/70">
              <li>UWI Life - $199/month</li>
              <li>Urban Assist - $499/month</li>
              <li>Nicholas Black - $999/month</li>
              <li>Pay-As-You-Go</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>Phone: +1 (868) 123-4567</li>
              <li>Email: concierge@nicholas.tt</li>
              <li>Port of Spain, Trinidad</li>
              <li>Monday - Sunday: 6AM - 11PM</li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/20 mb-8" />
        
        <div className="text-center text-white/60">
          <p>&copy; 2025 Nicholas Concierge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Homepage Component
const Home = () => {
  const [membershipTiers, setMembershipTiers] = useState([]);

  useEffect(() => {
    const fetchMembershipTiers = async () => {
      try {
        const response = await axios.get(`${API}/membership-tiers`);
        setMembershipTiers(response.data);
      } catch (error) {
        console.error('Error fetching membership tiers:', error);
      }
    };
    fetchMembershipTiers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjb25jaWVyZ2UlMjBzZXJ2aWNlfGVufDB8fHx8MTc1NDU3NzY1OHww&ixlib=rb-4.1.0&q=85')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 to-charcoal/70"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 leading-tight">
            Your Time is <span className="text-gold">Luxury</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
            Let Us Handle the Rest.
          </p>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            High-end, on-demand personal concierge service for busy professionals, students, 
            and discerning individuals who value their time above all else.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/book">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 text-lg">
                Book a Concierge <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/membership">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-8 py-4 text-lg">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-charcoal mb-6">Premium Services</h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              From elite shopping to daily meal delivery, we handle life's details 
              so you can focus on what matters most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Elite Shopping",
                description: "Personal shopping for fashion, gifts, and luxury items with impeccable taste."
              },
              {
                icon: Car,
                title: "Errands & Drop-offs",
                description: "Package delivery, document handling, and all your daily errands."
              },
              {
                icon: GraduationCap,
                title: "Student Assistance",
                description: "Academic support, campus errands, and study-life balance solutions."
              },
              {
                icon: Utensils,
                title: "NutriMeal Program",
                description: "Daily delivery of nutritionist-designed, gourmet healthy meals."
              }
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                    <service.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-4">{service.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers Preview */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-white mb-6">Membership Tiers</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose the perfect level of luxury service for your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.map((tier) => (
              <Card key={tier.id} className={`relative ${tier.is_popular ? 'border-gold border-2 scale-105' : 'border-white/20'} bg-white/5 backdrop-blur-sm`}>
                {tier.is_popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal font-semibold">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-display text-white mb-2">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-gold mb-2">
                    ${tier.price} <span className="text-lg font-normal text-white/70">TTD/{tier.billing_cycle}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <Check className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/membership">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8">
                View Full Details <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-charcoal mb-6">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                title: "Investment Banker",
                content: "Nicholas Concierge has transformed my work-life balance. I can finally focus on what I do best while they handle everything else with such elegance and precision.",
                rating: 5
              },
              {
                name: "Marcus Thompson",
                title: "UWI Student",
                content: "As a medical student, every minute counts. The Student Assistance program helps me stay organized while the NutriMeal delivery keeps me well-fed during long study sessions.",
                rating: 5
              },
              {
                name: "Dr. Priya Patel",
                title: "Physician",
                content: "The Premium tier's 24/7 support is invaluable for my unpredictable schedule. They anticipate my needs better than I do sometimes!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg bg-white p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-charcoal/80 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-charcoal">{testimonial.name}</div>
                  <div className="text-charcoal/60">{testimonial.title}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-charcoal/90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-display font-bold text-white mb-6">
              Ready to Reclaim Your <span className="text-gold">Time</span>?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Join Trinidad's most exclusive concierge service and experience luxury like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/book">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-4 text-lg">
                  Start Your Journey <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-10 py-4 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Services Page
const Services = () => {
  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-display font-bold text-charcoal mb-6">Our Services</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Comprehensive luxury services designed to elevate your lifestyle and maximize your precious time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            {
              icon: ShoppingBag,
              title: "Elite Shopping",
              description: "Personal shopping services with impeccable taste and attention to detail.",
              features: ["Fashion consultation", "Gift sourcing", "Luxury item procurement", "Style coordination"],
              image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjb25jaWVyZ2UlMjBzZXJ2aWNlfGVufDB8fHx8MTc1NDU3NzY1OHww&ixlib=rb-4.1.0&q=85"
            },
            {
              icon: Car,
              title: "Errands & Drop-offs",
              description: "Comprehensive errand services to handle all your daily tasks and deliveries.",
              features: ["Package delivery", "Document handling", "Appointment scheduling", "Property maintenance coordination"],
              image: "https://images.unsplash.com/photo-1704511618479-b7d95feab8d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxjb25jaWVyZ2UlMjBzZXJ2aWNlfGVufDB8fHx8MTc1NDU3NzY1OHww&ixlib=rb-4.1.0&q=85"
            },
            {
              icon: GraduationCap,
              title: "Student Assistance",
              description: "Specialized support for university students to excel academically while maintaining balance.",
              features: ["Campus errands", "Study material organization", "Meal planning", "Administrative support"],
              image: "https://images.unsplash.com/photo-1552622594-9a37efeec618?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxjb25jaWVyZ2UlMjBzZXJ2aWNlfGVufDB8fHx8MTc1NDU3NzY1OHww&ixlib=rb-4.1.0&q=85"
            },
            {
              icon: Utensils,
              title: "NutriMeal Program",
              description: "Daily delivery of nutritionist-designed, gourmet healthy meals tailored to your lifestyle.",
              features: ["Personalized meal plans", "Daily fresh delivery", "Nutritional tracking", "Dietary accommodation"],
              image: "https://images.unsplash.com/photo-1544986581-efac024faf62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eXxlbnwwfHx8fDE3NTQ1Nzc2NjR8MA&ixlib=rb-4.1.0&q=85"
            }
          ].map((service, index) => (
            <Card key={index} className="overflow-hidden shadow-lg border-none">
              <div className="aspect-video relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/40"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="h-8 w-8 text-gold" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-semibold text-charcoal mb-4">{service.title}</h3>
                <p className="text-charcoal/70 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-charcoal/80">
                      <Check className="h-5 w-5 text-gold mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/book">
                  <Button className="mt-6 bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                    Request This Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Membership Page
const Membership = () => {
  const [membershipTiers, setMembershipTiers] = useState([]);

  useEffect(() => {
    const fetchMembershipTiers = async () => {
      try {
        const response = await axios.get(`${API}/membership-tiers`);
        setMembershipTiers(response.data);
      } catch (error) {
        console.error('Error fetching membership tiers:', error);
      }
    };
    fetchMembershipTiers();
  }, []);

  return (
    <div className="min-h-screen bg-charcoal pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-display font-bold text-white mb-6">Membership Tiers</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the perfect level of luxury service that matches your lifestyle and needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {membershipTiers.map((tier) => (
            <Card key={tier.id} className={`relative ${
              tier.is_popular ? 'border-gold border-2 scale-105' : 'border-white/20'
            } bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300`}>
              {tier.is_popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal font-semibold">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-display text-white mb-4">{tier.name}</CardTitle>
                <div className="text-5xl font-bold text-gold mb-4">
                  ${tier.price}
                </div>
                <div className="text-white/70">TTD per {tier.billing_cycle}</div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <Check className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-8 bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                  Choose {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pay-As-You-Go */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-display font-bold text-white mb-4">Pay-As-You-Go</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Not ready for a membership? No problem. Access our services on-demand with flexible pricing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gold mb-2">Service Fee</h4>
                <p className="text-white/70">Base rate + hourly charges</p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gold mb-2">No Commitment</h4>
                <p className="text-white/70">Use services as needed</p>
              </div>
            </div>
            <Link to="/book">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                Book a Service
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting contact form:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-display font-bold text-charcoal mb-6">Contact Us</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Ready to experience luxury concierge service? Get in touch with us today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Send us a message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
                  Thank you! We'll be in touch within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-charcoal/20"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-charcoal/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-charcoal/20"
                  />
                </div>
                
                <div>
                  <label className="block text-charcoal font-medium mb-2">Service Interest</label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData({...formData, service_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elite-shopping">Elite Shopping</SelectItem>
                      <SelectItem value="errands">Errands & Drop-offs</SelectItem>
                      <SelectItem value="student-assistance">Student Assistance</SelectItem>
                      <SelectItem value="nutrimeal">NutriMeal Program</SelectItem>
                      <SelectItem value="membership">Membership Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-charcoal font-medium mb-2">Message *</label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="border-charcoal/20"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-display font-semibold text-charcoal mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gold mr-3" />
                    <span className="text-charcoal/80">+1 (868) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gold mr-3" />
                    <span className="text-charcoal/80">concierge@nicholas.tt</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gold mr-3" />
                    <span className="text-charcoal/80">Port of Spain, Trinidad</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-display font-semibold text-charcoal mb-4">Business Hours</h3>
                <div className="space-y-2 text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>6:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>8:00 AM - 10:00 PM</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gold/10 rounded-md">
                  <p className="text-sm text-charcoal/70">
                    <strong>Premium Members:</strong> 24/7 emergency support available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Book Service Page
const BookService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_category: '',
    service_details: '',
    preferred_date: '',
    preferred_time: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/service-request`, formData);
      setSubmitStatus('success');
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting service request:', error);
    }
    
    setIsSubmitting(false);
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="h-10 w-10 text-charcoal" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-6">Request Submitted!</h1>
          <p className="text-xl text-white/80 mb-8">
            Thank you for choosing Nicholas Concierge. Our team will contact you within 2 hours to confirm your service details.
          </p>
          <Button onClick={() => navigate('/')} className="bg-gold hover:bg-gold/90 text-charcoal font-semibold">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-display font-bold text-charcoal mb-6">Book a Concierge</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Tell us what you need, and we'll take care of the rest with our signature luxury service.
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto border-none shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                  Something went wrong. Please try again.
                </div>
              )}
              
              {/* Client Information */}
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Full Name *</label>
                    <Input
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                      className="border-charcoal/20"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                      className="border-charcoal/20"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Phone</label>
                    <Input
                      value={formData.client_phone}
                      onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                      className="border-charcoal/20"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Service Details */}
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Service Request</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Service Category *</label>
                    <Select
                      required
                      value={formData.service_category}
                      onValueChange={(value) => setFormData({...formData, service_category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elite-shopping">Elite Shopping</SelectItem>
                        <SelectItem value="errands-dropoffs">Errands & Drop-offs</SelectItem>
                        <SelectItem value="grocery-delivery">Grocery Delivery</SelectItem>
                        <SelectItem value="student-assistance">Student Assistance</SelectItem>
                        <SelectItem value="nutrimeal">NutriMeal Program</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Service Details *</label>
                    <Textarea
                      required
                      rows={4}
                      value={formData.service_details}
                      onChange={(e) => setFormData({...formData, service_details: e.target.value})}
                      className="border-charcoal/20"
                      placeholder="Please describe what you need in detail..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Preferred Date</label>
                      <Input
                        type="date"
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                        className="border-charcoal/20"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Preferred Time</label>
                      <Input
                        type="time"
                        value={formData.preferred_time}
                        onChange={(e) => setFormData({...formData, preferred_time: e.target.value})}
                        className="border-charcoal/20"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Urgency</label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => setFormData({...formData, urgency: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                          <SelectItem value="asap">ASAP (Within 2 Hours)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-12"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Submit Service Request'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-charcoal/60 mt-4">
                  Our team will contact you within 2 hours to confirm details and pricing.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<BookService />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;