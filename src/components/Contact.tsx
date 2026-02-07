import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const contactCards = [
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    content: [
      'Krishna University Campus',
      'Machilipatnam, Andhra Pradesh',
      'India - 521001',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Details',
    icon: Phone,
    content: [
      '+91 98765 43210',
      '+91 98765 43211',
      'info@krivvass.com',
    ],
  },
  {
    id: 'social',
    title: 'Social Connect',
    icon: Mail,
    socials: [
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Youtube, href: '#', label: 'YouTube' },
    ],
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Get In</span> Touch
          </h2>
          <p className="section-subtitle">
            Have questions? We'd love to hear from you
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card-hover p-8 text-center h-full flex flex-col"
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  {card.title}
                </h3>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  {card.content ? (
                    <div className="space-y-2">
                      {card.content.map((line, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : card.socials ? (
                    <div className="flex justify-center gap-4">
                      {card.socials.map((social) => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300"
                          >
                            <SocialIcon className="w-5 h-5" />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Contact;
