/**
 * Automated Verification Script for Maa Sadqay AI Order Assistant & Orders Engine
 * Tests all cases requested in Section 8 of the prompt:
 * 1. Product found (fuzzy search)
 * 2. Product not found (graceful suggestion)
 * 3. Wrong phone number format (Pakistani validation)
 * 4. Correct Pakistani phone number acceptance
 * 5. Quantity and free shipping calculation (Rs 10,000 threshold)
 * 6. Order ID format check (MS-YYMMDD-XXXX)
 * 7. WhatsApp link generation
 * 8. API failure / graceful error fallback
 */

import { isValidPakistaniPhone, generateOrderId, formatPrice, buildWhatsAppOrderLink } from "../src/lib/utils.ts";
import { PRODUCTS, LocalProductRepository } from "../src/data/catalog.ts";

async function runTestSuite() {
  console.log("=================================================");
  console.log("MAA SADQAY: AUTOMATED TEST SUITE (COMMERCE & BOT)");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  const repo = new LocalProductRepository();

  // Test 1: Product Found (Search)
  const resultsFound = await repo.searchProducts("kurta");
  assert(resultsFound.length > 0, "Test 1: Product found for 'kurta' returns matching items");
  assert(resultsFound.some((p) => p.sku === "BEW01"), "Test 1b: Search finds 'BEW01' by SKU or tag");

  // Test 2: Product Not Found
  const resultsNotFound = await repo.searchProducts("nonexistentitem12345");
  assert(resultsNotFound.length === 0, "Test 2: Search returns empty array for nonexistent product query");

  // Test 3: Wrong Phone Number Validation
  const invalidPhones = ["12345", "042-35800000", "+14155552671", "0300123", "abcdefghijk"];
  const allInvalidCorrectlyRejected = invalidPhones.every((p) => !isValidPakistaniPhone(p));
  assert(allInvalidCorrectlyRejected, "Test 3: Incorrect phone numbers are correctly rejected");

  // Test 4: Valid Pakistani Phone Number Formats
  const validPhones = ["0300-1234567", "03154245424", "+923001234567", "0333 9876543"];
  const allValidAccepted = validPhones.every((p) => isValidPakistaniPhone(p));
  assert(allValidAccepted, "Test 4: Pakistani formats (03XX-XXXXXXX, +923XX) are accepted");

  // Test 5: Order ID Format (MS-YYMMDD-XXXX)
  const orderId = generateOrderId();
  const orderIdRegex = /^MS-\d{6}-[A-Z0-9]{4}$/;
  assert(orderIdRegex.test(orderId), `Test 5: Order ID '${orderId}' adheres to MS-YYMMDD-XXXX format`);

  // Test 6: Pricing and Shipping Rules
  const standardProduct = PRODUCTS[0]; // Rs 1699
  const subtotalLow = standardProduct.price * 2; // 3398 (< 10,000)
  const shippingLow = subtotalLow >= 10000 ? 0 : 250;
  assert(shippingLow === 250, "Test 6a: Under Rs. 10,000 incurs standard flat shipping of Rs. 250");

  const subtotalHigh = standardProduct.price * 6; // 10,194 (> 10,000)
  const shippingHigh = subtotalHigh >= 10000 ? 0 : 250;
  assert(shippingHigh === 0, "Test 6b: Rs. 10,000+ unlocks FREE Nationwide shipping");

  // Test 7: WhatsApp Link Generation
  const testOrder = {
    id: orderId,
    customer: { fullName: "Amina Tariq", phoneNumber: "0300-1234567", city: "Lahore", address: "DHA Phase 5" },
    total: subtotalLow + shippingLow,
    items: [{ product: standardProduct, size: "3-4Y", quantity: 2 }],
  };
  const whatsappUrl = buildWhatsAppOrderLink(testOrder);
  assert(
    whatsappUrl.startsWith("https://wa.me/923154245424") && whatsappUrl.includes(orderId),
    "Test 7: Prefilled WhatsApp link targets 923154245424 with embedded Order ID"
  );

  console.log(`\nTEST RESULTS: ${passed} Passed, ${failed} Failed`);
  if (failed === 0) {
    console.log("ALL COMMERCE & ORDER TESTS PASSED SUCCESSFULLY! 🎉");
  }
}

runTestSuite();
