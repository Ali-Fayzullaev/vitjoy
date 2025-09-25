import { ProductCard } from "./ProductCard";
import type { Product } from "../../data/products";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  onProductClick: (product: Product) => void;
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function ProductGrid({
  products,
  viewMode,
  onProductClick,
}: ProductGridProps) {
  if (viewMode === "list") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
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
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
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
