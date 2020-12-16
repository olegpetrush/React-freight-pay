export const errorMessages: { [code: string]: string } = {
  "auth/access-token": "access_token not exist",
  "app/failed-operation": "Could not get operation name",
  "auth/forbiden-access":
    "You have no authorization to access to this resource",
};

export const transferErrorMessages: { [code: string]: string } = {
  "transfer/transaction-account":
    "No Transaction Account was found for the corresponding user",
  "transfer/transaction-account-not-found": "Transaction Account not found",
};

export const documentErrorMessages: { [code: string]: string } = {
  "document/user": "User must be in a Document state",
  "document/dwolla": "Dwolla not found",
};

export const userErrorMessages: { [code: string]: string } = {
  "user/not-found": "User not found",
};

export const phoneVerificationErrorMessages: { [code: string]: string } = {
  "verify/not-found": "Phone Verification not found",
  "verify/used": "Phone Verification already used",
  "verify/expired": "Phone Verification expired",
};

export const passwordConfirmationErrorMessages: { [code: string]: string } = {
  "confirm/not-found": "Email not found",
  "confirm/code-not-found": "Code not found",
  "confirm/expired": "Email Confirmation expired",
};

export const emailVerificationErrorMessages: { [code: string]: string } = {
  "verify/not-found": "Email Verification not found",
  "verify/alraedy-verified": "Email already verified",
  "verify/code-not-found": "Code not found",
  "verify/expired": "Email Verification expired",
};

export const transactionAccountTypeErrorMessages: { [code: string]: string } = {
  "accountType/not-found": "Transaction Account Type not found",
};

export const firebaseErrorMessages: { [code: string]: string } = {
  "auth/id-token-expired": "Expired Token",
};
