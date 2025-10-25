"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const leftFeatures = [
  {
    title: {
      en: "Pure Android, Enhanced",
      ja: "ピュアで強化されたAndroid",
    },
    description: {
      en: "Stock Android at its core, with useful improvements that keep things simple.",
      ja: "純粋なAndroidをメインに、便利な改善が加えられています。",
    },
  },
  {
    title: {
      en: "Smooth & Lightweight",
      ja: "スムーズで軽量",
    },
    description: {
      en: "We enhance pure Android with only the most useful features, keeping it clean and functional.",
      ja: "純粋なAndroidの核で、便利な改善が加えられています。",
    },
  },
  {
    title: {
      en: "No Overwhelming Customizations",
      ja: "過度なカスタマイズなし",
    },
    description: {
      en: "Customize what matters without digging through endless settings.",
      ja: "必要以上にカスタマイズせずに設定を変更できます。",
    },
  },
];

const rightFeatures = [
  {
    title: {
      en: "Practical Features That Fit Right In",
      ja: "便利な機能がスムーズに組み込まれています",
    },
    description: {
      en: "Useful additions that enhance daily use without getting in the way.",
      ja: "必要以上にカスタマイズせずに設定を変更できます。",
    },
  },
  {
    title: {
      en: "Regular Security Patch Updates",
      ja: "定期的なセキュリティパッチとアップデート",
    },
    description: {
      en: "Regular security patches and updates straight from Google.",
      ja: "Googleから直接定期的なセキュリティパッチとアップデート",
    },
  },
  {
    title: {
      en: "Theme Picker",
      ja: "テーマ選択",
    },
    description: {
      en: "Easily switch up your look with a simple, lightweight theme selection.",
      ja: "シンプルで軽量なテーマ選択で見た目を簡単に変更できます。",
    },
  },
];

const mobileOrderedFeatures = leftFeatures
  .flatMap((feature, index) => [feature, rightFeatures[index]])
  .filter(Boolean);

const screenshots = [
  "/screenshot-1.png",
  "/screenshot-2.png",
  "/screenshot-3.png",
  "/screenshot-4.png",
  "/screenshot-5.png",
  "/screenshot-6.png",
  "/screenshot-7.png",
];

export default function GallerySection() {
  const { language } = useLanguage();

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  return (
    <motion.div
      className="container px-4 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "en" ? "Gallery" : "ギャラリー"}
        </h2>
      </div>

      <div className="md:hidden space-y-12">
        <div className="relative mx-auto max-w-[300px]">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {screenshots.map((src, idx) => (
                <div key={idx} className="min-w-full">
                  <Image
                    src={src}
                    alt={`Phone screenshot ${idx + 1}`}
                    width={1080}
                    height={2240}
                    className="h-full w-full object-contain"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-r-lg shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-l-lg shadow-md hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === currentImage ? "bg-blue-500" : "bg-gray-300",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {mobileOrderedFeatures.map((feature, index) => (
          <div key={index} className="text-center px-4">
            <h3 className="text-xl font-semibold text-[#00c8ff] mb-2">
              {feature.title[language]}
            </h3>
            <p className="text-muted-foreground mx-auto max-w-[400px]">
              {feature.description[language]}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-8 items-center">
        <div className="space-y-12">
          {leftFeatures.map((feature, index) => (
            <div key={index} className="text-right">
              <h3 className="text-xl font-semibold text-[#00c8ff] mb-2">
                {feature.title[language]}
              </h3>
              <p className="text-muted-foreground">
                {feature.description[language]}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-[300px]">
          <div className="relative aspect-[1080/2240] w-full max-h-[600px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {screenshots.map((src, idx) => (
                <div key={idx} className="min-w-full">
                  <Image
                    src={src}
                    alt={`Phone screenshot ${idx + 1}`}
                    width={1080}
                    height={2240}
                    className="h-full w-full object-contain"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-r-lg shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-l-lg shadow-md hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === currentImage ? "bg-blue-500" : "bg-gray-300",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {rightFeatures.map((feature, index) => (
            <div key={index} className="text-left">
              <h3 className="text-xl font-semibold text-[#00c8ff] mb-2">
                {feature.title[language]}
              </h3>
              <p className="text-muted-foreground">
                {feature.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
