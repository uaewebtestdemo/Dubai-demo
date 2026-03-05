from playwright.sync_api import sync_playwright, expect
import os

def test_timeline_snap():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate mobile portrait to better see the snapping effect
        context = browser.new_context(viewport={'width': 414, 'height': 896})
        page = context.new_page()

        # Block external fonts
        page.route("**/*", lambda route: route.abort() if route.request.resource_type == "font" else route.continue_())

        filepath = os.path.abspath('how-it-works.html')
        page.goto(f"file://{filepath}")

        # Ensure timeline container exists
        timeline = page.locator('.timeline-container')
        expect(timeline).to_be_visible()

        # Check first step
        first_step = page.locator('.timeline-step').nth(0)
        expect(first_step).to_be_visible()

        # Scroll down
        page.evaluate("window.scrollBy(0, 1000)")
        page.wait_for_timeout(1000)

        page.screenshot(path="verification/how_it_works_snap.png", full_page=False)

        browser.close()

if __name__ == "__main__":
    test_timeline_snap()
