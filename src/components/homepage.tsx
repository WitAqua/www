"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuPaintbrushVertical,
  LuCircleFadingArrowUp,
  LuSmartphone,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";

const MotionImage = motion.create(Image);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const features = [
  {
    icon: LuPaintbrushVertical,
    title: "Customizable Features",
    description:
      "Add some extra functionality with a few thoughtful, carefully selected features that enhance usability and personalization without compromising system performance.",
  },
  {
    icon: LuCircleFadingArrowUp,
    title: "Frequent Stable Updates",
    description:
      "These updates are carefully tested and designed to keep your system in a stable state while ensuring you always have the latest security patches and improvements.",
  },
  {
    icon: LuSmartphone,
    title: "Stock Android Experience",
    description:
      "Enjoy a clean, bloat-free interface that stays true to the pure Android design and functionality.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="space-y-6 py-8 md:py-12 lg:py-24">
          <motion.div
            className="container flex max-w-[64rem] flex-col items-center justify-center gap-4 text-center px-4 sm:px-6 lg:px-8"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <MotionImage
              src="/logo.png"
              alt="WitAqua Logo"
              width={300}
              height={100}
              priority
              variants={fadeIn}
            />
            <motion.h1
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
              variants={fadeIn}
            >
              WitAqua
            </motion.h1>
            <motion.p
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              variants={fadeIn}
            >
              WitAqua is a custom Android ROM developed by Japanese Android
              enthusiasts. The primary goal of this ROM is to deliver a stock
              Android experience, free from unnecessary bloatware. It offers a
              clean, responsive system with a streamlined interface. While the
              ROM maintains the core features and simplicity of stock Android,
              it also includes several useful, carefully selected enhancements
              and additional features that improve usability and customization.
            </motion.p>
            <motion.div className="space-x-4" variants={fadeIn}>
              <Link href="/devices">
                <Button size="lg">Download Now</Button>
              </Link>
              <Link
                href="https://wiki.witaqua.org"
                target="_blank"
                rel="noopener"
              >
                <Button variant="outline" size="lg">
                  Wiki
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-12 bg-secondary">
          <div className="container px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-11 md:px-12 lg:px-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="md:w-1/2 mb-8 md:mb-0 text-left">
                <h2 className="text-3xl font-bold mb-4">Contributing</h2>
                <p className="text-muted-foreground mb-4">
                  {
                    "Interested in contributing? We welcome contributions from developers and enthusiasts around the globe. Whether it's fixing bugs, adding features, or improving documentation, your help is invaluable."
                  }
                </p>
                <p className="text-muted-foreground mb-4">
                  {"To get started, visit our GitHub repository."}
                </p>
                <Link href="https://github.com/WitAqua">
                  <Button>
                    Click Here <LuArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
