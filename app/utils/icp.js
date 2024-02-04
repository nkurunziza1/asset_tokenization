"use client"
import { getMarketplaceCanister, getLedgerCanister } from "./canisterFactory";
import { getAuthClient } from "./auth";
import { useEffect } from "react";

export async function initializeContract() {
      const authClient = await getAuthClient();  
    window.auth = {};
    window.canister = {};
    window.auth.client = authClient;
    window.auth.isAuthenticated =  authClient.isAuthenticated();
    window.auth.identity = authClient.getIdentity();
    window.auth.principal = authClient.getIdentity()?.getPrincipal();
    window.auth.principalText = authClient.getIdentity()?.getPrincipal().toText();


   
    // window.canister.marketplace = await getMarketplaceCanister();
    // window.canister.ledger = await getLedgerCanister();
}
