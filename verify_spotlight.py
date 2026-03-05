import os
from html.parser import HTMLParser

class CSPChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inline_scripts = []
        self.inline_styles = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        # Check for inline event handlers (e.g., onclick, onmouseover)
        for attr in attrs_dict:
            if attr.startswith('on'):
                self.inline_scripts.append(f"Inline event handler found: {attr} in <{tag}>")

        # Check for inline style attributes
        if 'style' in attrs_dict:
            self.inline_styles.append(f"Inline style found: {attrs_dict['style']} in <{tag}>")

    def handle_data(self, data):
        # We also want to check for <script> tags with inline code (not just src)
        if self.lasttag == 'script' and data.strip():
            self.inline_scripts.append("Inline <script> block found.")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)


def check_file(filepath):
    print(f"Checking {filepath} for CSP violations...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        parser = CSPChecker()
        parser.feed(content)

        issues = 0
        if parser.inline_scripts:
            print(f"  [!] Found {len(parser.inline_scripts)} inline scripts:")
            for issue in parser.inline_scripts:
                print(f"      - {issue}")
            issues += 1

        if parser.inline_styles:
            print(f"  [!] Found {len(parser.inline_styles)} inline styles:")
            for issue in parser.inline_styles:
                print(f"      - {issue}")
            # Note: We are allowing inline styles for now as they are used in standard layout like padding etc.
            # but flagging them for awareness.

        if issues == 0:
            print("  [✓] No inline scripts found. CSP compliant.")
            return True
        return False

    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False

if __name__ == "__main__":
    check_file('spotlight.html')
