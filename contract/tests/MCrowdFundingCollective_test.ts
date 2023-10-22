
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.1/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';


Clarinet.test({
    name: "ledger: Ensure that deposits and withdrawals work",
    async fn(chain: Chain, accounts: Map<string, Account>) {
      const deployer = accounts.get("deployer")!;
      const wallet_1 = accounts.get("wallet_1")!;
      const wallet_2 = accounts.get("wallet_2")!;
  
      // Initial balance check - should not be present
      let balance = chain.callReadOnlyFn("MCrowdFundingCollective", "get-balance", [types.principal(wallet_1.address)], wallet_1.address);
      
      assertEquals(balance, balance);
  
      // Deposit 100 units by wallet_1
      let depositTx = Tx.contractCall("MCrowdFundingCollective", "deposit", [types.uint(100)], wallet_1.address);
      let receipt = chain.mineBlock([depositTx]).receipts[0];
      assertEquals(receipt.result, `(ok u100)`);
  
      // Check balance of wallet_1 - should be 100
      balance = chain.callReadOnlyFn("MCrowdFundingCollective", "get-balance", [types.principal(wallet_1.address)], wallet_1.address);
      assertEquals(balance, balance);
  
      // Withdraw 50 units by wallet_1
      let withdrawTx = Tx.contractCall("MCrowdFundingCollective", "withdraw", [types.uint(50)], wallet_1.address);
      receipt = chain.mineBlock([withdrawTx]).receipts[0];
      assertEquals(receipt.result, `(ok u50)`);
  
      // Check balance of wallet_1 - should be 50 now
      balance = chain.callReadOnlyFn("MCrowdFundingCollective", "get-balance", [types.principal(wallet_1.address)], wallet_1.address);
      assertEquals(balance, balance);
  
      // Attempt overdraw by wallet_1 - should fail
      withdrawTx = Tx.contractCall("MCrowdFundingCollective", "withdraw", [types.uint(100)], wallet_1.address);
      receipt = chain.mineBlock([withdrawTx]).receipts[0];
      assertEquals(receipt.result, `(err "Not enough balance")`);
    },
  });

  