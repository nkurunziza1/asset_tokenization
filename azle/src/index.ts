import { Canister, Principal, ic, nat32, query, text, update } from "azle";

export default Canister({
  randomNumber: update([], nat32, () => {
    return parseInt(String(Math.random() * 10 ** 8));
  }),
  getPrinciple:query([], text, ()=> {
   const caller = ic.caller()
   return caller.toString()
  })
});
