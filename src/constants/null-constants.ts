import { BeverageDetail } from "@/interfaces/beverage-detail";
import { PrimaryImage } from "@/interfaces/primary-image";

export const NOT_FOUND_IMAGE: PrimaryImage = {
  _path: "",
  mimeType: "",
  width: 0,
  height: 0,
};

export const NOT_FOUND_BEVERAGE_DETAIL: BeverageDetail = {
  slug: "",
  title: "",
  price: 0,
  description: { plaintext: "" },
  primaryImage: NOT_FOUND_IMAGE,
  flavor: "",
};
