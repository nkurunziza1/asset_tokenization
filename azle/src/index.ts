
import {
  Duration,
  blob,
  Canister,
  ic,
  Err,
  nat32,
  nat64,
  Ok,
  Opt,
  Principal,
  query,
  Record,
  Result,
  StableBTreeMap,
  text,
  bool,
  update,
  Variant,
  Vec,
  nat,
  None
} from 'azle';
import { SHA3 } from 'crypto-js';
import {
  Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal
} from "azle/canisters/ledger";
import { v4 as uuidv4 } from "uuid";

const TradeState=Variant({
  nonSelleable:bool,
  selleable:bool,
  percentageSell:text
})

const Asset=Record({
  id:text,
  assetTitle:text,
  description:text,
  owner:Principal,
  location:text,
  attachmentURL: text,
  category:text,
  ownershipCertificate:text,
  assetIdentity:text,
  contact:text,
  TradeState:text,
  token:text,
  isRented:bool,
  securityStatement:text,
  price:nat64
})

const AssetPayload = Record({
    assetTitle: text,
    description: text,
    location: text,
    attachmentURL: text,
    ownershipCertificate:text,
    assetIdentity:text,
    category:text,
    TradeState:text,
    contact:text, 
    isRented:bool,
    securityStatement:text,
    price:nat64
});

const Transfer=Record({
  id:text,
  assetId: text,
  transferStatus: bool,
  owner: Principal,
  transfered_at_block: Opt(nat64),
  approveStatus:bool,
  memo: text,
  receiver:Principal
})
const TransferPayload=Record({
  receiver:Principal,
  assetId:text,
  approveStatus:bool,
})

const TransferApproval=Record({
  transferId:text,
  approveStatus:bool
})
const Message = Variant({
    NotFound: text,
    Forbidden:text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text
});

type Asset=typeof Asset.tsType;
type Transfer=typeof Transfer.tsType;

const Assets=StableBTreeMap<Principal,Asset>(0);
const temporallyTransfers=StableBTreeMap<text,Transfer>(1);
const persistedTransfers=StableBTreeMap<Principal,Transfer>(2)


function hash(input: any): string {
  const serializedInput = JSON.stringify(input);

  const hashedValue = SHA3(serializedInput).toString();

  return hashedValue;
}

function generateToken(data: {
  id: string;
  owner: Principal;
}): string {
  const correlationId = `${data.id}_${data.owner.toString()}`;
  return hash(correlationId);
}

// function temporallyTransfer(memo: nat64, delay: Duration) {
//   ic.setTimer(delay, () => {
//       const order = temporallyTransfer.remove(memo);
//       console.log(`Order discarded ${order}`);
//   });
// }

const ORDER_RESERVATION_PERIOD = 120n;

export default Canister({
  getAssets:query([],Vec(Asset),()=>{
    return Assets.values();
  }),

  addAsset:update([AssetPayload],Result(Asset,Message),(data)=>{

    if (typeof data !== "object" || Object.keys(data).length === 0) {
      console.log("asset", data)
      return Err({ NotFound: "invalid payLoad!!" })
  }
  const assetToken = generateToken({
    id: uuidv4(),
    owner: ic.caller(),
  });

  const asset={id:uuidv4(),owner:ic.caller(),token:assetToken,...data}
   
  //@ts-ignore
  Assets.insert(asset.id,asset);
  return Ok(asset);
  }),

  deleteAsset:update([text],Result(text,Message),(id)=>{
    //@ts-ignore
    const deleteAssetOpt=Assets.remove(id);

    if("None" in deleteAssetOpt){
     return Err({NotFound:`asset with id ${id} was not found!!`})
    }
    return Ok(deleteAssetOpt.Some.id);

  }),

  //adding transactions procedures
  transferProperty:update([TransferPayload],Result(Transfer,Message),(data)=>{
    //@ts-ignore
    const AssetOpt=Assets.get(data.assetId);
    if("None" in AssetOpt){
      return Err({
        NotFound:`Asset wih id: ${data.assetId} does not exist!`
      })
    }
    else if(AssetOpt.Some.isRented===true){
      return Err({
        Forbidden:"this asset is not transfereable"
      })
    }
    const asset=AssetOpt.Some;
    const transfer={
      id:uuidv4(),
      transferStatus: false,
      owner: asset.owner,
      transfered_at_block: None,
      memo: asset.token,
      ...data
    }
    temporallyTransfers.insert(transfer.memo,transfer);

    if(transfer.approveStatus===true){
      //@ts-ignore
      persistedTransfers.insert(transfer.id,transfer)
      const updateAsset:Asset={
      id:asset.id,
      assetTitle:asset.assetTitle,
      description:asset.description,
      owner:transfer.receiver,
      location:asset.location,
      attachmentURL:asset.attachmentURL,
      category:asset.category,
      ownershipCertificate:asset.ownershipCertificate,
      assetIdentity:asset.assetIdentity,
      contact:asset.contact,
      TradeState:asset.TradeState,
      token:asset.token,
      isRented:asset.isRented,
      securityStatement:asset.securityStatement,
      price:asset.price
      }
      //@ts-ignore
      Assets.insert(data.assetId,updateAsset);
    }

    return Ok(transfer);
  }),
                                                                                                                                                                                                                                                                                         
  getTemporallyTransfer:query([],Vec(Transfer),()=>{
    return  temporallyTransfers.values()
  }),
  getPersistantTransfer:query([],Vec(Transfer),()=>{
    return  persistedTransfers.values()
  })


                                                          
})





// export default Canister({
//   randomNumber: update([], nat32, () => {
//     return parseInt(String(Math.random() * 10 ** 8));
//   }),
//   getPrinciple:query([], text, ()=> {
//    const caller = ic.caller()
//    return caller.toString()
//   })
// });
