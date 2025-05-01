import Layout from "../components/Layout";
import { useEffect } from "react";

export default function Fun() {
  const redirectUrl = "https://jinka97.github.io/riddles-and-jokes-flashcards/";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 10000); // Auto-redirect after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <section className="section-container py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome to the Clue Fun Corner 🧠</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          You've worked your brain hard enough today — here’s a quick break with a riddle and a laugh. Enjoy, then explore more!
        </p>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 text-left mb-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">🔍 Riddle:</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?</p>

          <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">😂 Joke:</h3>
          <p className="text-gray-700 dark:text-gray-300">Why did the neural network go to school?  
          <br /><span className="text-gray-500 dark:text-gray-400 italic">Because it needed more layers!</span></p>
        </div>

        <a
          href={redirectUrl}
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Visit the Full Fun Page
        </a>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Redirecting in 10 seconds...</p>
      </section>
    </Layout>
  );
}
