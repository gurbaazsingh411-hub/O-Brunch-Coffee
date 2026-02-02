import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, lazy, useRef } from 'react';
import { MapPin, Clock, Instagram, Coffee, UtensilsCrossed, IceCream, Sandwich } from 'lucide-react';
import heroBrunch from '@/assets/hero-brunch.jpg';

const CoffeeScene = lazy(() => import('@/components/CoffeeScene'));

const menuCategories = [
  {
    icon: Coffee,
    title: "Café & Boissons Chaudes",
    items: ["Espresso", "Cappuccino", "Latte Art", "Chocolat Chaud"],
    price: "À partir de 3,50 €"
  },
  {
    icon: IceCream,
    title: "Thé Glacé & Bubble Tea",
    items: ["Latte Glacé", "Bubble Tea", "Frappé", "Smoothies"],
    price: "À partir de 5,00 €"
  },
  {
    icon: UtensilsCrossed,
    title: "Douceurs",
    items: ["Pancakes", "Gaufres", "Pain Perdu", "Pâtisseries"],
    price: "À partir de 8,50 €"
  },
  {
    icon: Sandwich,
    title: "Brunch Salé",
    items: ["Toast à l'Avocat", "Eggs Benedict", "Club Sandwich", "Assiettes de Brunch"],
    price: "À partir de 12,00 €"
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 80, rotateX: -15 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      >
        <div className="container-cafe flex items-center justify-between py-4 px-6">
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logo.jpg" alt="O' Brunch Coffee" className="h-12 w-auto object-contain" />
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'Horaires', 'Nous Trouver'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-foreground/80 hover:text-primary transition-colors relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cafe text-sm py-2 px-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Nous Suivre
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroScale }}
        >
          <img
            src={heroBrunch}
            alt="Brunch artisanal français"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </motion.div>

        {/* 3D Coffee Scene */}
        <Suspense fallback={<div className="absolute inset-0" />}>
          <div className="hidden lg:block">
            <CoffeeScene />
          </div>
        </Suspense>

        <motion.div
          className="relative z-10 container-cafe px-6 text-center"
          style={{ opacity: heroOpacity } as any}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              ✨ Ouvert à Huy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
          >
            Fresh • Sweet •{" "}
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Salé
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Votre coin cosy pour le brunch toute la journée et le café spécialité au cœur de Huy.
            Préparé avec amour, servi avec le sourire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#menu"
              className="btn-cafe"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir Notre Menu
            </motion.a>
            <motion.a
              href="#location"
              className="btn-cafe-outline"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Nous Trouver
            </motion.a>
          </motion.div>

          {/* Today's Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border"
          >
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm">
              <strong>Aujourd'hui :</strong> 9h00 – 18h00
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-cafe">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={fadeInUp}
            >
              Notre Menu
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              variants={fadeInUp}
            >
              Du café artisanal aux assiettes de brunch dignes d'Instagram,
              chaque plat est préparé avec des ingrédients frais et de qualité.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000"
          >
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="card-cafe group cursor-pointer transform-gpu"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  {category.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <p className="text-primary font-semibold">{category.price}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Vous voulez voir notre menu complet avec les prix ?</p>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cafe-outline inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Voir sur Instagram
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding overflow-hidden">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-coffee p-8 md:p-12 lg:p-16"
          >
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="currentColor" className="text-white" />
              </svg>
            </motion.div>

            <div className="relative z-10 max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
              >
                💝 Pour une Durée Limitée
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Boîte Brunch Saint-Valentin
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-lg mb-8"
              >
                Surprenez votre être cher avec notre boîte brunch spéciale,
                comprenant des pancakes sucrés, des fruits frais et du café artisanal.
                Parfait pour un matin romantique !
              </motion.p>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-medium bg-white text-espresso hover:bg-white/90 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Commander par Message Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hours Section */}
      <section id="hours" className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-cafe">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <motion.h2
                className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6"
                variants={fadeInLeft}
              >
                Horaires d'Ouverture
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8"
                variants={fadeInLeft}
              >
                Nous sommes là pour rendre vos matins (et après-midis) délicieux.
                Passez prendre un brunch cosy ou emportez votre café !
              </motion.p>

              <div className="space-y-4">
                {[
                  { day: "Lundi – Vendredi", hours: "9h00 – 18h00" },
                  { day: "Samedi", hours: "9h00 – 19h00" },
                  { day: "Dimanche", hours: "10h00 – 17h00" }
                ].map((item, i) => (
                  <motion.div
                    key={item.day}
                    className="flex justify-between items-center py-3 border-b border-border"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className="text-primary">{item.hours}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-4 rounded-2xl bg-accent/10 border border-accent/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-accent font-medium">
                  🎒 Vacances Scolaires : Horaires étendus disponibles !
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="relative"
            >
              <motion.div
                className="aspect-square rounded-3xl bg-gradient-card border border-border overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-center p-8">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Clock className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Ouvert Maintenant
                  </h3>
                  <p className="text-muted-foreground">
                    Venez nous dire bonjour ! ☕
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section-padding overflow-hidden">
        <div className="container-cafe">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nous Trouver
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Situé au cœur de Huy, nous ne sommes qu'à quelques pas du centre-ville.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden h-[400px] border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2532.8!2d5.2394!3d50.5194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDMxJzA5LjgiTiA1wrAxNCcyMS44IkU!5e0!3m2!1sen!2sbe!4v1600000000000!5m2!1sen!2sbe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="O' Brunch Coffee Location"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="card-cafe flex flex-col justify-center"
            >
              {[
                { icon: MapPin, title: "Notre Adresse", content: "Rue des Rôtisseurs 6\n4500 Huy, Belgique" },
                { icon: Instagram, title: "Contactez-Nous", content: "Envoyez-nous un message sur Instagram pour les commandes\net réservations" }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.a
                href="https://www.google.com/maps/dir//Rue+des+Rôtisseurs+6,+4500+Huy,+Belgium"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cafe w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Obtenir l'Itinéraire
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-cafe">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="text-center"
          >
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6"
              variants={scaleIn}
            >
              Suivez Notre Parcours
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto mb-8"
              variants={fadeInUp}
            >
              Rejoignez notre communauté pour l'inspiration quotidienne, les concours,
              et les premiers aperçus des nouveaux plats !
            </motion.p>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cafe inline-flex items-center"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5 mr-2" />
              @obrunchcoffee
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-8 px-6 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-cafe flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="font-serif text-lg font-semibold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            O' Brunch Coffee
          </motion.p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} O' Brunch Coffee – Huy. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
