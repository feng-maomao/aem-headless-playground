import { BeverageDetail } from "@/interfaces/beverage-detail";

export interface BeverageResponse {
  data: {
    beverageList: {
      items: BeverageDetail[];
    };
  };
}
