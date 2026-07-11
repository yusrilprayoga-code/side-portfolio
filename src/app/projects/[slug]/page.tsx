import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/Product";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  // Next.js 15+: params is async and must be awaited
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product: Product | undefined = products.find(
    (product: Product) => product.slug === slug
  );

  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  } else {
    return {
      title: "Projects | Yusril Prayoga",
      description:
        "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
    };
  }
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const product: Product | undefined = products.find(
    (product: Product) => product.slug === slug
  );

  if (!product) {
    redirect("/projects");
  }
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}
