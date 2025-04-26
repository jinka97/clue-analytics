import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format, parse } from "date-fns";

// Define the shape of a blog post
interface BlogPost {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function Blog() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Display 4 posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: BlogPost[] = [];
        const corsProxy = "https://api.allorigins.win/raw?url=";

        // Define RSS feed URLs (only MIT News AI)
        const rssFeeds = [
          {
            url: `${corsProxy}http://news.mit.edu/rss/topic/artificial-intelligence2`,
            source: "MIT News (AI)",
          },
        ];

        let successfulFetches = 0;
        const fetchErrors: string[] = [];

        // Fetch and parse RSS feeds
        for (const feed of rssFeeds) {
          try {
            const response = await axios.get(feed.url);
            const xmlText = response.data;

            // Parse XML to JSON
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            // Check for XML parsing errors
            const parserError = xmlDoc.querySelector("parsererror");
            if (parserError) {
              console.error(`XML parsing error for ${feed.source}:`, parserError.textContent);
              fetchErrors.push(`Failed to parse XML for ${feed.source}`);
              continue;
            }

            const items = xmlDoc.querySelectorAll("item");

            if (items.length === 0) {
              console.warn(`No items found in ${feed.source} feed.`);
              fetchErrors.push(`No posts found in ${feed.source}`);
              continue;
            }

            items.forEach((item) => {
              const title = item.querySelector("title")?.textContent || "Untitled";
              const description =
                item.querySelector("description")?.textContent || "";
              const link = item.querySelector("link")?.textContent || "#";
              const pubDate = item.querySelector("pubDate")?.textContent || "Unknown Date";

              fetchedPosts.push({
                id: `${feed.source}-${link}`, // Unique ID based on source and link
                title,
                description: description.replace(/<[^>]+>/g, ""), // Strip HTML tags
                link,
                pubDate,
                source: feed.source,
              });
            });

            successfulFetches++;
            console.log(`Successfully fetched ${items.length} posts from ${feed.source}`);
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.warn(`Failed to fetch or parse ${feed.source}:`, errorMessage);
            fetchErrors.push(`Failed to fetch ${feed.source}: ${errorMessage}`);
          }
        }

        if (successfulFetches === 0) {
          throw new Error(
            fetchErrors.length > 0
              ? `Failed to fetch posts: ${fetchErrors.join("; ")}`
              : "Failed to fetch posts from all sources."
          );
        }

        // Sort posts by date (most recent first)
        const sortedPosts = fetchedPosts.sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        setAllPosts(sortedPosts);
        setFilteredPosts(sortedPosts); // Initially, filtered posts are the same as all posts
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage || "Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search

    if (query.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredPosts(filtered);
    }
  };

  // Format date using date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = parse(dateString, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
      return format(date, "MMMM d, yyyy");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.warn(`Failed to parse date: ${dateString}`, errorMessage);
      return dateString; // Fallback to original string if parsing fails
    }
  };

  // Generate an excerpt from the description
  const generateExcerpt = (description: string) => {
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  // Pagination logic
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  if (loading) {
    return (
      <div className="section bg-white py-16 text-center">
        <p className="text-gray-700 text-lg">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section bg-white py-16 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="section bg-white py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">Latest Updates</h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Stay informed with our latest insights on AI, machine learning, and industry trends.
          </p>
          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </motion.div>

        {filteredPosts.length === 0 && searchQuery && (
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg">No posts found matching your search.</p>
          </div>
        )}

        <motion.div
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl shadow-lg p-6 bg-white border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition">
                  {post.title}
                </h3>
              </a>
              <p className="text-sm text-gray-500 mb-2">{formatDate(post.pubDate)}</p>
              <p className="text-sm text-gray-500 mb-4">Source: {post.source}</p>
              <p className="text-gray-600 mb-4">{generateExcerpt(post.description)}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
