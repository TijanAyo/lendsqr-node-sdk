![lendsqr-logo](https://lendsqr.com/assets/icons/LSQ%20Logo.svg)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

### Lendsqr NodeJS SDK

## Installation

#### Using NPM

```bash
    npm install lendsqr-node-sdk
```

#### Using Yarn

```bash
  yarn add lendsqr-node-sdk
```

## Usage

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function IsUserBlacklisted(email_address) {
  const data = await lendsqr.validation.checkCustomerKarma(email_address);
  console.log(data);
}
```

## Method's exposed by SDK

    1. CreditBureaus
        - Credit Report from CRC Credit Bureau
        - Credit Report from FirstCentral Credit Bureau

    2. Decisioning
        - Oraculi Borrower Scoring
        - Get Decision Models
        - Get Decision Models Details

    3. Direct-Debit
        - Verify Bank Account Number
        - Get All Banks
        - Get Details of Bank
        - Create Mandate
        - Get All Mandates
        - Get Mandate Details
        - Get Mandate Summary
        - Cancel a mandate
        - Debit a Mandate
        - Check Account Balance
        - Get All Transactions
        - Get Details of a Transaction
        - Get Transactions Statistics

    4. Embedded Loans and Payments
        - Get Loan Products
        - Initialize Loan Application
        - Get Loan
        - Initialize Payment
        - Query Payment

    5. Validation
        - Initialize BVN Consent
        - Complete Consent and get BVN Details
        - Initialize BVN Accounts Consent
        - Complete Consent and Get BVN Accounts
        - Match Customer BVN Image
        - Verify Customer Bank Account
        - Check Karma for Customer
        - Check for Borrower on Ecosystem
        - Verify Customer NIN

## Credit-bureau

#### getCreditReportFromCRC

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function getCRCReport(bvn) {
  try {
    // Fetch credit report from CRC
    const crcReport = await lendsqr.creditBureaus.getCreditReportFromCRC(bvn);
    console.log("CRC Credit Report:", crcReport);
  } catch (error) {
    console.error("Error fetching CRC credit report:", error);
  }
}

// Example usage
getCRCReport("12345678901"); // Replace with the actual BVN
```

#### getCreditReportFromFirstCentral

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function getFirstCentralReport(bvn) {
  try {
    // Fetch credit report from FirstCentral
    const firstCentralReport =
      await lendsqr.creditBureaus.getCreditReportFromFirstCentral(bvn);
    console.log("FirstCentral Credit Report:", firstCentralReport);
  } catch (error) {
    console.error("Error fetching FirstCentral credit report:", error);
  }
}

// Example usage
getFirstCentralReport("12345678901"); // Replace with the actual BVN
```

## Decisioning

#### oraculiBorrowerScoring

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function borrowerScoring(modelId) {
  try {
    // Define borrower details
    const borrowerData = {
      gender: "male",
      marital_status: "single",
      age: 30,
      location: "Lagos",
      no_of_dependent: 1,
      type_of_residence: "rented",
      educational_attainment: "bachelor",
      employment_status: "employed",
      sector_of_employment: "technology",
      monthly_net_income: 200000,
      employer_category: "private",
      bvn: "12345678901", // Replace with actual BVN
      phone_number: "08012345678",
      total_years_of_experience: 5,
      time_with_current_employer: 2,
      previous_lendsqr_loans: false,
      phone: "08012345678",
      bvn_phone: true,
      office_email: "user@company.com",
      personal_email: "user@example.com",
      amount: 500000,
    };

    // Perform borrower scoring
    const scoringResponse = await lendsqr.decisioning.oraculiBorrowerScoring(
      modelId,
      borrowerData
    );
    console.log("Borrower Scoring Response:", scoringResponse);
  } catch (error) {
    console.error("Error performing borrower scoring:", error);
  }
}

// Example usage
borrowerScoring(1); // Replace with the actual decision model ID
```

#### getDecisionModel

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function fetchDecisionModels() {
  try {
    // Fetch all decision models
    const decisionModels = await lendsqr.decisioning.getDecisionModel();
    console.log("Decision Models:", decisionModels);
  } catch (error) {
    console.error("Error fetching decision models:", error);
  }
}

// Example usage
fetchDecisionModels();
```

#### getDecisionModelDetails

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });

async function fetchDecisionModelDetails(modelId) {
  try {
    // Fetch decision model details by ID
    const decisionModelDetails =
      await lendsqr.decisioning.getDecisionModelDetails(modelId);
    console.log("Decision Model Details:", decisionModelDetails);
  } catch (error) {
    console.error("Error fetching decision model details:", error);
  }
}

// Example usage
fetchDecisionModelDetails(1); // Replace with the actual decision model ID
```

## Direct-debit

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

const lendsqr = new Lendsqr({ token: "your-api-token" });
const directDebit = lendsqr.directDebit;

// 1. Get all banks available for direct debit authorization
async function fetchAllBanks() {
  try {
    const banks = await directDebit.getAllBanks(100, 1, "ASC");
    console.log("Available Banks:", banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
}

// 2. Get details of a specific bank
async function fetchBankDetails(bankId) {
  try {
    const bankDetails = await directDebit.getBankDetails(bankId);
    console.log("Bank Details:", bankDetails);
  } catch (error) {
    console.error("Error fetching bank details:", error);
  }
}

// 3. Verify an account number
async function verifyAccountNumber(accountNumber, bankCode) {
  try {
    const response = await directDebit.verifyAccountNumber({
      account_number: accountNumber,
      bank_code: bankCode,
    });
    console.log("Account Verification:", response);
  } catch (error) {
    console.error("Error verifying account number:", error);
  }
}

// 4. Create a direct debit mandate
async function createMandate() {
  const mandateData = {
    account_number: "1234567890",
    phone_number: "08012345678",
    debit_type: "RECURRING",
    frequency: "MONTHLY",
    bank_id: 1,
    bank_code: "ABC123",
    number_of_payments: 12,
    payment_start_date: "2024-10-01",
    invite: true,
    email: "customer@example.com",
    start_date: "2024-10-01",
    end_date: "2025-10-01",
    narration: "Monthly Subscription",
    address: "123 Main St",
    amount: 10000,
    schedule: "1st of every month",
    type: "DEBIT",
    file_base64: "", // optional file content in base64
    file_extension: "", // optional file extension
  };

  try {
    const mandateResponse = await directDebit.createMandate(mandateData);
    console.log("Mandate Created:", mandateResponse);
  } catch (error) {
    console.error("Error creating mandate:", error);
  }
}

// 5. Get all mandates
async function fetchAllMandates() {
  try {
    const mandates = await directDebit.getAllMandates(10, 1);
    console.log("All Mandates:", mandates);
  } catch (error) {
    console.error("Error fetching mandates:", error);
  }
}

// 6. Retrieve details of a specific mandate
async function fetchMandateDetails(referenceNumber) {
  try {
    const mandateDetails = await directDebit.getMandateDetails(referenceNumber);
    console.log("Mandate Details:", mandateDetails);
  } catch (error) {
    console.error("Error fetching mandate details:", error);
  }
}

// 7. Get a summary of all mandates
async function fetchMandateSummary() {
  try {
    const summary = await directDebit.getMandateSummary();
    console.log("Mandate Summary:", summary);
  } catch (error) {
    console.error("Error fetching mandate summary:", error);
  }
}

// 8. Cancel a mandate
async function cancelMandate(referenceNumber) {
  try {
    const cancelResponse = await directDebit.cancelMandate(
      "USER_INITIATED",
      referenceNumber
    );
    console.log("Mandate Cancelled:", cancelResponse);
  } catch (error) {
    console.error("Error cancelling mandate:", error);
  }
}

// 9. Debit a mandate
async function debitMandate(referenceNumber, amount) {
  try {
    const debitResponse = await directDebit.debitMandate(
      referenceNumber,
      amount
    );
    console.log("Mandate Debited:", debitResponse);
  } catch (error) {
    console.error("Error debiting mandate:", error);
  }
}

// 10. Check the balance associated with a mandate
async function checkMandateBalance(referenceNumber) {
  try {
    const balanceResponse = await directDebit.checkMandateAccountBalance(
      referenceNumber
    );
    console.log("Mandate Account Balance:", balanceResponse);
  } catch (error) {
    console.error("Error checking mandate balance:", error);
  }
}

// 11. Get all mandate transactions
async function fetchAllMandateTransactions() {
  try {
    const transactions = await directDebit.getAllMandateTransactions(10, 1);
    console.log("All Mandate Transactions:", transactions);
  } catch (error) {
    console.error("Error fetching mandate transactions:", error);
  }
}

// 12. Get details of a specific transaction
async function fetchMandateTransactionDetails(reference) {
  try {
    const transactionDetails = await directDebit.getMandateTransactionDetails(
      reference
    );
    console.log("Transaction Details:", transactionDetails);
  } catch (error) {
    console.error("Error fetching transaction details:", error);
  }
}

// 13. Get transaction statistics
async function fetchMandateTransactionStats() {
  try {
    const stats = await directDebit.getMandateTransactionStats();
    console.log("Transaction Stats:", stats);
  } catch (error) {
    console.error("Error fetching transaction stats:", error);
  }
}

// Example usage
fetchAllBanks();
fetchBankDetails(1);
verifyAccountNumber("1234567890", "ABC123");
createMandate();
fetchAllMandates();
fetchMandateDetails("reference_number_here");
fetchMandateSummary();
cancelMandate("reference_number_here");
debitMandate("reference_number_here", 5000);
checkMandateBalance("reference_number_here");
fetchAllMandateTransactions();
fetchMandateTransactionDetails("transaction_reference_here");
fetchMandateTransactionStats();
```

## Embedded Loans and Payments

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

// Create an instance of the Lendsqr class
const lendsqr = new Lendsqr({ token: "your-api-token" });

// Get all loan products
async function fetchLoanProducts() {
  try {
    const loanProducts =
      await lendsqr.embeddedLoansAndPayments.getLoanProducts();
    console.log("Available Loan Products:", loanProducts);
  } catch (error) {
    console.error("Error fetching loan products:", error);
  }
}

// Initialize a loan
async function initializeLoan() {
  try {
    const loanPayload = {
      product_id: "12345",
      meta: {
        email: "customer@example.com",
        phone_number: "08012345678",
      },
    };
    const loanResponse = await lendsqr.embeddedLoansAndPayments.initializeLoan(
      loanPayload
    );
    console.log("Loan Initialization Response:", loanResponse);
  } catch (error) {
    console.error("Error initializing loan:", error);
  }
}

// Get loan details
async function fetchLoanDetails(reference) {
  try {
    const loanDetails = await lendsqr.embeddedLoansAndPayments.getLoanDetails(
      reference
    );
    console.log("Loan Details:", loanDetails);
  } catch (error) {
    console.error("Error fetching loan details:", error);
  }
}

// Initialize a payment
async function initializePayment() {
  try {
    const paymentPayload = {
      amount: 1000,
      description: "Loan repayment",
      callback_url: "https://yourcallback.url",
      organization_id: "org_12345",
    };
    const paymentResponse =
      await lendsqr.embeddedLoansAndPayments.initializePayment(paymentPayload);
    console.log("Payment Initialization Response:", paymentResponse);
  } catch (error) {
    console.error("Error initializing payment:", error);
  }
}

// Query payment details
async function queryPayment(reference) {
  try {
    const paymentDetails = await lendsqr.embeddedLoansAndPayments.queryPayment(
      reference
    );
    console.log("Payment Details:", paymentDetails);
  } catch (error) {
    console.error("Error querying payment:", error);
  }
}

// Example usage
fetchLoanProducts();
initializeLoan();
fetchLoanDetails("loan_reference_number");
initializePayment();
queryPayment("payment_reference_number");
```

## Validation

```javascript
import { Lendsqr } from "lendsqr-node-sdk";

// Create an instance of the Lendsqr class
const lendsqr = new Lendsqr({ token: "your-api-token" });

// Match Customer BVN Image
async function matchCustomerBVNImage(bvn, imageURL) {
  try {
    const response = await lendsqr.validation.matchCustomerBVNImage(
      bvn,
      imageURL
    );
    console.log("Match Customer BVN Image Response:", response);
  } catch (error) {
    console.error("Error matching customer BVN image:", error);
  }
}

// Verify Customer Bank Account
async function verifyCustomerBankAccount(accountNumber, bankCode) {
  try {
    const response = await lendsqr.validation.verifyCustomerBankAccount(
      accountNumber,
      bankCode
    );
    console.log("Verify Customer Bank Account Response:", response);
  } catch (error) {
    console.error("Error verifying customer bank account:", error);
  }
}

// Check Customer Karma
async function checkCustomerKarma(identity) {
  try {
    const response = await lendsqr.validation.checkCustomerKarma(identity);
    console.log("Check Customer Karma Response:", response);
  } catch (error) {
    console.error("Error checking customer karma:", error);
  }
}

// Check Customer in Ecosystem
async function checkCustomerInEcosystem(bvn) {
  try {
    const response = await lendsqr.validation.checkCustomerInEcosystem(bvn);
    console.log("Check Customer in Ecosystem Response:", response);
  } catch (error) {
    console.error("Error checking customer in ecosystem:", error);
  }
}

// Verify Customer NIN
async function verifyCustomerNIN(nin) {
  try {
    const response = await lendsqr.validation.verifyCustomerNIN(nin);
    console.log("Verify Customer NIN Response:", response);
  } catch (error) {
    console.error("Error verifying customer NIN:", error);
  }
}

// Initialize BVN Consent
async function initializeBVNConsent(bvn, contact) {
  try {
    const response = await lendsqr.validation.initializeBVNConsent(
      bvn,
      contact
    );
    console.log("Initialize BVN Consent Response:", response);
  } catch (error) {
    console.error("Error initializing BVN consent:", error);
  }
}

// Complete Consent and Get BVN Details
async function completeConsentAndGetBVNDetails(bvn, otp) {
  try {
    const response = await lendsqr.validation.completeConsentAndGetBVNDetails(
      bvn,
      otp
    );
    console.log("Complete Consent and Get BVN Details Response:", response);
  } catch (error) {
    console.error("Error completing consent and getting BVN details:", error);
  }
}

// Initialize BVN Account Consent
async function initializeBVNAccountConsent(bvn, contact) {
  try {
    const response = await lendsqr.validation.initializeBVNAccountConsent(
      bvn,
      contact
    );
    console.log("Initialize BVN Account Consent Response:", response);
  } catch (error) {
    console.error("Error initializing BVN account consent:", error);
  }
}

//  Complete Consent and Get BVN Account Details
async function completeConsentAndGetBVNAccountDetails(bvn, otp) {
  try {
    const response =
      await lendsqr.validation.completeConsentAndGetBVNAccountDetails(bvn, otp);
    console.log(
      "Complete Consent and Get BVN Account Details Response:",
      response
    );
  } catch (error) {
    console.error(
      "Error completing consent and getting BVN account details:",
      error
    );
  }
}

// Example usage
(async () => {
  // Call the functions with parameters
  await matchCustomerBVNImage("12345678901", "https://example.com/image.jpg");
  await verifyCustomerBankAccount("1234567890", "001");
  await checkCustomerKarma("customer@example.com");
  await checkCustomerInEcosystem("12345678901");
  await verifyCustomerNIN("1234567890123");
  await initializeBVNConsent("12345678901", "customer@example.com");
  await completeConsentAndGetBVNDetails("12345678901", "123456");
  await initializeBVNAccountConsent("12345678901", "customer@example.com");
  await completeConsentAndGetBVNAccountDetails("12345678901", "123456");
})();
```

## Lendsqr Docs

For more information about the Lendsqr endpoints and their functionalities, please refer to the documentation below:

- [Adjutor's API Reference](https://api.adjutor.io/#intro)
- [Adjutor Docs](https://docs.adjutor.io/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
