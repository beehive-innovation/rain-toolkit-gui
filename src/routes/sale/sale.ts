import { BigNumber, Contract, ethers, Signer } from "ethers";
import { SaleConfig, SaleRedeemableERC20Config } from "../../types";
import { getNewChildFromReceipt, op } from "../../utils";
import SaleFactoryArtifact from "../../abis/SaleFactory.json";
import SaleArtifact from "../../abis/Sale.json";
import RedeemableERC20Artifact from "../../abis/RedeemableERC20.json";
import ReserveTokenArtifact from "../../abis/ReserveToken.json";
import { concat } from "ethers/lib/utils";
import { selectedNetwork } from "src/stores";
import { get } from "svelte/store";

export const enum Opcode {
  SKIP,
  VAL,
  DUP,
  ZIPMAP,
  BLOCK_NUMBER,
  BLOCK_TIMESTAMP,
  SENDER,
  IS_ZERO,
  EAGER_IF,
  EQUAL_TO,
  LESS_THAN,
  GREATER_THAN,
  EVERY,
  ANY,
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  POW,
  MIN,
  MAX,
  REPORT,
  NEVER,
  ALWAYS,
  SATURATING_DIFF,
  UPDATE_BLOCKS_FOR_TIER_RANGE,
  SELECT_LTE,
  ERC20_BALANCE_OF,
  ERC20_TOTAL_SUPPLY,
  ERC721_BALANCE_OF,
  ERC721_OWNER_OF,
  ERC1155_BALANCE_OF,
  ERC1155_BALANCE_OF_BATCH,
  REMAINING_UNITS,
  TOTAL_RESERVE_IN,
  LAST_BUY_BLOCK,
  LAST_BUY_UNITS,
  LAST_BUY_PRICE,
  CURRENT_BUY_UNITS,
  TOKEN_ADDRESS,
  RESERVE_ADDRESS,
}

export type BuyConfig = {
  feeRecipient: string;
  fee: BigNumber;
  minimumUnits: BigNumber;
  desiredUnits: BigNumber;
  maximumPrice: BigNumber;
};

export interface SaleTokenData {
  id: string;
  token: {
    id: string,
    name: string,
    symbols: string,
    decimals: string,
  };
  reserve: {
    id: string,
    name: string,
    symbols: string,
    decimals: string,
  }
}

export const initSaleContracts = (saleData: SaleTokenData, signer: Signer) => {
  const sale = new ethers.Contract(saleData.id, SaleArtifact.abi, signer);
  const reserve = new ethers.Contract(saleData.reserve.id, ReserveTokenArtifact.abi, signer);
  const token = new ethers.Contract(saleData.token.id, ReserveTokenArtifact.abi, signer);
  return [sale, reserve, token];
};

export const saleDeploy = async (
  deployer: Signer,
  config: SaleConfig,
  saleRedeemableERC20Config: SaleRedeemableERC20Config,
  ...args
): Promise<Contract> => {
  console.log(config);
  console.log(saleRedeemableERC20Config);
  console.log(config.calculatePriceStateConfig.constants[0].toString());
  const saleFactory = new ethers.Contract(
    get(selectedNetwork).addresses.SALE_FACTORY,
    SaleFactoryArtifact.abi,
    deployer
  );
  const txDeploy = await saleFactory.createChildTyped(
    config,
    saleRedeemableERC20Config,
    ...args
  );
  const receipt = await txDeploy.wait();
  const saleContractAddress = getNewChildFromReceipt(receipt, saleFactory);
  const sale = new ethers.Contract(
    saleContractAddress,
    SaleArtifact.abi,
    deployer
  ) as Contract;

  if (!ethers.utils.isAddress(sale.address)) {
    throw new Error(
      `invalid sale address: ${sale.address} (${sale.address.length} chars)`
    );
  }

  // await sale.deployed();

  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // sale.deployTransaction = txDeploy;

  // const token = new ethers.Contract(
  //   await sale.token(),
  //   RedeemableERC20Artifact.abi,
  //   deployer
  // ) as Contract;

  return sale;
};

export const afterBlockNumberConfig = (blockNumber) => {
  return {
    sources: [
      concat([
        // (BLOCK_NUMBER blockNumberSub1 gt)
        op(Opcode.BLOCK_NUMBER),
        op(Opcode.VAL, 0),
        op(Opcode.GREATER_THAN),
      ]),
    ],
    constants: [blockNumber - 1],
    stackLength: 3,
    argumentsLength: 0,
  };
};

export const afterTimestampConfigStart = (timestamp) => {
  return {
    sources: [
      concat([
        // (BLOCK_NUMBER blockNumberSub1 gt)
        op(Opcode.BLOCK_TIMESTAMP),
        op(Opcode.VAL, 0),
        op(Opcode.GREATER_THAN),
      ]),
    ],
    constants: [timestamp],
    stackLength: 3,
    argumentsLength: 0,
  };
};

export const afterTimestampConfigEnd = (timestampEnd, timestampExtra, amount) => {
  return {
    sources: [
      concat([
        // (BLOCK_NUMBER blockNumberSub1 gt)
        op(Opcode.BLOCK_TIMESTAMP),
        op(Opcode.VAL, 0),
        op(Opcode.GREATER_THAN),
        op(Opcode.TOTAL_RESERVE_IN),
        op(Opcode.VAL, 2),
        op(Opcode.LESS_THAN),
        op(Opcode.EVERY, 2),
        op(Opcode.BLOCK_TIMESTAMP),
        op(Opcode.VAL, 1),
        op(Opcode.GREATER_THAN),
        op(Opcode.ANY, 2),
      ]),
    ],
    constants: [timestampEnd, timestampExtra, amount],
    stackLength: 20,
    argumentsLength: 0,
  };
};

export const getAfterTimestampDate = (stateConfig, i) => {
  if (stateConfig.sources[0] === "0x050001000b00" || stateConfig.sources[0] === "0x050001000b00230001020a000c02050001010b000d02") {
    return new Date(parseInt(stateConfig.constants[i]) * 1000);
  }
};


export const getAfterTimestamp = (stateConfig, i) => {
  if (stateConfig.sources[0] === "0x050001000b00" || stateConfig.sources[0] === "0x050001000b00230001020a000c02050001010b000d02") {
    return parseInt(stateConfig.constants[i]);
  }
};

export const saleStatuses = ["Pending", "Active", "Success", "Fail"];
