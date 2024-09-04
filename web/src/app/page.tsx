import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString1 = `const openai = new OpenAI({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://gateway.llmmapper.com/oai2ant/v1",
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
    <main className="min-h-screen bg-gradient-to-b text-black font-serif  mx-auto">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <header className="container mx-auto py-8 px-4">
          <h1 className="text-5xl font-bold py-8">LLM Mapper</h1>
          <p className="mt-2 text-xl">
            Automatically map OpenAI API calls to Anthropic&apos;s Claude
          </p>
        </header>

        <section className="container mx-auto px-4">
          <p className="text-lg mb-6">
            LLM Mapper is a powerful tool that allows you to seamlessly use
            Anthropic&apos;s Claude models with your existing OpenAI API
            integration. No code changes required - just update your base URL
            and start leveraging Claude&apos;s capabilities instantly.
          </p>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Get started</h2>
            <p className="text-lg mb-6">
              It&apos;s easy to get started with LLM Mapper. Just follow these
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
                Why use LLM Mapper?
              </h2>
              <ul className="list-disc list-inside text-lg mb-6">
                <li>Seamless integration with existing OpenAI codebase</li>
                <li>Access to Anthropic&apos;s powerful Claude models</li>
                <li>No code changes required</li>
                <li>Open-source and free to use</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">How it works</h2>
              <p className="text-lg mb-6">
                LLM Mapper acts as a bridge between your OpenAI API calls and
                Anthropic&apos;s Claude API. It translates your requests
                on-the-fly, allowing you to use Claude&apos;s capabilities
                without changing your existing code structure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Seamless Integration",
                  description:
                    "Use your existing OpenAI codebase without any modifications. Just change the base URL and you're ready to go.",
                },
                {
                  title: "Model Flexibility",
                  description:
                    "Easily switch between different Claude models or fall back to OpenAI models as needed.",
                },
                {
                  title: "Open Source",
                  description:
                    "Fully open-source and customizable. Contribute to the project or modify it to fit your specific needs.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border p-6 rounded-lg bg-white shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Supported and Tested Models
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Source</th>
                    <th className="border border-gray-300 px-4 py-2">Normal</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Streaming
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tested Models
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Anthropic
                    </td>
                    <td className="border border-gray-300 px-4 py-2">✅</td>
                    <td className="border border-gray-300 px-4 py-2">✅</td>
                    <td className="border border-gray-300 px-4 py-2">
                      claude-3-opus-20240229, claude-3-sonnet-20240229,
                      claude-3-haiku-20240307, claude-2.1,
                      claude-3-5-sonnet-20240620
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Launched Beta 09/04/2024
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Gemini</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Coming soon
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Coming soon
                    </td>
                    <td className="border border-gray-300 px-4 py-2">n/a</td>
                    <td className="border border-gray-300 px-4 py-2">n/a</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 text-center ">
          <h2 className="text-3xl font-semibold mb-4">
            Issues or want to contibute?
          </h2>
          <p className="text-lg mb-6">
            LLM Mapper is an open source project. If you find any issues or want
            to contribute, please open an issue or a pull request on GitHub.
          </p>
          <a
            href="https://github.com/Helicone/llmmapper"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            View on GitHub
          </a>
        </div>
      </section>
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 LLM Mapper. All rights reserved.</p>
          <p className="mt-2">
            Sponsored by{" "}
            <a
              href="https://helicone.ai"
              className="underline hover:text-blue-300"
            >
              Helicone
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
