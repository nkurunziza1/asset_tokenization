import { Canister, Principal, nat32, query, update } from "azle";

export default Canister({
  randomNumber: update([], nat32, () => {
    return parseInt(String(Math.random() * 10 ** 8));
  }),
});
