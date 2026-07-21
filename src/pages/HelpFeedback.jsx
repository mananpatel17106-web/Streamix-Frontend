import { useState } from "react";
import toast from "react-hot-toast";
import {
  HelpCircle,
  Mail,
  Bug,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Shield,
  FileText,
  Info,
  ExternalLink,
} from "lucide-react";

const faqs = [
  {
    question: "How do I upload a video?",
    answer:
      "Go to the Upload page, select your video and thumbnail, fill in the required details, choose Public or Private, and click Publish.",
  },
  {
    question: "Why is my uploaded video not visible?",
    answer:
      "If you uploaded it as Private, only you can see it. Change the visibility to Public from the Edit Video page.",
  },
  {
    question: "How can I edit my uploaded video?",
    answer:
      "Open Studio, click the Edit button on your video, update the details, and save your changes.",
  },
  {
    question: "How do I delete my video?",
    answer:
      "Go to Studio, click Delete on the video you want to remove, and confirm the action.",
  },
  {
    question: "How do I report inappropriate content?",
    answer:
      "Use the Report Bug section below or contact our support team with the video link.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Go to Settings → Change Password and enter your current and new password.",
  },
];

const supportCards = [
  {
    title: "Help Center",
    icon: BookOpen,
    description: "Browse articles and tutorials.",
  },
  {
    title: "Contact Support",
    icon: Mail,
    description: "Reach our support team anytime.",
  },
  {
    title: "Report Bug",
    icon: Bug,
    description: "Found something broken? Let us know.",
  },
  {
    title: "Send Feedback",
    icon: MessageSquare,
    description: "Help us improve Streamix.",
  },
];

export default function HelpFeedback() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [bug, setBug] = useState("");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold">
          Help & Feedback
        </h1>

        <p className="mt-3 text-muted text-sm">
          Need help? Browse our FAQs, contact support, report bugs,
          or send us feedback to improve Streamix.
        </p>
      </div>

      {/* Support Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {supportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="card rounded-2xl p-6 transition hover:-translate-y-1 hover:border-rose-500 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                <Icon size={24} />
              </div>

              <h2 className="text-lg font-semibold">
                {card.title}
              </h2>

              <p className="mt-2 text-sm text-muted">
                {card.description}
              </p>

              <button
                className="mt-5 flex items-center gap-2 text-sm font-medium text-rose-500 hover:underline"
              >
                Open
                <ExternalLink size={16} />
              </button>
            </div>
          );
        })}
      </div>
            {/* FAQ */}

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden rounded-2xl border border-border"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-white/5"
              >
                <span className="font-medium">
                  {faq.question}
                </span>

                {openFAQ === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openFAQ === index && (
                <div className="border-t border-border px-5 py-4">
                  <p className="leading-7 text-muted">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}

      <div className="mt-14">
        <h2 className="mb-6 text-2xl font-bold">
          Resources
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <a
            href="#"
            className="card flex items-center gap-4 rounded-2xl p-5 transition hover:border-rose-500"
          >
            <BookOpen className="text-rose-500" />

            <div>
              <h3 className="font-semibold">
                Community Guidelines
              </h3>

              <p className="text-sm text-muted">
                Learn what is allowed on Streamix.
              </p>
            </div>
          </a>

          <a
            href="#"
            className="card flex items-center gap-4 rounded-2xl p-5 transition hover:border-rose-500"
          >
            <Shield className="text-rose-500" />

            <div>
              <h3 className="font-semibold">
                Privacy Policy
              </h3>

              <p className="text-sm text-muted">
                Read how we protect your data.
              </p>
            </div>
          </a>

          <a
            href="#"
            className="card flex items-center gap-4 rounded-2xl p-5 transition hover:border-rose-500"
          >
            <FileText className="text-rose-500" />

            <div>
              <h3 className="font-semibold">
                Terms of Service
              </h3>

              <p className="text-sm text-muted">
                Review our platform rules.
              </p>
            </div>
          </a>

        </div>
      </div>
            {/* Feedback & Report Bug */}

      <div className="mt-14 grid gap-6 lg:grid-cols-2">

        {/* Feedback */}

        <div className="card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <MessageSquare className="text-rose-500" size={24} />

            <h2 className="text-xl font-semibold">
              Send Feedback
            </h2>
          </div>

          <textarea
            rows={6}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you like, what should be improved, or suggest a new feature..."
            className="input h-auto resize-none"
          />

          <button
            type="button"
            onClick={() => {
              if (!feedback.trim()) return;

              toast.success("Thank you for your feedback ❤️");
              setFeedback("");
            }}
            className="btn-primary mt-5 w-full"
          >
            Send Feedback
          </button>
        </div>

        {/* Bug Report */}

        <div className="card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <Bug className="text-rose-500" size={24} />

            <h2 className="text-xl font-semibold">
              Report a Bug
            </h2>
          </div>

          <textarea
            rows={6}
            value={bug}
            onChange={(e) => setBug(e.target.value)}
            placeholder="Describe the issue you found..."
            className="input h-auto resize-none"
          />

          <button
            type="button"
            onClick={() => {
              if (!bug.trim()) return;

              toast.success("Bug report submitted successfully 🐞");
              setBug("");
            }}
            className="btn-outline mt-5 w-full"
          >
            Submit Report
          </button>
        </div>

      </div>

      {/* App Information */}

      <div className="mt-14 card rounded-2xl p-6">

        <div className="flex items-center gap-3">
          <Info
            size={24}
            className="text-rose-500"
          />

          <h2 className="text-xl font-semibold">
            Application Information
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-muted">
              Application
            </p>

            <p className="mt-1 font-semibold">
              Streamix
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">
              Version
            </p>

            <p className="mt-1 font-semibold">
              v1.0.0
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">
              Developer
            </p>

            <p className="mt-1 font-semibold">
              Streamix Team
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">
              Support
            </p>

            <a
              href="mailto:support@streamix.com"
              className="mt-1 block text-rose-500 hover:underline"
            >
              support@streamix.com
            </a>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-12 border-t border-border pt-6 text-center">

        <HelpCircle
          className="mx-auto mb-3 text-rose-500"
          size={34}
        />

        <p className="text-sm text-muted">
          Thanks for using Streamix.
        </p>

        <p className="mt-2 text-xs text-muted">
          © {new Date().getFullYear()} Streamix.
          All rights reserved.
        </p>

      </div>

    </div>
  );
}
      