import { test, expect } from '@playwright/test';

test('verify 15.6 inch laptop responsiveness (1920x1080)', async ({ page }) => {
    // Standard 15.6" laptop resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('http://localhost:3000');
    
    // Check if the projects section is visible
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Verify main container max-width or scaling
    const mainContainer = projectsSection.locator('> div').first();
    const box = await mainContainer.boundingBox();
    console.log(`Main container width at 1920px: ${box.width}px`);
    
    // Take screenshot for visual confirmation
    await page.screenshot({ path: 'C:/Users/jprat/OneDrive/Desktop/Medical/web/verification_1920.png', fullPage: true });
});

test('verify existing mobile responsiveness (375x812)', async ({ page }) => {
    // iPhone 12 Pro resolution
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.goto('http://localhost:3000');
    
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
    
    // Take screenshot for visual confirmation
    await page.screenshot({ path: 'C:/Users/jprat/OneDrive/Desktop/Medical/web/verification_mobile.png', fullPage: true });
});
