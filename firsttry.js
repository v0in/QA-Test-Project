Feature('Creative Filtering');

Scenario('Creative filtering', async ({ I }) => {
  const assert = require('assert');

  I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

  I.waitForElement('.creative-variant', 30);
  var creatives = await I.grabNumberOfVisibleElements('.creative-variant');
  assert(creatives === 3, 'All 3 creatives loaded');

  //#########################  
  I.click('[data-testilda-id="add-filter-button"]');

  I.seeElement('.filter-new__options');
  I.see('Format', '.filter-new__options');
  I.waitForElement({ text: 'Format', exact: true }, 5, '.filter-new__options');
  I.click({ text: 'Format', exact: true }, '.filter-new__options');

  I.click('[data-id="universal-banner"]');

  I.click('[data-testilda-id="dialog-button-container"]');

  I.waitForElement('.creative-variant', 30);
  creatives = await I.grabNumberOfVisibleElements('.creative-variant');
  assert(creatives === 1, 'creatives loaded');

  //######################
  I.click('[data-testilda-id="add-filter-button"]');

  I.seeElement('.filter-new__options');
  I.see('Size', '.filter-new__options');
  I.waitForElement({ text: 'Size', exact: true }, 5, '.filter-new__options');
  I.click({ text: 'Size', exact: true }, '.filter-new__options');

  I.click('[data-id="320x50"]');

  I.click('[data-testilda-id="dialog-button-container"]');

  creatives = await I.grabNumberOfVisibleElements('.creative-variant');
  assert(creatives === 0, 'creatives loaded');

  //#########################

  I.click('[data-testilda-id="filters-reset-button"]');

  creatives = await I.grabNumberOfVisibleElements('.creative-variant');
  assert(creatives === 3, 'creatives loaded');

});
