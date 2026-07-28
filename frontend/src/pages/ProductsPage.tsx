import ProductsTable from "@/components/products/ProductsTable";
import StockInDialog from "@/components/products/StockInDialog";

import { Input } from "@/components/ui/input";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useContainers } from "@/hooks/useContainers";

import { useEffect, useState } from "react";
import FilterSelect from "@/components/FilterSelect";

export default function ProductsPage() {

	// Search filters

	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");

	// Dropdown filters

	const [categoryId, setCategoryId] = useState<number | undefined>(
		undefined,
	);

	const [productTypeId, setProductTypeId] = useState<
		number | undefined
	>(undefined);

	const [containerId, setContainerId] = useState<
		number | undefined
	>(undefined);

	// Products

	const {
		data: products = [],
		isLoading,
		error,
	} = useProducts({
		brand,
		model,
		categoryId,
		productTypeId,
	});

	// Categories

	const {
		data: categories = [],
	} = useCategories();

	// Product types

	const {
		data: productTypes = [],
	} = useProductTypes(
		categoryId
			? {
				categoryId,
			}
			: undefined,
	);

	// Containers

	const {
		data: containers = [],
	} = useContainers(
		categoryId
			? {
				categoryId,
			}
			: undefined,
	);

	// Reset dependent filters when category changes

	useEffect(() => {
		setProductTypeId(undefined);
		setContainerId(undefined);
	}, [categoryId]);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Failed to load products.</h1>;
	}

	return (
		<div className="space-y-6">

			{/* Page heading */}

			<div className="flex items-center justify-between">

				<div>
					<h1 className="text-3xl font-bold">
						Products
					</h1>

					<p className="text-muted-foreground">
						Search, filter, and manage all products.
					</p>
				</div>

				<StockInDialog />

			</div>

			{/* Search and filters */}

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

				{/* Brand */}

				<Input
					placeholder="Search brand..."
					value={brand}
					onChange={(e) =>
						setBrand(e.target.value)
					}
				/>

				{/* Model */}

				<Input
					placeholder="Search model..."
					value={model}
					onChange={(e) =>
						setModel(e.target.value)
					}
				/>

				{/* Category */}

				<FilterSelect
					value={categoryId}
					onValueChange={setCategoryId}
					options={categories.map((category) => ({
						id: category.id,
						label: category.name,
					}))}
					allLabel="All categories"
				/>

				{/* Product type */}

				<FilterSelect
					value={productTypeId}
					onValueChange={setProductTypeId}
					options={productTypes.map((productType) => ({
						id: productType.id,
						label: productType.name,
					}))}
					allLabel="All product types"
					disabled={!categoryId}
				/>

				{/* Container */}

				<FilterSelect
					value={containerId}
					onValueChange={setContainerId}
					options={containers.map((container) => ({
						id: container.id,
						label: container.code,
					}))}
					allLabel="All Containers"
					disabled={!categoryId}
				/>

			</div>

			{/* Products table */}

			<ProductsTable
				products={products}
			/>

		</div>
	);
}