import { PrimaryImage } from "@/interfaces/primary-image";
import Image from "next/image";

type ProductCardProps = {
  key: string;
  link: string;
  image: PrimaryImage;
  title: string;
  price: number;
  description: string;
};

export const ProductCard = ({ key, link, image, title, price, description }: ProductCardProps) => {
  return (
    <div key={key} className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST ?? ""}${image._path}`}
          alt={title}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={link}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
};
