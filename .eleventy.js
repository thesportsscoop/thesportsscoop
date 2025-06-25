const { DateTime } = require("luxon"); // Import Luxon for advanced date handling

module.exports = function(eleventyConfig) {
  // Pass-through files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("src/google106c937e23b2632b.html"); // Google site verification file
  eleventyConfig.addPassthroughCopy("sw.js")
  eleventyConfig.addPassthroughCopy("robots.txt"); // 👈 important

   // Add a custom collection for news posts
  eleventyConfig.addCollection("news", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/news/*.md");
  });

  // Add a custom 'limit' filter
  // This filter allows you to limit the number of items displayed from an array (e.g., collections)
  eleventyConfig.addFilter("limit", function(array, limit) {
    if (!Array.isArray(array)) return []; // Ensure it's an array
    return array.slice(0, limit);
  });

  // Add 'dateIso' filter for ISO date formatting (for datetime attribute in HTML)
  // Uses Luxon to convert a JavaScript Date object to an ISO date string
  eleventyConfig.addFilter("dateIso", dateObj => {
    // Ensure dateObj is a valid Date object before processing
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      console.warn("Invalid date object passed to dateIso filter:", dateObj);
      return ''; // Return empty string or handle error appropriately
    }
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  // Add 'dateReadable' filter for human-readable date formatting
  // Uses Luxon to format a JavaScript Date object into a full localized date string
  eleventyConfig.addFilter("dateReadable", dateObj => {
    // Ensure dateObj is a valid Date object before processing
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      console.warn("Invalid date object passed to dateReadable filter:", dateObj);
      return 'Invalid Date'; // Return a friendly message for invalid dates
    }
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  // Add 'absoluteUrl' filter to create full URLs from relative paths
  // IMPORTANT: Ensure this baseUrl matches your live domain!
  const baseUrl = "https://www.thesportsscoop.com";

  eleventyConfig.addFilter("absoluteUrl", function(url) {
    if (!url) return "";
    // If the URL is already absolute, return it as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Ensure the URL starts with a slash if it doesn't already
    if (!url.startsWith("/")) {
      url = "/" + url;
    }
    // Combine with the base URL to create a full absolute URL
    return baseUrl + url;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes"
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
