const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Pass-through files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Add a custom collection for news posts
  eleventyConfig.addCollection("news", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/news/*.md");
  });

  // Add a custom 'limit' filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
  });

  // Add 'dateIso' filter for ISO date formatting (for datetime attribute)
  eleventyConfig.addFilter("dateIso", dateObj => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  // Add 'dateReadable' filter for human-readable date formatting
  eleventyConfig.addFilter("dateReadable", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  // Add 'absoluteUrl' filter to create full URLs from relative paths
  const baseUrl = "https://thesportsscoop.com";

  eleventyConfig.addFilter("absoluteUrl", function(url) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    if (!url.startsWith("/")) {
      url = "/" + url;
    }
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
