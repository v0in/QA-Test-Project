Feature('Creative Filtering');
const assert = require('assert');

Scenario('Creative filtering', async ({ I }) => {

  I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

  // reusable code for check creatives
  async function checkCreatives(expectedCount, message) {
    if (expectedCount > 0) {
      I.waitForElement('.creative-variant', 3); // try with data-testilda-id="creative-variant-unit"
    }
    
    const count = await I.grabNumberOfVisibleElements('.creative-variant');
    assert.strictEqual(count, expectedCount, `${message} Expected: ${expectedCount}, Found: ${count}`);
  }

  // reusable code for filters
  async function applyFilter(filterType, optionId) {
    I.click('[data-testilda-id="add-filter-button"]');
    I.seeElement('.filter-new__options');
    I.waitForElement({ text: filterType, exact: true }, 3, '.filter-new__options');
    I.click({ text: filterType, exact: true }, '.filter-new__options');
    I.click(`[data-id="${optionId}"]`);
    I.click('[data-testilda-id="dialog-button-container"]');
  }

  // Verify creatives loaded
  await checkCreatives(3, 'Initial check failed.');

  // Format filter
  await applyFilter('Format', 'universal-banner');
  await checkCreatives(1, 'Format filter failed.');

  // Size filter
  await applyFilter('Size', '320x50');
  await checkCreatives(0, 'Size filter failed.');

  // Reset filters 
  I.click('[data-testilda-id="filters-reset-button"]');
  await checkCreatives(3, 'Reset filter failed.');
  
});


Scenario('Creative sorting', async ({ I }) => {

  I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

  // Confirm default sorting
  const defaultSortText = await I.grabTextFrom('[data-testilda-id="defaultListItem"]');
  assert.strictEqual(defaultSortText.toLowerCase().trim(), 'last modified creative', 'Default sorting is incorrect.');

  // initial display sequence of creatives
  const initialOrder = await I.grabTextFromAll('.creative-variant .creative-title'); 
  console.log('Initial Order:', initialOrder);

  // Reapply sorting to verify the order
  I.click('[data-testilda-id="defaultListItem"]');
  I.waitForElement('[title="Last modified creative"]', 5);
  I.click('[title="Last modified creative"]');

  // order after reapplying sorting
  const sortedOrder = await I.grabTextFromAll('.creative-variant .creative-title');
  console.log('Sorted Order (Last Modified):', sortedOrder);

  // Verify if the order remains unchanged
  assert.deepStrictEqual(sortedOrder, initialOrder, 'default sorting incorect');

  // Change sorting 
  I.click('[data-testilda-id="defaultListItem"]');
  I.waitForElement('[title="Larger to smaller"]', 5);
  I.click('[title="Larger to smaller"]');

  // Extract metadata to compare size
  const styles = await I.grabAttributeFromAll(
    '[data-testilda-id="creative-variant-metadata"]',
    'style'
  );
  const areas = styles.map(styleStr => parseSize(styleStr));
  console.log('Extracted Areas:', areas);

  // sorted copy
  const sortedDescending = [...areas].sort((a, b) => b - a);
  assert.deepStrictEqual(
    areas,
    sortedDescending,
    'Creatives are not sorted by size in descending order!'
  );
});

function parseSize(styleStr) {
  const widthMatch = styleStr.match(/width:\s*(\d+)px/);
  const heightMatch = styleStr.match(/height:\s*(\d+)px/);

  if (widthMatch && heightMatch) {
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    return width * height;
  }
  return 0;
}

Scenario('Creative data validation', async ({ I }) => {
  I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

  // Get the banner
  const bannerIframeSelector = 'iframe[width="300"][height="250"]';
  I.waitForElement(bannerIframeSelector, 10);
  I.switchTo(bannerIframeSelector);

  // Check for text
  const bannerTextSelector = 'body';
  const bannerText = await I.grabTextFrom(bannerTextSelector);
  
  assert.strictEqual(
    bannerText.includes('Banner'),
    true,
    'text "Banner" is not displayed'
  );

  console.log('Validation successful');
  I.switchTo();
});