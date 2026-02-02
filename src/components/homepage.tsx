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
import { MdOutlineCloudQueue } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import GallerySection from "@/components/gallery";
import { FaDownload } from "react-icons/fa6";

const MotionImage = motion.create(Image);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const features = [
  {
    icon: LuPaintbrushVertical,
    title: {
      en: "Customizable Features",
      ja: "カスタマイズ可能な機能",
    },
    description: {
      en: "Add some extra functionality with a few thoughtful, carefully selected features that enhance usability and personalization without compromising system performance.",
      ja: "システムのパフォーマンスを損なうことなく、使いやすさとパーソナライゼーションを向上させる、慎重に選択された機能でさらなる機能性を追加します。",
    },
  },
  {
    icon: LuCircleFadingArrowUp,
    title: {
      en: "Frequent Stable Updates",
      ja: "頻繁な安定したアップデート",
    },
    description: {
      en: "These updates are carefully tested and designed to keep your system in a stable state while ensuring you always have the latest security patches and improvements.",
      ja: "これらのアップデートは慎重にテストされ、最新のセキュリティパッチと改善点を常に提供しながら、システムを安定した状態に保つように設計されています。",
    },
  },
  {
    icon: LuSmartphone,
    title: {
      en: "Stock Android Experience",
      ja: "ストックAndroidエクスペリエンス",
    },
    description: {
      en: "Enjoy a clean, bloat-free interface that stays true to the pure Android design and functionality.",
      ja: "純粋なAndroidのデザインと機能性を忠実に再現した、クリーンでブロートウェアのないインターフェースをお楽しみください。",
    },
  },
  {
    icon: MdOutlineCloudQueue,
    title: {
      en: "OTA Support",
      ja: "OTAアップデート",
    },
    description: {
      en: "Enjoy seamless OTA (Over-the-Air) updates, enabling you to effortlessly download and install the latest updates through the built-in Updater app. Regular updates are released monthly, ensuring your device stays protected with the most recent security patches.",
      ja: "ストックAndroidエクスペリエンスを提供するため、OTAアップデートをサポートしています。定期的にリリースされる更新プログラムにより、セキュリティパッチや改善点を常に提供しながら、システムを安定した状態に保つように設計されています。",
    },
  },
];

export default function HomePage() {
  const { language } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center ">
        <section className="h-screen flex flex-col md:flex-row items-center justify-center md:justify-between py-6 md:py-12 lg:py-24 w-[93%] lg:w-[65%]">
          <motion.div
            className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-center gap-6"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="flex items-center justify-center w-full md:w-auto md:order-2">
              <MotionImage
                src="/logo.svg"
                width={200}
                height={200}
                alt="WitAqua Logo"
                className="rounded-lg w-[20%] md:w-[200px] object-cover"
                priority
                variants={fadeIn}
                draggable="false"
              />
            </div>

            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 flex-1 h-full">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  WitAqua
                </h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  variants={fadeIn}
                >
                  {language === "en"
                    ? "WitAqua is a custom Android ROM developed by Japanese Android enthusiasts. The primary goal of this ROM is to deliver a stock Android experience, free from unnecessary bloatware. It offers a clean, responsive system with a streamlined interface. While the ROM maintains the core features and simplicity of stock Android, it also includes several useful, carefully selected enhancements and additional features that improve usability and customization."
                    : "WitAquaは、日本のAndroid愛好家によって開発されたAndroid カスタムROMです。このROMの主な目的は、不要なブロートウェアのないストックAndroidエクスペリエンスを提供することです。クリーンでレスポンシブなシステムと合理化されたインターフェースを提供します。このROMはストックAndroidの主要機能とシンプルさを維持しながら、使いやすさとカスタマイズ性を向上させる、慎重に選択された有用な拡張機能と追加機能も含んでいます。"}
                </motion.p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
                <Link
                  href="https://download.witaqua.org/"
                  target="_blank"
                  rel="noreferrer noopener">
                  <Button className="inline-flex h-10 items-center justify-center bg-[#00c8ff] transition-colors duration-300 hover:bg-[#00aeff] font-medium">
                    {language === "en" ? "Get WitAqua" : "WitAquaを入手する"}
                    <FaDownload className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-12 w-[93%] lg:w-[65%] bg-white dark:bg-[#212121] rounded-3xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {language === "en" ? "Features" : "特徴"}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-11 md:px-12 lg:px-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title[language]}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <feature.icon className="w-12 h-12 mb-4 text-[#00c8ff]" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title[language]}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description[language]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:w-[65%] rounded-3xl">
          <GallerySection />
        </section>

        <section className="py-12 w-[93%] lg:w-[65%] bg-white dark:bg-[#212121] rounded-3xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex md:items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-8 md:mb-0 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  {language === "en" ? "Contributing" : "貢献"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {language === "en"
                    ? "Interested in contributing? We welcome contributions from developers and enthusiasts around the globe. Whether it's fixing bugs, adding features, or improving documentation, your help is invaluable."
                    : "コントリビュートに興味がありますか？私たちは世界中の開発者や愛好家からの貢献を歓迎します。バグの修正、機能の追加、ドキュメントの改善など、あなたの助けは非常に貴重です。"}
                </p>
                <p className="text-muted-foreground mb-4">
                  {language === "en"
                    ? "To get started, visit our GitHub repository."
                    : "始めるには、私たちのGitHubリポジトリにアクセス。"}
                </p>
                <Link
                  href="https://github.com/WitAqua"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Button className="bg-[#00c8ff] transition-colors duration-300 hover:bg-[#00aeff] ">
                    {language === "en" ? "Click Here" : "ここをクリック"}{" "}
                    <LuArrowRight className="ml-2 h-4 w-4" />
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
