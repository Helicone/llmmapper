import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString1 = `const openai = new OpenAI({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://llmmapper.com/oai2ant/v1",
});
`;

const codeString2 = `const chatCompletion = await openai.chat.completions.create({
  model: "claude-3-opus-20240229",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: "Tell me a short joke about programming.",
    },
  ],
  max_tokens: 100,
  stream: true,
});
`;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b text-black font-serif">
      <header className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold">LLM Mapper</h1>
        <p className="mt-2 text-xl">Automatically map</p>
      </header>

      <section className="container mx-auto py-16 px-4">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Get started</h2>
          <p className="text-lg mb-6">
            It{"'"}s easy to get started with LLM Mapper. Just follow these
            simple steps:
          </p>
          <h3>Step 1: Change the base URL</h3>
          <div className="mb-8">
            <SyntaxHighlighter language="typescript" style={tomorrow}>
              {codeString1}
            </SyntaxHighlighter>
          </div>
          <h3>Step 2: Start using Claude!</h3>
          <div className="mb-8">
            <SyntaxHighlighter language="typescript" style={tomorrow}>
              {codeString2}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              What{"'"}s the catch?
            </h2>
            <p className="text-lg mb-6">
              There is no catch. It is completely free and open source.
              Sponsored by{" "}
              <a href="https://helicone.ai" className="underline">
                Helicone
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              What{"'"}s the catch?
            </h2>
            <p className="text-lg mb-6">
              There is no catch. It is completely free and open source.
              Sponsored by{" "}
              <a href="https://helicone.ai" className="underline">
                Helicone
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["99.99% uptime", "Model Comparisons", "Performance Metrics"].map(
              (feature, index) => (
                <div key={index} className="border p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 LLM Mapper. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
