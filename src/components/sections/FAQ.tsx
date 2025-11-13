import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is ImageRouter.io compatible with OpenAI's API?",
    answer: "Yes! ImageRouter.io is fully compatible with OpenAI's image generation API. You can use it as a drop-in replacement by simply changing the base URL and API key."
  },
  {
    question: "What models are available?",
    answer: "We provide access to 80+ models including Stable Diffusion XL, Stable Diffusion 2.1, Kandinsky 2.2, and many more. New models are added regularly based on community feedback."
  },
  {
    question: "How does pricing work?",
    answer: "We use a simple pay-as-you-go model starting from $0.001 per image. There are no subscriptions, no minimums, and no hidden fees. You only pay for what you generate."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We take security seriously. All API requests are encrypted, we don't store your prompts or generated images unless you explicitly request it, and we're fully GDPR compliant."
  },
  {
    question: "What integrations are supported?",
    answer: "ImageRouter.io works with any tool that supports OpenAI's API, including Python, Node.js, n8n, Zapier, Make, and more. We provide ready-to-use code examples for popular platforms."
  },
  {
    question: "Do you offer support?",
    answer: "Yes! We provide 24/7 support through our documentation, community Discord, and email. Enterprise customers also get dedicated support channels and SLA guarantees."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about ImageRouter.io
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="text-lg font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
