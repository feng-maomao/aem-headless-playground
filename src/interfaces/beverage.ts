import { Description } from "@/interfaces/description";
import { PrimaryImage } from "@/interfaces/primary-image";

export interface Beverage {
  slug: string;
  title: string;
  price: number;
  description: Description;
  primaryImage: PrimaryImage;
}
