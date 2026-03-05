from playwright.sync_api import sync_playwright

def verify_spotlight():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Block external font requests to prevent timeouts
            page.route("**/*.woff2", lambda route: route.abort())
            page.route("**/fonts.googleapis.com/**", lambda route: route.abort())

            # Navigate to local server
            page.goto("http://localhost:8000/spotlight.html", wait_until="networkidle")

            # Evaluate script to force animations to complete immediately
            page.evaluate("""
                document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
            """)

            # Take a full page screenshot
            page.screenshot(path="verification/spotlight-verified.png", full_page=True)

            print("Screenshot saved to verification/spotlight-verified.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_spotlight()