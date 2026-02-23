import re, urllib.parse, sys

html = open('index.html', 'r').read()
css = open('style.css', 'r').read()
js = open('script.js', 'r').read()

BASE = 'https://raw.githubusercontent.com/nomu-cls/gengo10th/main'

# 1. Remove GTM script from head
html = re.sub(r'\s*<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->', '', html, flags=re.DOTALL)

# 2. Remove HM TAG from head and body
html = re.sub(r'\s*<!-- HM TAG -->.*?<!-- HM TAG -->', '', html, flags=re.DOTALL)

# 3. Remove GTM noscript from body
html = re.sub(r'\s*<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->', '', html, flags=re.DOTALL)

# 4. Inline CSS (replace link tag)
html = html.replace('  <link rel="stylesheet" href="style.css">', '  <style>\n' + css + '\n  </style>')

# 5. Replace image paths
def replace_src(m):
    path = urllib.parse.quote(m.group(2), safe='/')
    return m.group(1) + BASE + '/' + path

html = re.sub(r'(src=")((?:写真|実践者|特典)/[^"]+)', replace_src, html)

# 6. Clean JS: keep only LP switching, scroll-reveal, smooth scroll
parts = js.split('  // --- Form submit with redirect ---')
js_clean = parts[0].rstrip() + '\n});\n'

# 7. Inline cleaned JS
html = html.replace('  <script src="script.js"></script>', '  <script>\n' + js_clean + '\n  </script>')

# 8. Remove hero form
html = re.sub(r'<form class="hero-form"[^>]*>.*?</form>', '<!-- UTAGEフォームをここに配置 (ヒーロー) -->', html, flags=re.DOTALL)

# 9. Remove optin form
html = re.sub(r'<form class="optin-form"[^>]*>.*?</form>', '<!-- UTAGEフォームをここに配置 (オプトイン) -->', html, flags=re.DOTALL)

# 10. Remove mid-page CTA divs
html = re.sub(r'\n\s*<div class="cta-mid">[\s\S]*?</div>\n', '\n', html)

open('utage.html', 'w').write(html)

print('Hero placeholder:', html.count('UTAGEフォーム'))
print('Old forms:', html.count('tkal.analogialemma'))
print('CTAs:', html.count('cta-mid'))
print('GTM:', html.count('Google Tag Manager'))
print('HM TAG:', html.count('HM TAG'))
print('Done!')
sys.exit(0)
