
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.1/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that money left expected amount from user",
    fn(chain: Chain, accounts: Map<string, Account>) {
      const wallet_1 = accounts.get("wallet_1")!;
      const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.CrowdFundingCollective"; // replace with your contract address
  
      const initialBalanceInCollectiveInsuranceWallet1 = chain.callReadOnlyFn(contractAddress, "get-balance", [], wallet_1.address);
      assertEquals(initialBalanceInCollectiveInsuranceWallet1.result, 'u0');
  
      const block = chain.mineBlock([
        Tx.contractCall(
          contractAddress,
          "deposit",
          [types.uint(1000)],
          wallet_1.address
        ),
      ]);
  
      assertEquals(block.receipts.length, 1);
      assertEquals(block.height, 2);
  
      const depositReceipt = block.receipts[0];
      assertEquals(depositReceipt.result, '(ok u1000)'); // assuming the deposit function returns the deposited amount
  
      const afterDepositBalanceInCollectiveInsuranceWallet1 = chain.callReadOnlyFn(contractAddress, "get-balance", [], wallet_1.address);
      assertEquals(afterDepositBalanceInCollectiveInsuranceWallet1.result, 'u1000');
  
    },
  });
  