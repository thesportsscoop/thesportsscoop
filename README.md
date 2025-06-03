# The Sports Scoop

Welcome to The Sports Scoop, your ultimate destination for the latest sports news!

This website is built with:
- **Eleventy (11ty)**: A simpler static site generator.
- **Netlify**: For hosting and continuous deployment.
- **Netlify CMS**: For content management.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/the-sports-scoop.git](https://github.com/your-username/the-sports-scoop.git)
    cd the-sports-scoop
    ```

2.  **Install dependencies:**
    ```bash
    npm install @11ty/eleventy
    ```
    (You might need to initialize npm first if you haven't: `npm init -y`)

3.  **Run Eleventy locally:**
    ```bash
    npx @11ty/eleventy --serve
    ```
    This will start a local server at `http://localhost:8080/` (or similar).

4.  **Deploy to Netlify:**
    * Create a new site on Netlify and connect it to your GitHub repository.
    * Netlify will automatically detect the `netlify.toml` file.
    * **Build command:** `npx @11ty/eleventy`
    * **Publish directory:** `public`

5.  **Configure Netlify CMS:**
    * In your Netlify site settings, go to "Identity" and enable it.
    * Under "Registration", set "Open" or "Invite only" (Invite only is recommended for production).
    * Go to "Git Gateway" and enable it.
    * Invite yourself as a user in Netlify Identity (e.g., via email).
    * Once invited, you can access the CMS at `https://your-site-name.netlify.app/admin/`.
    * Log in with the account you invited.

## Customization

* **Content:** Add new news posts in `src/news/` as Markdown files. Edit page content in `src/about.njk` and `src/contact.njk`.
* **Images:** Place your favicon in `src/assets/img/favicon.png` and your logo in `src/assets/img/logo.png`. Images for news posts will be uploaded via Netlify CMS to `src/assets/uploads/`.
* **Styling:** Modify `src/assets/css/style.css` to change the look and feel.
* **Social Media Links:** Update the `href` attributes in `src/_includes/header.njk` for your social media accounts.
* **API Integrations (Livescore, Betting Tips):** For dynamic content like live scores and betting tips, you will need to integrate with external APIs using JavaScript (e.g., in `src/assets/js/main.js` or via a separate JavaScript file). This requires additional development beyond the static site structure provided.

## Important Notes

* **Image Management:** When you upload images via Netlify CMS, they will be stored in `src/assets/uploads`.
* **Content Structure:** The `news` collection in `src/admin/index.html` defines the fields for your news posts. If you want different fields, adjust this configuration.
* **Dynamic Content:** The `livescore` and `betting-tips` pages are currently placeholders with static content. Implementing real-time updates will require fetching data from external APIs using JavaScript and potentially a serverless function if the API requires a backend.
* **Contact Form:** The provided contact form HTML is a basic frontend. To make it functional, you'll need to integrate it with a backend service like Netlify Forms, Formspree, or a custom serverless function. Refer to Netlify Forms documentation for easy setup.