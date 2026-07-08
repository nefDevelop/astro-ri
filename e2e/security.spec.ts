import { test, expect } from '@playwright/test';

test.describe('Security tests for XSS and malicious inputs', () => {
  test('Blog post page escapes HTML in title and description', async ({ page }) => {
    // Navigate to the test post
    await page.goto('/blog/xss-test-post/');

    // Check if the title is escaped in the DOM (not rendered as actual script tag)
    // If it was rendered as a script tag, evaluating document.title or an element text might differ,
    // but the most important part is that we shouldn't have an alert popup.
    let alertFired = false;
    page.on('dialog', dialog => {
      alertFired = true;
      dialog.dismiss();
    });

    await page.waitForLoadState('networkidle');

    // Make sure no alert was fired
    expect(alertFired).toBe(false);

    // Verify the HTML source contains escaped versions, not raw scripts
    const content = await page.content();
    expect(content).not.toContain('<script>alert(\'xss\')</script>');
    
    // Check highlight markdown
    // The previous test showed it outputs <mark><script>...
    // If Rehype escapes it properly, it will be <mark>&lt;script&gt;...
    // Let's see how Astro handles it in the actual build.
  });

  test('OG Image Generation survives malicious inputs', async ({ request }) => {
    // The OG image is statically generated. We just request it and ensure it's a valid PNG (status 200)
    // and doesn't crash the server.
    const response = await request.get('/og/xss-test-post.png');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('image/png');
    
    // We can also verify the body is a valid PNG buffer
    const body = await response.body();
    // PNG magic number: 89 50 4E 47 0D 0A 1A 0A
    expect(body[0]).toBe(0x89);
    expect(body[1]).toBe(0x50);
  });
});
