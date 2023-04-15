/**
 * NAME: alwaysverified
 */

import { VerifierResult } from "types";

const alwaysVerified = async () => {
  LitActions.setResponse({
    response: JSON.stringify({
      data: "{}",
      verified: true,
    } as VerifierResult),
  });
};

alwaysVerified();
