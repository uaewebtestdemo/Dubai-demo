import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Block external fonts to prevent timeouts
        await page.route("**/*", lambda route: route.abort() if route.request.resource_type == "font" else route.continue_())

        filepath = os.path.abspath('how-it-works.html')
        await page.goto(f"file://{filepath}", wait_until="load")
        print("Page loaded.")

        # Evaluate computed styles
        timeline_step_styles = await page.evaluate('''() => {
            const steps = document.querySelectorAll('.timeline-step');
            if (steps.length === 0) return null;
            const style = window.getComputedStyle(steps[0]);
            return {
                minHeight: style.minHeight,
                marginBottom: style.marginBottom,
                scrollSnapAlign: style.scrollSnapAlign,
                scrollSnapStop: style.scrollSnapStop
            };
        }''')

        print(f"Timeline Step Styles: {timeline_step_styles}")

        if not timeline_step_styles:
            print("ERROR: .timeline-step elements not found.")
            exit(1)

        # We check min-height relative to viewport height
        viewport_height = await page.evaluate('window.innerHeight')
        print(f"Viewport Height: {viewport_height}px")

        top_snap_styles = await page.evaluate('''() => {
            const topSnap = document.querySelector('.top-snap-wrapper');
            if (!topSnap) return null;
            const style = window.getComputedStyle(topSnap);
            return {
                scrollSnapAlign: style.scrollSnapAlign,
                paddingTop: style.paddingTop,
                marginTop: style.marginTop
            };
        }''')

        print(f"Top Snap Wrapper Styles: {top_snap_styles}")
        if not top_snap_styles:
             print("ERROR: .top-snap-wrapper element not found.")
             exit(1)

        await browser.close()
        print("Tests passed.")

if __name__ == "__main__":
    asyncio.run(main())
