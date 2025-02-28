"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/components/team";
import { useLanguage } from "@/contexts/LanguageContext";

const teamMembers = [
  {
    name: "Toufu",
    role: "Founder/Lead Developer",
    image: "/toufu.png",
    github: "toufune",
    twitter: "toufu14271",
  },
  {
    name: "Maitani-Sakura",
    role: "Co-Founder/Developer",
    image: "/maitani-sakura.png",
    github: "maitani-sakura",
    twitter: "M_Sakura479",
    telegram: "M_Sakura479",
    www: "bento.me/maitani-sakura",
  },
  {
    name: "soralis0912",
    role: "Developer",
    image: "/soralis0912.png",
    github: "soralis0912",
    twitter: "soralis_0912",
    telegram: "soralis_0912",
    www: "soralis.org",
  },
  {
    name: "neroices",
    role: "Developer",
    image: "/neroices.png",
    github: "neroices",
    twitter: "letsmakeices",
    www: "slce.moe",
  },
  {
    name: "MONE-FIERA",
    role: "Developer",
    image: "/monefiera.png",
    github: "monefiera",
    twitter: "Forsaken_Love02",
  },
  {
    name: "Yumagi",
    role: "Developer",
    image: "/yumagi.png",
    github: "ymag-h",
    twitter: "ymag_h",
  },
  {
    name: "satokun2668",
    role: "Designer",
    image: "/satokun.jpg",
    github: "numaaqours",
    twitter: "numa_aqours",
  },
  {
    name: "Garry050",
    role: "Advisor",
    image: "/garry050.png",
    github: "garry050",
  },
  {
    name: "Ruron",
    role: "Developer",
    image: "/ruron.png",
    github: "RuronKun3141",
    twitter: "RuronKun_PC",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface AboutPageProps {
  lang?: string;
}

export default function AboutPage({ lang }: AboutPageProps) {
  const { language } = useLanguage();
  const currentLang = lang || language;

  return (
    <motion.div
      className="w-[93%] lg:w-[65%] py-28 container px-4 sm:px-6 lg:px-8 mx-auto"
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
        {currentLang === "en" ? "About WitAqua" : "WitAquaについて"}
      </motion.h1>
      <motion.section className="mb-12 text-left" variants={fadeInUp}>
        <p className="text-lg mb-4">
          {currentLang === "en"
            ? "We're a small team of passionate Android enthusiasts from Japan, and we've come together to create something special. It all started because we love the simplicity of stock Android but felt it could use a little more personality and practicality without all the unnecessary bloat. So, we rolled up our sleeves and got to work, crafting a clean, and responsive."
            : "私たちは日本のAndroid愛好家の小さなチームで、特別なものを作るために集まりました。ストックAndroidのシンプルさが好きでしたが、不要なブロートウェアなしでもう少しパーソナリティと実用性が必要だと感じたことがきっかけでした。そこで、私たちは腕まくりをして、クリーンでレスポンシブなROMの作成に取り掛かりました。"}
        </p>
        <p className="text-lg mb-4">
          {currentLang === "en"
            ? "We kept the core Android experience intact while adding some carefully chosen enhancements to make your device more customizable, and just plain better to use. We're not a big corporation or a fancy tech giant. We're just a group of like-minded developers who love tinkering with Android and making it better for everyone."
            : "Androidの核となる体験を損なうことなく、デバイスをよりカスタマイズしやすく、より使いやすくするために慎重に選ばれた機能強化を加えました。私たちは大企業や華やかな技術大手ではありません。Androidをいじるのが好きで、みんなのためにより良いものを作りたいと思っている開発者のグループです。"}
        </p>
        <p className="text-lg">
          {currentLang === "en"
            ? "So, whether you're here to try something new, or just curious about what we're building, welcome to WitAqua! We're excited to have you join us on this journey at a time."
            : "新しいものを試してみたい方も、私たちが何を作っているのか興味がある方も、WitAquaへようこそ！この旅に参加していただけることを嬉しく思います。"}
        </p>
      </motion.section>
      <motion.section variants={fadeInUp}>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {currentLang === "en" ? "Our Team" : "私たちのチーム"}
        </h2>
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
