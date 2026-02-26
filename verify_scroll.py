from playwright.sync_api import sync_playwright

def verify_scroll():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the page
        print("Loading page...")
        page.goto("http://localhost:8080/how-it-works.html")

        # Initial state screenshot
        print("Taking initial screenshot...")
        page.screenshot(path="before_scroll.png")

        # Scroll down
        print("Scrolling...")
        page.evaluate("window.scrollTo(0, 1000)")

        # Wait for transition
        page.wait_for_timeout(1000)

        # Scrolled state screenshot
        print("Taking scrolled screenshot...")
        page.screenshot(path="after_scroll.png")

        browser.close()

if __name__ == "__main__":
    verify_scroll()
