import requests
import time

def check_urls():
    urls = [
        "https://www.science.org/doi/10.1126/science.159.3810.56",
        "https://press.princeton.edu/books/hardcover/9780691167404/success-and-luck",
        "https://www.theatlantic.com/education/archive/2014/02/the-matthew-effect-how-advantage-begets-further-advantage/284046/",
        "https://www.nfx.com/post/network-effects-manual/",
        "https://press.princeton.edu/books/hardcover/9780691172798/the-technology-trap",
        "https://www.gladwellbooks.com/titles/malcolm-gladwell/outliers/9780316017930/",
        "https://marianamazzucato.com/entrepreneurial-state/",
        "https://www.platformrevolution.com/",
        "https://journals.sagepub.com/doi/10.3102/0034654306298273",
        "https://donellameadows.org/systems-thinking-book/"
    ]
    
    print("URL Accessibility Check Results:")
    print("=" * 60)
    
    accessible = 0
    total = len(urls)
    
    for i, url in enumerate(urls, 1):
        try:
            response = requests.head(url, timeout=10, allow_redirects=True)
            if response.status_code == 200:
                print(f"{i:2d}. ✅ ACCESSIBLE: {url}")
                accessible += 1
            elif response.status_code in [301, 302, 303, 307, 308]:
                print(f"{i:2d}. ✅ REDIRECT ({response.status_code}): {url}")
                accessible += 1
            else:
                print(f"{i:2d}. ❌ ERROR {response.status_code}: {url}")
        except requests.exceptions.Timeout:
            print(f"{i:2d}. ❌ TIMEOUT: {url}")
        except requests.exceptions.ConnectionError:
            print(f"{i:2d}. ❌ CONNECTION ERROR: {url}")
        except Exception as e:
            print(f"{i:2d}. ❌ FAILED: {url} - {str(e)}")
        
        # Be respectful to servers
        time.sleep(0.5)
    
    print("\n" + "=" * 60)
    print(f"SUMMARY: {accessible}/{total} URLs accessible ({accessible/total*100:.1f}%)")
    
    if accessible < total:
        print("\n⚠️  Some URLs are not accessible. Consider using:")
        print("• Library databases for academic papers")
        print("• Publisher websites directly")
        print("• DOI links for journal articles")
        print("• ISBN searches for books")

if __name__ == "__main__":
    check_urls()