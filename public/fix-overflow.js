// Paste this in browser console to find overflow elements
(function findOverflow() {
  const all = document.querySelectorAll('*');
  const results = [];
  
  all.forEach(el => {
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);
    
    // Check if element extends beyond viewport
    if (rect.right > window.innerWidth || rect.width > window.innerWidth) {
      results.push({
        element: el,
        tag: el.tagName,
        class: el.className,
        width: rect.width,
        right: rect.right,
        viewportWidth: window.innerWidth,
        overflow: rect.right - window.innerWidth
      });
    }
  });
  
  if (results.length === 0) {
    console.log('%c✅ NO OVERFLOW FOUND!', 'color: green; font-size: 20px; font-weight: bold;');
    return;
  }
  
  console.log('%c⚠️ OVERFLOW ELEMENTS FOUND:', 'color: red; font-size: 16px; font-weight: bold;');
  console.table(results.map(r => ({
    Tag: r.tag,
    Class: r.class.substring(0, 50),
    Width: Math.round(r.width) + 'px',
    Overflow: Math.round(r.overflow) + 'px'
  })));
  
  // Highlight problematic elements
  results.forEach(r => {
    r.element.style.outline = '3px solid red';
  });
  
  console.log('Problematic elements highlighted in red');
  console.log('To remove highlights, refresh the page');
})();
