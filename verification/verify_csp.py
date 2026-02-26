from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Capture console messages to check for CSP errors
    console_logs = []
    page.on("console", lambda msg: console_logs.append(msg.text))

    try:
        print("Navigating to index.html...")
        page.goto("http://localhost:8000/index.html")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/index.png")
        print("Screenshot saved to verification/index.png")

        print("Navigating to contact.html...")
        page.goto("http://localhost:8000/contact.html")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/contact.png")
        print("Screenshot saved to verification/contact.png")

        print("Checking console logs for errors...")
        errors = [log for log in console_logs if "Content Security Policy" in log or "Refused to" in log]
        if errors:
            print("CSP Errors found:")
            for err in errors:
                print(f"- {err}")
        else:
            print("No CSP errors found in console logs.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
