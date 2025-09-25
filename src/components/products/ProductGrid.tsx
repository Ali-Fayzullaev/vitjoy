import { ProductCard } from "./ProductCard";
import type { Product } from "../../data/products";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  onProductClick: (product: Product) => void;
}

export function ProductGrid({
  products,
  viewMode,
  onProductClick,
}: ProductGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard
              product={product}
              viewMode={viewMode}
              onProductClick={onProductClick}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard
            product={product}
            viewMode={viewMode}
            onProductClick={onProductClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
