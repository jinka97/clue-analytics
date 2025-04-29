import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format, parse, subDays } from "date-fns";

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
  const [selectedSource, setSelectedSource] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const postsPerPage = 4; // Display 4 posts per page

  // Available sources for filtering 
  
  
  const sources = [
    "All",
    "MIT News (AI)",
    "arXiv (Machine Learning)",
    "TechCrunch AI",
    "DEV Community",
    "BBC Technology",
  ];

  // Date filter options
  const dateOptions = [
    { label: "All", value: "All" },
    { label: "Last 7 Days", value: "7Days" },
    { label: "Last 30 Days", value: "30Days" },
    { label: "Last 90 Days", value: "90Days" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: BlogPost[] = [];
        // const backendUrl = "https://clue-analytics-backend.onrender.com/fetch-feed"; // Use your deployed backend URL
        const backendUrl = "https://clue-analytics-backend.onrender.com/fetch-feed"; // production 

        // Define RSS feed URLs
        const rssFeeds = [
          {
            url: `${backendUrl}?url=${encodeURIComponent("http://news.mit.edu/rss/topic/artificial-intelligence2")}`,
            source: "MIT News (AI)",
          },
          {
            url: `${backendUrl}?url=${encodeURIComponent("http://export.arxiv.org/rss/cs.LG")}`,
            source: "arXiv (Machine Learning)",
          },
          {
            url: `${backendUrl}?url=${encodeURIComponent("https://techcrunch.com/category/artificial-intelligence/feed/")}`,
            source: "TechCrunch AI",
          },
          {
            url: `${backendUrl}?url=${encodeURIComponent("https://dev.to/feed")}`,
            source: "DEV Community",
          },
          {
            url: `${backendUrl}?url=${encodeURIComponent("http://feeds.bbci.co.uk/news/technology/rss.xml")}`,
            source: "BBC Technology",
          },
        ];

        let successfulFetches = 0;
        const fetchErrors: string[] = [];

        for (const feed of rssFeeds) {
          try {
            const response = await axios.get(feed.url);
            const xmlText = response.data;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

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
                id: `${feed.source}-${link}`,
                title,
                description: description.replace(/<[^>]+>/g, ""),
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

        const sortedPosts = fetchedPosts.sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        setAllPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage || "Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Combined search and filter logic
  const applyFilters = (
    query: string,
    source: string,
    dateRange: string,
    posts: BlogPost[]
  ) => {
    let filtered = [...posts];

    // Search filter (case-insensitive across title, description, and source)
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.source.toLowerCase().includes(lowerQuery)
      );
    }

    // Source filter
    if (source !== "All") {
      filtered = filtered.filter((post) => post.source === source);
    }

    // Date filter
    if (dateRange !== "All") {
      const now = new Date();
      let cutoffDate: Date;
      switch (dateRange) {
        case "7Days":
          cutoffDate = subDays(now, 7);
          break;
        case "30Days":
          cutoffDate = subDays(now, 30);
          break;
        case "90Days":
          cutoffDate = subDays(now, 90);
          break;
        default:
          cutoffDate = new Date(0); // No cutoff for "All"
      }
      filtered = filtered.filter((post) => {
        try {
          const postDate = new Date(post.pubDate);
          return postDate >= cutoffDate;
        } catch {
          return false; // Exclude posts with invalid dates
        }
      });
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedSource, dateFilter, allPosts);
  };

  // Handle source filter
  const handleSourceFilter = (source: string) => {
    setSelectedSource(source);
    applyFilters(searchQuery, source, dateFilter, allPosts);
  };

  // Handle date filter
  const handleDateFilter = (dateRange: string) => {
    setDateFilter(dateRange);
    applyFilters(searchQuery, selectedSource, dateRange, allPosts);
  };

  // Format date using date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = parse(dateString, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
      return format(date, "MMMM d, yyyy");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.warn(`Failed to parse date: ${dateString}`, errorMessage);
      return dateString;
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

  // Generate pagination numbers (e.g., 1, 2, 3, ..., 10)
  const maxPagesToShow = 5; // Show up to 5 page numbers at a time
  const pageNumbers: (number | string)[] = [];
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Add page numbers and ellipses
  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) pageNumbers.push("...");
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          {/* Filters and Search */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* Source Filter */}
            <select
              value={selectedSource}
              onChange={(e) => handleSourceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => handleDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {filteredPosts.length === 0 && (searchQuery || selectedSource !== "All" || dateFilter !== "All") && (
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg">No posts found matching your criteria.</p>
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
                  {highlightText(post.title, searchQuery)}
                </h3>
              </a>
              <p className="text-sm text-gray-500 mb-2">{formatDate(post.pubDate)}</p>
              <p className="text-sm text-gray-500 mb-4">
                Source: {highlightText(post.source, searchQuery)}
              </p>
              <p className="text-gray-600 mb-4">
                {highlightText(generateExcerpt(post.description), searchQuery)}
              </p>
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

        {/* Improved Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } transition`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) =>
              typeof page === "number" ? (
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
              ) : (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                  {page}
                </span>
              )
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } transition`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
















