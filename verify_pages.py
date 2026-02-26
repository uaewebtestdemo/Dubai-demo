from playwright.sync_api import sync_playwright
import os

def take_screenshots():
    os.makedirs("/home/jules/verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        pages = ["index.html", "about-us.html", "contact.html", "how-it-works.html"]

        for pagename in pages:
            url = f"http://localhost:8000/{pagename}"
            print(f"Navigating to {url}...")
            page.goto(url)
            # Wait a bit for animations or fonts
            page.wait_for_timeout(1000)

            output_path = f"/home/jules/verification/{pagename.replace('.html', '')}.png"
            page.screenshot(path=output_path, full_page=True)
            print(f"Screenshot saved to {output_path}")

        browser.close()

if __name__ == "__main__":
    take_screenshots()
