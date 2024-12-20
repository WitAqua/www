"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/components/team-member";

const teamMembers = [
  {
    name: "Toufu",
    role: "Founder/Lead Developer",
    image: "/toufu.png",
    github: "toufune",
  },
  {
    name: "Maitani-Sakura",
    role: "Co-Founder/Developer",
    image: "/maitani-sakura.png",
    github: "maitani-sakura",
  },
  {
    name: "soralis0912",
    role: "Developer",
    image: "/soralis0912.png",
    github: "soralis0912",
  },
  {
    name: "neroices",
    role: "Developer",
    image: "/neroices.png",
    github: "neroices",
  },
  {
    name: "MONE-FIERA",
    role: "Developer",
    image: "/monefiera.png",
    github: "monefiera",
  },
  {
    name: "Yumagi",
    role: "Developer",
    image: "/yumagi.png",
    github: "ymag-h",
  },
  {
    name: "satokun2668",
    role: "Designer",
    image: "/satokun.jpg",
    github: "numaaqours",
  },
  {
    name: "Garry050",
    role: "Advisor",
    image: "/garry050.png",
    github: "garry050",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <motion.div
      className="container py-6 px-4 sm:px-6 lg:px-8 mx-auto"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        variants={fadeInUp}
      >
        About WitAqua
      </motion.h1>
      <motion.section className="mb-12 text-left" variants={fadeInUp}>
        <p className="text-lg mb-4">
          {
            "We're a small team of passionate Android enthusiasts from Japan, and we've come together to create something special. It all started because we love the simplicity of stock Android but felt it could use a little more personality and practicality without all the unnecessary bloat. So, we rolled up our sleeves and got to work, crafting a clean, and responsive."
          }
        </p>
        <p className="text-lg mb-4">
          {
            "We kept the core Android experience intact while adding some carefully chosen enhancements to make your device more customizable, and just plain better to use. We're not a big corporation or a fancy tech giant. We're just a group of like-minded developers who love tinkering with Android and making it better for everyone."
          }
        </p>
        <p className="text-lg">
          {
            "So, whether you're here to try something new, or just curious about what we're building, welcome to WitAqua! We're excited to have you join us on this journey at a time."
          }
        </p>
      </motion.section>
      <motion.section variants={fadeInUp}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
