"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useId, useRef, useState } from "react";

const PricingSwitch = ({
  button1,
  button2,
  onSwitch,
  className,
  layoutId,
}: {
  button1: string;
  button2: string;
  onSwitch: (value: string) => void;
  className?: string;
  layoutId?: string;
}) => {
  const [selected, setSelected] = useState("0");
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative z-10 w-full flex rounded-full bg-neutral-50 border border-gray-200 p-1 dark:bg-neutral-800 dark:border-neutral-700",
        className,
      )}
    >
      <button
        onClick={() => handleSwitch("0")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
          selected === "0"
            ? "text-white"
            : "text-muted-foreground hover:text-black dark:hover:text-white",
        )}
      >
        {selected === "0" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border-4 shadow-sm shadow-black/20 border-black/30 bg-gradient-to-t from-green-600 to-green-600 dark:from-purple-600 dark:to-purple-600"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">{button1}</span>
      </button>

      <button
        onClick={() => handleSwitch("1")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
          selected === "1"
            ? "text-white"
            : "text-muted-foreground hover:text-black dark:hover:text-white",
        )}
      >
        {selected === "1" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border-4 shadow-sm shadow-black/20 border-black/30 bg-gradient-to-t from-green-600 to-green-600 dark:from-purple-600 dark:to-purple-600"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative flex justify-center items-center gap-2">
          {button2}
        </span>
      </button>
    </div>
  );
};

export default function PricingSection1() {
  const [isUpdates, setIsUpdates] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const timelineVaraints = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const toggleUpdates = (value: string) =>
    setIsUpdates(Number.parseInt(value) === 1);
  const toggleCorporate = (value: string) =>
    setIsCorporate(Number.parseInt(value) === 1);

  const calculatePrice = () => {
    if (!isUpdates && !isCorporate) return 0; // Free tier
    if (isUpdates && !isCorporate) return 10; // Pro tier
    if (!isUpdates && isCorporate) return 0; // Free tier (corporate)
    if (isUpdates && isCorporate) return 10; // Pro tier (corporate)
    return 0;
  };

  const calculateOriginalPrice = () => {
    const currentPrice = calculatePrice();
    if (currentPrice === 0) return 0;
    return Math.round(currentPrice * 1.45);
  };

  const currentPrice = calculatePrice();
  const originalPrice = calculateOriginalPrice();

  const freeFeatures = [
    "10 Free Image Generations per Day",
    "Limited Model Selection",
    "Captcha Required (human verification)"
  ];

  const proFeatures = [
    "50 Free Image Generations per Day",
    "Access all Image and Video models",
    "Full API Access"
  ];

  return (
    <div id="pricing" className="px-4 pt-10 w-full min-h-screen mx-auto relative" ref={pricingRef}>
      <div className="bg-white py-16 px-4 dark:bg-neutral-900">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 40%, #95d63f 100%)",
          }}
        />
        <div className="absolute inset-0 z-0 dark:hidden"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 40%, #95d63f 100%)",
          }}
        />
        <div className="absolute inset-0 z-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #000 40%, #7e22ce 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="md:text-5xl sm:text-4xl text-3xl font-semibold text-gray-900 mb-4 leading-[120%] dark:text-white">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0.4,
              }}
            >
              Simple, Transparent Pricing
            </VerticalCutReveal>
          </h1>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Pay As You Go. No subscription needed. Only pay for what you use.
          </TimelineContent>
        </div>
      </div>

      {/* Product Features */}
      <div className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:gap-12 gap-4 items-center">
            <div>
              <TimelineContent
                as="h3"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-3xl font-medium text-gray-900 mb-2 dark:text-white"
              >
                {isUpdates ? "Pro Plan" : "Free Plan"}
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                {isUpdates 
                  ? "No monthly subscription. Pay as you go." 
                  : "Try our services for free. No account required."}
              </TimelineContent>

              <div className="space-y-4">
                {(isUpdates ? proFeatures : freeFeatures).map((feature, index) => (
                  <TimelineContent
                    key={index}
                    as="div"
                    animationNum={4 + index}
                    timelineRef={pricingRef}
                    customVariants={timelineVaraints}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-600 shadow-md shadow-green-500/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0 dark:from-purple-600 dark:to-purple-600 dark:shadow-purple-500/30">
                      <CheckCheck className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </TimelineContent>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
              >
                <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">
                  Access to updates
                </h4>
                <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">
                  One-time payment, updates come to the email
                </p>
                <PricingSwitch
                  button1="Free"
                  button2="Pro"
                  onSwitch={toggleUpdates}
                  className="grid grid-cols-2 w-full"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={pricingRef}
                customVariants={revealVariants}
              >
                <h4 className="font-semibold text-gray-900 mb-1 dark:text-white">
                  Lifetime license
                </h4>
                <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">
                  Select Corporate if you're part of the team
                </p>
                <PricingSwitch
                  button1="Personal"
                  button2="Corporate"
                  onSwitch={toggleCorporate}
                  className="grid grid-cols-2 w-full"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-center grid grid-cols-2 items-center gap-2 px-2"
              >
                <div className="flex flex-col items-center mb-4">
                  {currentPrice === 0 ? (
                    <span className="text-5xl font-semibold text-gray-900 dark:text-white">
                      $0
                    </span>
                  ) : (
                    <>
                      <span className="text-5xl font-semibold text-gray-900 dark:text-white">
                        ${currentPrice}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        as low as
                      </span>
                    </>
                  )}
                </div>
                <TimelineContent
                  as="button"
                  animationNum={6}
                  timelineRef={pricingRef}
                  customVariants={revealVariants}
                  className="text-white text-xl font-semibold h-10 sm:h-16 w-full rounded-full border-4 shadow-sm shadow-green-600/30 border-green-600 bg-gradient-to-t from-green-600 to-green-600 dark:shadow-purple-600/30 dark:border-purple-600 dark:bg-gradient-to-t dark:from-purple-600 dark:to-purple-600 flex items-center justify-center"
                >
                  {isUpdates ? "Get Started" : "Try Now"}
                </TimelineContent>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}