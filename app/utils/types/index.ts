export type VotingRewardsPluginData = {
    dissolveDelay: number;
    reward: number;
  }[];


export type UpdateStatus = {
  onclose: () => void;
  status: string;
  id: string;
  isOpen : boolean;
  handleUpdate: () => void,
}